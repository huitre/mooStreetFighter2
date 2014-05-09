/**
 * @author Huitre<gohin.j@gmail.com>
 */

/*
 * Represente l'etat d'une action suite a une suite de touches presses
 * ex : haut-droite presse depuis 2secondes
 */
var Key = new Class({
    repeated: 0,
    action: null,
    sinceLastPress: 0, // not for now

    initialize: function (action) {
        this.action = action;
        this.sinceLastPress = Date.now();
        this.pressed = true;
    },

    addRepetition: function () {
        this.repeated++;
    }
})


var GamePadManager = new Class({
    Extends: Manager,
    pushedKeys: {},
    gamepadList: [],
    ANALOGUE_BUTTON_THRESHOLD: 0.01,
    AXIS_THRESHOLD: 0.5,


    initialize: function (options) {
        this.parent(options);
        this.pushedKeys = {};
        this.oldPushedKeys = {};
        this.gamepadList = navigator.webkitGetGamepads();
    },

    isPushed: function (pad, buttonId) {
       return pad.buttons[buttonId] &&
         (pad.buttons[buttonId] > this.ANALOGUE_BUTTON_THRESHOLD);
    },

    isStickMoved: function (pad, axisId, isNegative) {
        if (typeof pad.axes[axisId] == 'undefined') {
            return false;
        } else if (isNegative) {
            return pad.axes[axisId] < -this.AXIS_THRESHOLD;
        } else {
            return pad.axes[axisId] > this.AXIS_THRESHOLD;
        }
    },

    dispatchPushedButton: function (pushedKeys) {
        for (var key in pushedKeys) {
            if (pushedKeys[key] !== this.pushedKeys[key])
                GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PUSHED, [pushedKeys]);
        }
        this.pushedKeys = pushedKeys;
    },

    getPushedKeys: function () {
        // allow only one gamepad for the moment
        //for (var i = 0, m = this.gamepadList.length; i < m; i++) {
            var g = this.gamepadList[0], pushedKeys = {};
            if (g) {
                pushedKeys['right'] = this.isPushed(g, GAMEPAD.BUTTONS.PAD_RIGHT) || this.isStickMoved(g, GAMEPAD.AXES.LEFT_ANALOGUE_HOR);
                pushedKeys['left'] = this.isPushed(g, GAMEPAD.BUTTONS.PAD_LEFT) || this.isStickMoved(g, GAMEPAD.AXES.LEFT_ANALOGUE_HOR, true);
                pushedKeys['up'] = this.isPushed(g, GAMEPAD.BUTTONS.PAD_TOP) || this.isStickMoved(g, GAMEPAD.AXES.LEFT_ANALOGUE_VERT, true);
                pushedKeys['down'] = this.isPushed(g, GAMEPAD.BUTTONS.PAD_BOTTOM) || this.isStickMoved(g, GAMEPAD.AXES.LEFT_ANALOGUE_VERT);
                pushedKeys['a'] = this.isPushed(g, GAMEPAD.BUTTONS.FACE_1);
                pushedKeys['z'] = this.isPushed(g, GAMEPAD.BUTTONS.FACE_2);
                pushedKeys['s'] = this.isPushed(g, GAMEPAD.BUTTONS.FACE_3);
                pushedKeys['x'] = this.isPushed(g, GAMEPAD.BUTTONS.FACE_4);
                this.dispatchPushedButton(pushedKeys);
            }
        //}
    },

    pollGamePad: function () {
        this.gamepadList = (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;
    },

    poll: function () {
        if (this.nextTicks >= this.lastTicks) {
            this.pollGamePad();
            this.getPushedKeys();
            if (this.hasTouchPressed()) {
                GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PRESSED, [this.pushedKeys]);
            }
            this.getNextTick();
        }
    },

    hasTouchPressed: function () {
        for (var key in this.pushedKeys) {
            if (this.pushedKeys[key] === true)
                return true;
        }
    }
})

var InputManager = new Class({
    Extends: Manager,
    Implements: [Events],

    // gamepads
    gamepadSupportAvailable: false,
    gamepadManager: {},

    // status des touches de direction
    pushedKeys: {},
    rate: 6000,


    initialize: function (options) {
        this.parent(options);
        $(window).removeEvents('keydown');
        $(window).removeEvents('keyup');
        this.gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
        this.pushedKeys = {};
    },

    /*
     * Methode d'initialisation appelee avant le debut du combat
     * charge de mettre en place la capture des inputs
     */
    prepare: function () {
        var that = this;
        this.nextTicks = this.lastTicks = this.getTicks();
        $(window).addEvents({
            'keydown': function (e) {
                if (e.key != 'f12' && e.key != 'f5')
                    e.preventDefault();
                if (e.key == 'f11')
                    GlobalDispatcher.fireEvent(sfEvent.TOGGLE_FULLSCREEN, [this.pushedKeys]);
                else if (e.key == 'f4')
                    GlobalDispatcher.fireEvent(sfEvent.TOGGLE_DEBUG, [this.pushedKeys]);
                if (e.key == 'f2')
                    GlobalDispatcher.fireEvent(sfEvent.GAME_PAUSE, [this.pushedKeys]);
                else
                    that.push(e.key);
                e.stopPropagation();
            },
            'keyup' : function (e) {
                that.pop(e.key);
            }
        })
        if (this.gamepadSupportAvailable)
            this.gamepadManager = new GamePadManager();
    },

    push: function (key) {
        if (this.pushedKeys[key] == true) {
            return false;
        }
        if (KEYCONFIGURATION[key]) {
            this.pushedKeys[key] = true;
        }
        GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PUSHED, [this.pushedKeys]);
    },

    pop: function (key) {
        this.pushedKeys[key] = false;
        GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_RELEASED, [this.pushedKeys]);
    },

    getPushedKeys: function () {
        if (this.gamepadSupportAvailable && this.gamepadManager.hasTouchPressed())
            this.pushedKeys = this.gamepadManager.getPushedKeys();
        return this.pushedKeys;
    },

    update: function () {
        if (this.gamepadSupportAvailable)
            this.gamepadManager.poll();
        if (this.nextTicks >= this.lastTicks) {
            if (this.hasTouchPressed())
                GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PRESSED, [this.pushedKeys]);
            this.getNextTick();
        }
    },

    hasTouchPressed: function () {
        for (var key in this.pushedKeys) {
            if (this.pushedKeys[key] === true)
                return true;
        }
        return false;
    }
});
