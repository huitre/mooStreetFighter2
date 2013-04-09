/**
 * @author Huitre<gohin.j@gmail.com>
 */
var Tickable = new Class({
    nextTicks: 1,
    lastTicks: 0,
    rate: 133,

    getTicks: function () {
        return Date.now();
    },

    getNextTick: function () {
        this.nextTicks = this.getTicks() + (this.rate * CONFIG.SPEED);
    }
})

var Manager = new Class({
    Implements : [Options, Tickable],

    initialize: function (game) {
        this.game = game;
    },
    update: function () {},
    render: function () {},
    start: function () {},
    stop: function () {},
    prepare: function () {},
    init: function (options) {
        this.setOptions(options);
    }
})