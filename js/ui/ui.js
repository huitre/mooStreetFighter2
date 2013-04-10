/**
 * @author Huitre<gohin.j@gmail.com>
 */

var VersusUi = new Class({
    Extends: Manager,
    player1: {},
    player2: {},
    timeLeft: 99,

    update: function (dt) {
        this.updateHealth();
        this.updateTime(dt);
    },

    prepare: function (player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.options.main.setStyle('display', 'block');
    },

    updateTime: function (dt) {
        this.options.time.set('html', Math.round(this.timeLeft - dt / 100, 0));
        if (this.options.timeLeft == 0)
            GlobalDispatcher.fireEvent(GAME_TIMEOVER);
    },

    init: function (options) {
        this.parent(options);
        this.options.p1h = $(this.options.p1h);
        this.options.p2h = $(this.options.p2h);
        this.options.time = $(this.options.time);
        this.options.main = $(this.options.main);
    },

    updateHealth: function (player) {
        this.options.p1h.set('width', this.player1.getHealth() + '%');
        this.options.p2h.set('width', this.player2.getHealth() + '%');
    }
});