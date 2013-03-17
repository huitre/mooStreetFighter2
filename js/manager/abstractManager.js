var Manager = new Class({
    Implements : [Options],
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
    }
})