cc.Class({
    extends: cc.Component,

    properties:{
        notification: {
            default: null,
            type: cc.Label
        },
        connectBtn : {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        var _this = this;
        this.notification.string = "没连接";
        socket.on('pairing-success', msg => {
            if (msg == 'ready') {
                _this.notification.string = '已找到其他玩家!';
                cc.director.loadScene('battle.fire');
            }
        });
    },

    start () {

    },

    connectBtnOnClicked () {
        var _this = this;
        socket.emit('request-pairing', 'request', status => {
            if (status == 'waiting')
                _this.notification.string = '在等待其他玩家连接';
            else if (status == 'paired') {
                _this.notification.string = '已找到其他玩家!';
            }
        });
    }

    // update (dt) {},
});
