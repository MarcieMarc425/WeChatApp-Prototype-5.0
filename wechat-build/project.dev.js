var io = require('./../weapp.socket.io');
var url = 'ws://119.28.130.88:8081'; // Remote URL
// var url = 'ws://127.0.0.1:8081';   // Localhost URL
var socket = io(url);

require = function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r);
                }, p, p.exports, r, e, n, t);
            }
            return n[i].exports;
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o;
    }
    return r;
}()({
    battle: [function (require, module, exports) {
        "use strict";
        cc._RF.push(module, "8c12eHUW15NoblvEeEmkTzJ", "battle");
        "use strict";
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
            onLoad: function onLoad() {
                
                var _this = this;
                socket.emit("display-turn", "loaded", function (playerTurn) {
                    _this.setTurn(playerTurn);
                });
                socket.on("display-turnPlus", function (res) {
                    _this.setTurn(res);
                });
                socket.on('display-otherPlayerPos', playerPos => {
                    console.log(playerPos);
                    _this.setP2Pos(playerPos);
                });
                this.p1Pos = [0, 0];
                this.p2Pos = [4, 4];
                this.player1Pos.node.position = cc.p(0, -99.5);
                this.player2Pos.node.position = cc.p(0, 150.9);
            },
            start: function start() {},
            moveUpLeft: function moveUpLeft() {
                var _this = this;
                if (this.p1Pos[1] + 1 <= 4) {
                    socket.emit("end-turn", "moveUpLeft");
                    this.p1Pos[1] += 1;
                    this.player1Pos.node.x -= 69.5;
                    this.player1Pos.node.y += 31.2;
                }
            },
            moveUpRight: function moveUpRight() {
                var _this = this;
                if (this.p1Pos[0] + 1 <= 4) {
                    socket.emit("end-turn", "moveUpRight");
                    this.p1Pos[0] += 1;
                    this.player1Pos.node.x += 69.5;
                    this.player1Pos.node.y += 31.2;
                }
            },
            moveDownLeft: function moveDownLeft() {
                var _this = this;
                if (this.p1Pos[0] - 1 >= 0) {
                    socket.emit("end-turn", "moveDownLeft");
                    this.p1Pos[0] -= 1;
                    this.player1Pos.node.x -= 69.5;
                    this.player1Pos.node.y -= 31.2;
                }
            },
            moveDownRight: function moveDownRight() {
                var _this = this;
                if (this.p1Pos[1] - 1 >= 0) {
                    socket.emit("end-turn", "moveDownRight");
                    this.p1Pos[1] -= 1;
                    this.player1Pos.node.x += 69.5;
                    this.player1Pos.node.y -= 31.2;
                }
            },
            setP2Pos: function setP2Pos(playerPos) {
                // P2 moved in x direction
                if((this.p2Pos[0] - playerPos[0]) != 0) {
                    // moved up along x axis
                    if((this.p2Pos - playerPos[0]) < 0) {
                        this.player2Pos.node.x += 69.5 * Math.abs((this.p2Pos[0] - playerPos[0]));
                        this.player2Pos.node.x += 31.2 * Math.abs((this.p2Pos[0] - playerPos[0]));
                    } 
                    // moved down along x axis
                    else {
                        this.player2Pos.node.x -= 69.5 * Math.abs((this.p2Pos[0] - playerPos[0]));
                        this.player2Pos.node.y -= 31.2 * Math.abs((this.p2Pos[0] - playerPos[0]));
                    }
                    this.p2Pos = playerPos;
                }
                // P2 moved in y direction
                else {
                    // moved up along y axis
                    if((this.p2Pos - playerPos[1]) < 0) {
                        this.player2Pos.node.x -= 69.5 * Math.abs((this.p2Pos[1] - playerPos[1]));
                        this.player2Pos.node.y += 31.2 * Math.abs((this.p2Pos[1] - playerPos[1]));
                    } 
                    // moved down along y axis
                    else {
                        this.player2Pos.node.x += 69.5 * Math.abs((this.p2Pos[1] - playerPos[1]));
                        this.player2Pos.node.y -= 31.2 * Math.abs((this.p2Pos[1] - playerPos[1]));
                    }
                    this.p2Pos = playerPos;
                }
                // var newXPos = 0 + -69.5*(4-playerPos[0]);
                // var newYPos = 150.9 + -31.2*(4-playerPos[1]);
                // this.player2Pos.node.x = newXPos;
                // this.player2Pos.node.y = newYPos;
            },
            setTurn: function setTurn(playerTurn) {
                if ("对方（红色）" == playerTurn) {
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
                this.turnNotification.string = "回合:" + playerTurn;
            }
        });
        cc._RF.pop();
    }, {}],
    connect: [function (require, module, exports) {
        "use strict";
        cc._RF.push(module, "2f417vL3zVNxr3agtT7kuhs", "connect");
        "use strict";
        cc.Class({
            extends: cc.Component,
            properties: {
                notification: {
                    default: null,
                    type: cc.Label
                },
                connectBtn: {
                    default: null,
                    type: cc.Button
                }
            },
            onLoad: function onLoad() {
                var _this = this;
                this.notification.string = "没连接";
                socket.on("pairing-success", function (msg) {
                    if ("ready" == msg) {
                        _this.notification.string = "已找到其他玩家!";
                        cc.director.loadScene("battle.fire");
                    }
                });
            },
            start: function start() {},
            connectBtnOnClicked: function connectBtnOnClicked() {
                var _this = this;
                socket.emit("request-pairing", "request", function (status) {
                    "waiting" == status ? _this.notification.string = "在等待其他玩家连接" : "paired" == status && (_this.notification.string = "已找到其他玩家!");
                });
            }
        });
        cc._RF.pop();
    }, {}]
}, {}, ["battle", "connect"]);