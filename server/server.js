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
var p1Pos = [];
var p2Pos = [];
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
                
                // Set players initial coordinates
                p1Pos = [0, 0];
                p2Pos = [4, 4];

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

    // When player tries to cancel out of the current connection if still waiting
    socket.on('cancel_connect', res => {
        
    });

    // Display players' turn for client (On load only)
    socket.on('display-turn', (res, callback) => {
        var string = '';
        if(socket.id == playerTurn)
            string = '你（蓝色）';
        else
            string = '对方（红色）';
        callback(string);
    });

    // Player has selected an action and end his turn
    socket.on('end-turn', res => {

        // If the player ending turn == p1, no need to invert action on server coord
        if(socket.id == p1)
            movePlayerPos(p1, res);
        else
            movePlayerPos(p2, invertPlayerAction(res));

        // Broadcast move action to the player NOT ending the turn, since client already registers own action
        var otherPlayer = '';
        // If p1 == other player, register p2's action on p1 client
        // Since p2 server coord is already in sync with p1 client's view of p2's action, no need to invert
        if(socket.id != p1) 
            io.to(p1).emit('display-otherPlayerPos', p2Pos);
        else
            io.to(p2).emit('display-otherPlayerPos', invertPlayerPosView(p1Pos));

        // Change the players' turn
        changeTurn();
        var string = '';

        // Emit the changed turn effect to players in room
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

// Function for inverting view of player coord
function invertPlayerPosView(playerPos) {
    var newPlayerPos = [4, 4];
    newPlayerPos = [newPlayerPos[0] - playerPos[0], newPlayerPos[1] - playerPos[1]];
    return newPlayerPos;
}

// Function for inverting players' actions on server coordinates
function invertPlayerAction(action) {
    if(action == 'moveUpRight')
        return 'moveDownLeft';
    else if(action == 'moveUpLeft')
        return 'moveDownRight';
    else if(action == 'moveDownLeft')
        return 'moveUpRight';
    else if(action == 'moveDownRight')
        return 'moveUpLeft';
}

// Register move action on players' server coordinates
function movePlayerPos(player, action) {
    if(player == p1) {
        // Change player coord according to action
        if(action == 'moveUpRight')
            p1Pos = [p1Pos[0]+1, p1Pos[1]];
        else if(action == 'moveUpLeft')
            p1Pos = [p1Pos[0], p1Pos[1]+1];
        else if(action == 'moveDownLeft')
            p1Pos = [p1Pos[0]-1, p1Pos[1]];
        else if(action == 'moveDownRight')
            p1Pos = [p1Pos[0], p1Pos[1]-1];
    } else {
        if(action == 'moveUpRight')
            p2Pos = [p2Pos[0]+1, p2Pos[1]];
        else if(action == 'moveUpLeft')
            p2Pos = [p2Pos[0], p2Pos[1]+1];
        else if(action == 'moveDownLeft')
            p2Pos = [p2Pos[0]-1, p2Pos[1]];
        else if(action == 'moveDownRight')
            p2Pos = [p2Pos[0], p2Pos[1]-1];
    }
    console.log(p1Pos);
    console.log(p2Pos);
}

// Function for changing players' turns
function changeTurn() {
    if(playerTurn == p1)
        playerTurn = p2;
    else
        playerTurn = p1;
}

http.listen(PORT, () => {
    console.log('Server listening on port ' + PORT + '...');
});
