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

var gamepad = {};

gamepad.BUTTONS = {
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

gamepad.AXES = {
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

    getPushedKeys: function () {
        for (var i = 0, m = this.gamepadList.length; i < m; i++) {
            var g = this.gamepadList[0]; // allow only one gamepad for the moment
            if (g) {
                this.pushedKeys['right'] = this.isPushed(g, gamepad.BUTTONS.PAD_RIGHT) || this.isStickMoved(g, gamepad.AXES.LEFT_ANALOGUE_HOR);
                this.pushedKeys['left'] = this.isPushed(g, gamepad.BUTTONS.PAD_LEFT) || this.isStickMoved(g, gamepad.AXES.LEFT_ANALOGUE_HOR, true);
                this.pushedKeys['up'] = this.isPushed(g, gamepad.BUTTONS.PAD_TOP) || this.isStickMoved(g, gamepad.AXES.LEFT_ANALOGUE_VERT, true);
                this.pushedKeys['down'] = this.isPushed(g, gamepad.BUTTONS.PAD_BOTTOM) || this.isStickMoved(g, gamepad.AXES.LEFT_ANALOGUE_VERT);
                this.pushedKeys['a'] = this.isPushed(g, gamepad.BUTTONS.FACE_1);
                this.pushedKeys['z'] = this.isPushed(g, gamepad.BUTTONS.FACE_2);
                this.pushedKeys['s'] = this.isPushed(g, gamepad.BUTTONS.FACE_3);
                this.pushedKeys['x'] = this.isPushed(g, gamepad.BUTTONS.FACE_4);
            }
        }
    },

    poll: function () {
        if (this.nextTicks >= this.lastTicks) {
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
        if (this.gamepadManager)
            this.pushedKeys = this.gamepadManager.getPushedKeys();
        return this.pushedKeys;
    },

    update: function () {
        if (this.gamepadManager)
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
