var Collider = new Class({
    collideWith: function (objectCollider) {},
    isColliding: function () {},
    getCollingPoint: function () {}
})

var Sprite = new Class({
    Extends: [Collider],
    Implements: [Options],

    el: null,
    isVisible: true,

    initialize: function (options) {
        if (options) {
            this.setOptions(options);
            this.el.setStyle('background-image', 'url("' + options.image + '")');
            this.el = $(options.el);
        }
    },
    show: function () {
        this.el.show();
    },

    hide: function () {
        this.el.hide();
    },

      play: function () {
        this.isPaused = false;  
    },

      pause: function () {
        this.paused = true;  
    },

    getCurrentBounds: function () {
        var currentContext = this.getCurrentPlayedContext();
        var bounds = {
            w: currentContext.x,
            h: currentContext.y
        }
        return bounds;
    },

    setCurrentBounds: function (w, h) {
        this.el.setStyles({
            'width': w,
            'height': h
        });
    },

    getCurrentPlayedContext: function () {
        return this.el.getSize();
    },

    render: function () {
        if (this.isVisible && !this.isPaused) {
            var context = this.getCurrentPlayedContext(),
                pos = this.getPosition();
            this.el.setStyles({
                'background-position': '0 0',
                'top': pos.y,
                'left': pos.x,
                'width': context.w,
                'height': context.h
            });
        }
    },

    setPosition: function (x, y) {
        this.el.setPosition({
            x: x,
            y: y
        });
    },

    getPosition: function () {
        return this.el.getPosition();
    },

    moveTo: function (x, y, speed) {

    }
})

var AnimatedSprite = new Class({
    Implements: [Events, Sprite],

    // contenu
     animation: null,

    // variable de contexte
    currentAnimation: null,
    currentFrame: null,
    currentRate: 1000 / 60,
    isPaused: false,
    lastTicks: 0,

    initialize: function (options) {
        parent.initialize(options);
        this.animation = this.options.animation; 
    },

    render: function () {
        if (this.isVisible && !this.isPaused) {
            var context = this.getCurrentPlayedContext(),
                pos = this.getPosition();
            this.el.setStyles({
                'background-position': '0 0',
                'top': pos.y,
                'left': pos.x,
                'width': context.w,
                'height': content.h
            });
            this.updateContext();
        }
    },

    setCurrentAnimation: function (animation) {
        this.currentAnimation = animation;
    },

    getCurrentAnimation: function () {
        return this.currentAnimation;
    },

    getCurrentFrame: function () {
        return this.currentFrame;
    },

    getCurrentPlayedContext: function () {
        return this.animation[this.getCurrentAnimation()][this.getCurrentFrame()];
    },

    setRate: function (ms) {
        this.currentRate = ms;
    },

    getRate: function () {
        return this.currentRate;
    }
});