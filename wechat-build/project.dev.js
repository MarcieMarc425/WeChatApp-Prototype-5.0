var io = require('./../weapp.socket.io');
var url = 'ws://119.28.130.88:8081';   // Remote URL
// var url = 'ws://127.0.0.1:8081';   // Localhost URL
var socket = io(url);

require = function() {
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
        e[i][0].call(p.exports, function(r) {
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
  battle: [ function(require, module, exports) {
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
        this.p1Pos = [ 0, 0 ];
        this.player1Pos.node.position = cc.p(0, -99.5);
      },
      start: function start() {},
      moveUpLeft: function moveUpLeft() {
        if (this.p1Pos[1] + 1 <= 4) {
          this.p1Pos[1] += 1;
          this.player1Pos.node.x -= 69.5;
          this.player1Pos.node.y += 31.2;
        }
      },
      moveUpRight: function moveUpRight() {
        if (this.p1Pos[0] + 1 <= 4) {
          this.p1Pos[0] += 1;
          this.player1Pos.node.x += 69.5;
          this.player1Pos.node.y += 31.2;
        }
      },
      moveDownLeft: function moveDownLeft() {
        if (this.p1Pos[0] - 1 >= 0) {
          this.p1Pos[0] -= 1;
          this.player1Pos.node.x -= 69.5;
          this.player1Pos.node.y -= 31.2;
        }
      },
      moveDownRight: function moveDownRight() {
        if (this.p1Pos[1] - 1 >= 0) {
          this.p1Pos[1] -= 1;
          this.player1Pos.node.x += 69.5;
          this.player1Pos.node.y -= 31.2;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  connect: [ function(require, module, exports) {
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
        socket.on('pairing-success', msg => {
          if (msg == 'ready') {
            _this.notification.string = '已找到其他玩家!';
            cc.director.loadScene('battle.fire');
          }
        });
      },
      start: function start() {},
      connectBtnOnClicked: function connectBtnOnClicked() {
        var _this = this;
        socket.emit('request-pairing', 'request', status => {
          if (status == 'waiting')
            _this.notification.string = '在等待其他玩家连接';
          else if (status == 'paired') {
            _this.notification.string = '已找到其他玩家!';
          }
        });
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "battle", "connect" ]);