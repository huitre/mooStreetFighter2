/**
 * @author Huitre<gohin.j@gmail.com>
 */
var KeyConfiguration = {
    'a': 'lp',
    's': 'hp',
    'z': 'lk',
    'x': 'hk',
    // cardinalite pour les directions
    'up': 'n',
    'down': 's',
    'left': 'o',
    'right': 'e'
}

/*
 * Represente l'etat d'une action suite a une suite de touches presses
 * ex : haut-droite presse depuis 2secondes
 */
var Key = new Class({
    repeated: 0,
    action: null,
    sinceLastPress: 0, // not for now
    pressed: true,

    initialize: function (action) {
        this.action = action;
        this.sinceLastPress = Date.now();
        this.pressed = true;
    },

    addRepetition: function () {
        this.repeated++;
    }
})

var InputManager = new Class({
    Extends: Manager,
    Implements: [Events],

    // status des touches de direction
    pushedKeys: null,
    rate: 50,


    initialize: function (options) {
        this.parent(options);
        $(window).removeEvents('keydown');
        $(window).removeEvents('keyup');
        this.pushedKeys = {};
    },

    /*
     * Methode d'initialisation appelee avant le debut du combat
     * charge de mettre en place la capture des inputs
     */
    prepare: function (players) {
        var that = this;
        this.nextTicks = this.lastTicks = this.getTicks();
        $(window).addEvents({
            'keydown': function (e) {
                if (e.key != 'f12' && e.key != 'f5')
                    e.preventDefault();
                e.stopPropagation();
                that.push(e.key);
            },
            'keyup' : function (e) {
                that.pop(e.key);
            }
        })
    },

    push: function (key) {
        if (this.pushedKeys[key] == true) {
            return false;
        }
        if (KeyConfiguration[key]) {
            this.pushedKeys[key] = true;
        }
    },

    pop: function (key) {
        if (this.pushedKeys[key])
            this.pushedKeys[key] = false;
        GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_RELEASED, [this.pushedKeys], this);
    },

    getPushedKeys: function () {
        return this.pushedKeys;
    },

    update: function () {
        if (this.nextTicks >= this.lastTicks) {
            GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PRESSED, [this.pushedKeys], this);
            this.getNextTick();
        }
    },

    getNextTick: function () {
        this.nextTicks = this.getTicks() + this.rate;
    }
});
