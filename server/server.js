var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 8081;

app.get('*', function (req, res) {});

// Defined variables
var connectedQueue = [];
var pairingQueue = [];
var room = [];
var p1 = '';
var p2 = '';
var playerTurn = '';

// When a player connects
io.on('connect', socket => {
    
    console.log('A user has connected');
    connectedQueue.push(socket.id);
    console.log('Players currently connected: ' + connectedQueue.length);
    console.log('Players currently waiting in queue: ' + pairingQueue.length)

    // Player request to be paired with another player to battle
    socket.on('request-pairing', (res, callback) => {
        var found = false;
        
        // If same player is already in queue, button has no effect
        for(var i = 0; i < pairingQueue.length; i++) {
            if(pairingQueue[i] == socket.id)
                found = true;
        }
        if(found)
            return;
        
        // Player is not in queue, adds to queue
        else {
            pairingQueue.push(socket.id);
            console.log('Players currently connected: ' + connectedQueue.length);
            console.log('Players currently waiting in queue: ' + pairingQueue.length)
            
            // Current waiting queue only has 1 player, wait for other players to join
            if(pairingQueue.length != 2) {
                callback('waiting');
            }
            
            // Current waiting queue has 2 players, pair them
            else {
                callback('paired');
                // Set p1 & p2
                for(var i = 0; i < pairingQueue.length; i++) {
                    if(i == 0)
                        p1 = pairingQueue[i];
                    else
                        p2 = pairingQueue[i];
                }
                // Set player turn to p1 (default)
                playerTurn = p1;   
                for(var i = 0; i < pairingQueue.length; i++) {
                    io.to(pairingQueue[i]).emit('pairing-success', 'ready');
                    room.push(pairingQueue[i]);
                    pairingQueue.splice(i, 1);
                    i -= 1;
                }
                console.log('Players currently connected: ' + connectedQueue.length);
                console.log('Players currently waiting in queue: ' + pairingQueue.length)    
            }
        }
    });

    socket.on('display-turn', (res, callback) => {
        var string = '';
        if(socket.id == playerTurn)
            string = '你（蓝色）';
        else
            string = '对方（红色）';
        callback(string);
    });

    socket.on('end-turn', res => {
        changeTurn();
        var string = '';
        for(var i = 0; i < room.length; i++) {
            if(room[i] == playerTurn) {
                io.to(room[i]).emit('display-turnPlus', '你（蓝色）');
            } else {
                io.to(room[i]).emit('display-turnPlus', '对方（红色）');
            }
        }
    });

    // When client disconnects
    socket.on('disconnect', res => {
        console.log('A user has disconnected.');
        connectedQueue.splice(socket.id, 1);
        console.log('Players currently connected: ' + connectedQueue.length);
        console.log('Players currently waiting in queue: ' + pairingQueue.length)
    });
});

function changeTurn() {
    if(playerTurn == p1)
        playerTurn = p2;
    else
        playerTurn = p1;
}

http.listen(PORT, () => {
    console.log('Server listening on port ' + PORT + '...');
});
