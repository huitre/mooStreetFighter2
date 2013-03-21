var Manager = new Class({
    Implements : [Options],
    nextTicks: 1,
    lastTicks: 0,
    rate: 133,

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
    },
    getTicks: function () {
        return Date.now();
    },
    getNextTick: function () {
        this.nextTicks = this.getTicks() + this.rate;
    }
})