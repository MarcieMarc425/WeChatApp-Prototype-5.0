
cc.Class({
    extends: cc.Component,

    properties: {
        player1Pos: {
            default: null,
            type: cc.Sprite
        },
        player2Pos: {
            default: null,
            type: cc.Sprite
        },
        up_left: {
            default: null,
            type: cc.Button
        },
        up_right: {
            default: null,
            type: cc.Button
        },
        down_left: {
            default: null,
            type: cc.Button
        },
        down_right: {
            default: null,
            type: cc.Button
        },
        turnNotification: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var _this = this;
        socket.emit('display-turn', 'loaded', playerTurn => {
          _this.setTurn(playerTurn);
        });
        socket.on('display-turnPlus', res => {
          _this.setTurn(res);
        });
        this.p1Pos = [0, 0];
        this.player1Pos.node.position = cc.p(0, -99.5);
    },

    start () {

    },
    
    moveUpLeft () {
        var _this = this;
        socket.emit('end-turn', 'end');
        if((this.p1Pos[1] + 1) <= 4) {
            this.p1Pos[1] += 1;
            this.player1Pos.node.x -= 69.5;
            this.player1Pos.node.y += 31.2;      
        }
    },

    moveUpRight () {
        var _this = this;
        socket.emit('end-turn', 'end');
        if((this.p1Pos[0] + 1) <= 4) {
            this.p1Pos[0] += 1;
            this.player1Pos.node.x += 69.5;
            this.player1Pos.node.y += 31.2;      
        }
    },

    moveDownLeft () {
        var _this = this;
        socket.emit('end-turn', 'end');
        if((this.p1Pos[0] - 1) >= 0) {
            this.p1Pos[0] -= 1;
            this.player1Pos.node.x -= 69.5;
            this.player1Pos.node.y -= 31.2;  
        }
    },

    moveDownRight () {
        var _this = this;
        socket.emit('end-turn', 'end');
        if((this.p1Pos[1] - 1) >= 0) {
            this.p1Pos[1] -= 1;
            this.player1Pos.node.x += 69.5;
            this.player1Pos.node.y -= 31.2;      
        }
    },

    setTurn(playerTurn) {
        if(playerTurn == '对方（红色）') {
          this.up_left.interactable = false;
          this.up_right.interactable = false;
          this.down_left.interactable = false;
          this.down_right.interactable = false;
        } else {
          this.up_left.interactable = true;
          this.up_right.interactable = true;
          this.down_left.interactable = true;
          this.down_right.interactable = true;
        }
        this.turnNotification.string = '回合:' + playerTurn;
      }

    // update (dt) {},
});
