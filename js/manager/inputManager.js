var InputManager = new Class({
    Extends: Manager,

    keyList : [],

    initialize: function (options) {
        this.parent(options);
        $(window).removeEvents('keydown');
        $(window).removeEvents('keyup');
    },

    prepare: function (players) {
        var player1 = players[0];
        var that = this;

        $(window).addEvents({
            'keydown': function (e) {
                that.push(e.key);
            },
            'keyup' : function (e) {
                
            }
        })
    },

    push: function (key) {
        this.keyList.push(key);
    },

    pop: function () {

    },

    update: function () {

    },

    clean: function () {

    }
});
