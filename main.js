
cc.Class({
    extends: cc.Component,

    properties: {
        player1Pos: {
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
        }
    },

    onLoad () {
        this.p1Pos = [0, 0];
        this.player1Pos.node.position = cc.p(0, -99.5);
    },

    start () {

    },

    moveUpLeft () {
        if((this.p1Pos[1] + 1) <= 4) {
            this.p1Pos[1] += 1;
            this.player1Pos.node.x -= 69.5;
            this.player1Pos.node.y += 31.2;      
        }
    },

    moveUpRight () {
        if((this.p1Pos[0] + 1) <= 4) {
            this.p1Pos[0] += 1;
            this.player1Pos.node.x += 69.5;
            this.player1Pos.node.y += 31.2;      
        }
    },

    moveDownLeft () {
        if((this.p1Pos[0] - 1) >= 0) {
            this.p1Pos[0] -= 1;
            this.player1Pos.node.x -= 69.5;
            this.player1Pos.node.y -= 31.2;  
        }
    },

    moveDownRight () {
        if((this.p1Pos[1] - 1) >= 0) {
            this.p1Pos[1] -= 1;
            this.player1Pos.node.x += 69.5;
            this.player1Pos.node.y -= 31.2;      
        }
    },

    // update (dt) {},
});
