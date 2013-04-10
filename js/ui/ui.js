/**
 * @author Huitre<gohin.j@gmail.com>
 */

var VersusUi = new Class({
    Extends: Manager,
    player1: {},
    player2: {},
    timeLeft: 99999, //ms
    rate: 1000,

    update: function (dt) {
        this.updateHealth();
        if (this.getTicks() > this.nextTicks) {
            this.updateTime(1000);
            this.getNextTick();
        }
    },

    prepare: function (player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.options.main.setStyle('display', 'block');
    },

    updateTime: function (dt) {
        if (!isNaN(dt) && this.timeLeft)
            this.timeLeft = this.timeLeft - dt;
        this.options.time.set('html', Math.round(this.timeLeft/1000, 0));
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
        this.options.p1h.getElement('p').setStyle('width', this.player1.getHealth() + '%');
        this.options.p2h.getElement('p').setStyle('width', this.player2.getHealth() + '%');
    }
});