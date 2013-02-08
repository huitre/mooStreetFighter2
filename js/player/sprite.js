var Sprite = new Class({
    Implements: [Options],

    el: null,
    isVisible: true,

    initialize: function (options) {
        if (options) {
            this.setOptions(options);
            this.el = $(options.el);
            this.el.setStyle('background-image', 'url("' + options.image + '")');
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
        if (this.isVisible) {
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
    Extends : Sprite,
    Implements: [Events],

    // contenu
     animation: null,

    // variable de contexte
    currentAnimation: 'idle',
    currentFrame: 0,
    currentRate: 1000 / 60,
    isPaused: false,
    lastTicks: 0,
    nextTicks: 0,

    initialize: function (options) {
        this.parent(options);
        this.animation = this.options.animation;
        this.currentAnimation = this.options.currentAnimation;
        this.lastTicks = new Date();
    },

    render: function () {
        if (this.isVisible && !this.isPaused) {
            var context = this.getCurrentPlayedContext(),
                pos = this.getPosition();
            this.el.setStyles({
                'background-position': context.x + 'px ' + context.y + 'px',
                /*'top': pos.y,
                'left': pos.x,*/
                'width': context.w,
                'height': context.h
            });
            this.updateContext();
        }
    },

    updateContext: function () {
        if ( this.lastTicks.getTime() > this.nextTicks ) {
            this.playNextFrame();
            this.nextTicks = this.lastTicks.getTime() + 1000;
        }
    },

    playNextFrame: function () {
        this.currentFrame = this.currentFrame + 1;
        if ( this.currentFrame > this.getCurrentAnimation().length  - 1)
            this.currentFrame = 0;
    },

    setCurrentAnimation: function (animation) {
        this.currentAnimation = animation;
    },

    getCurrentAnimationName: function () {
        return this.currentAnimation;
    },

    getCurrentFrame: function () {
        return this.currentFrame;
    },

    getCurrentAnimation: function () {
        return this.animation[this.getCurrentAnimationName()];
    },

    getCurrentPlayedContext: function () {
        return this.animation[this.getCurrentAnimationName()][this.getCurrentFrame()];
    },

    setRate: function (ms) {
        this.currentRate = ms;
    },

    getRate: function () {
        return this.currentRate;
    }
});