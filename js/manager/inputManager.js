/**
 * @author Huitre<gohin.j@gmail.com>
 */

var GAMEPAD = {};

GAMEPAD.BUTTONS = {
  FACE_1: 0, // Face (main) buttons
  FACE_2: 1,
  FACE_3: 2,
  FACE_4: 3,
  LEFT_SHOULDER: 4, // Top shoulder buttons
  RIGHT_SHOULDER: 5,
  LEFT_SHOULDER_BOTTOM: 6, // Bottom shoulder buttons
  RIGHT_SHOULDER_BOTTOM: 7,
  SELECT: 8,
  START: 9,
  LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
  RIGHT_ANALOGUE_STICK: 11,
  PAD_TOP: 12, // Directional (discrete) pad
  PAD_BOTTOM: 13,
  PAD_LEFT: 14,
  PAD_RIGHT: 15
};

GAMEPAD.AXES = {
  LEFT_ANALOGUE_HOR: 0,
  LEFT_ANALOGUE_VERT: 1,
  RIGHT_ANALOGUE_HOR: 2,
  RIGHT_ANALOGUE_VERT: 3
};

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
                GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PUSHED, [pushedKeys], this);
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
                GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PRESSED, [this.pushedKeys], this);
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
                e.stopPropagation();
                that.push(e.key);
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
        if (KeyConfiguration[key]) {
            this.pushedKeys[key] = true;
        }
        GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PUSHED, [this.pushedKeys], this);
    },

    pop: function (key) {
        this.pushedKeys[key] = false;
        GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_RELEASED, [this.pushedKeys], this);
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
                GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PRESSED, [this.pushedKeys], this);
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
