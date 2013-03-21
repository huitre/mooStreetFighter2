/**
 * @author Huitre<gohin.j@gmail.com>
 */
var Sprite = new Class({
    Implements: [Options],

    el: null,
    isVisible: true,
    x : 0,
    y : 0,

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
            x: this.x,
            y: this.y,
            w: currentContext.w,
            h: currentContext.h
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
            var context = this.getCurrentPlayedContext();
            this.el.setStyles({
                'background-position': '0 0',
                'top': this.y + 'px',
                'left': this.x + 'px',
                'width': context.w,
                'height': context.h
            });
        }
    },

    setPosition: function (x, y) {
        //console.log(this.getCurrentAnimationName() + ' setPosition x ' + x + ' y ' + y);
        this.el.setStyles({
            'top': y + 'px',
            'left': x + 'px'
        });
        this.x = x;
        this.y = y;
    },

    getPosition: function () {
        return {x: this.x, y: this.y}
    },

    moveTo: function (x, y, speed) {

    }
});

var AnimatedSprite = new Class({
    Extends : Sprite,

    // contenu
    animation: null,

    // variable de contexte courant
    lastAnimation: 'idle',
    currentAnimation: 'idle',
    currentFrame: 0,
    lastFrame: 0,
    currentRate: 1000 / 60,
    currentContext: null,

    // controle
    isPaused: false,
    nextTicks: 0,

    initialize: function (options) {
        this.parent(options);
        this.animation = this.options.animation;
        this.currentAnimation = this.options.currentAnimation;
        this.ticks = new Date();
        this.setNextTicks();
        this.lastPosition = this.getPosition();
        this.name = 'toto' + Math.random();
        //GlobalDispatcher.addListener(sfEvent.ANIMATION_END, function (e) { this.onAnimationEnd(e) }.bind(this));
    },

    getTicks: function () {
        return Date.now();
    },


    render: function () {
        var currentContext = this.getCurrentPlayedContext();
        if (this.isVisible && !this.isPaused) {
            this.el.setStyles({
                'background-position': currentContext.x + 'px ' + currentContext.y + 'px',
                'width': currentContext.w,
                'height': currentContext.h
            });

        }
        this.updateAnimation();
    },

    setNextTicks: function () {
        this.nextTicks = this.getTicks() + this.getCurrentFrameTimer();
    },

    updateAnimation: function () {
        if ( this.getTicks() > this.nextTicks ) {
            this.playNextFrame();
            this.setNextTicks();
        }
    },

    playNextFrame: function () {
        this.lastFrame = this.currentFrame;
        this.lastAnimation = this.currentAnimation;
        this.currentFrame = this.currentFrame + 1;
        if (this.currentFrame > this.getCurrentAnimation().length - 1) {
            GlobalDispatcher.fireEvent(sfEvent.ANIMATION_END);
            this.onAnimationEnd();
        }
    },

    onAnimationEnd: function () {
        this.currentFrame = 0;
    },

    changeAnimationTo: function (animation) {
        GlobalDispatcher.fireEvent(sfEvent.ANIMATION_START);
        this.setCurrentAnimation(animation);
        var lastContext = this.getLastContext(),
            context = this.getCurrentPlayedContext();
        this.el.setStyles({
            'width': lastContext.w,
            'height': lastContext.h
        });
        try {
        this.setPosition(
            this.x + (context.deltaX - lastContext.deltaX),
            this.y + (context.deltaY - lastContext.deltaY)
        );
        } catch (e) {
            debugger;
        }
    },

    setCurrentAnimation: function (animation) {
        if (this.lastAnimation == animation)
            return false;
        this.lastAnimation = this.currentAnimation;
        this.setCurrentFrame(0);
        this.setNextTicks();
        this.currentAnimation = animation;
    },

    getCurrentAnimationName: function () {
        return this.currentAnimation;
    },

    setCurrentFrame: function (n) {
        this.currentFrame = n;
    },

    getCurrentFrame: function () {
        return this.currentFrame;
    },

    getCurrentAnimation: function () {
        return this.animation[this.getCurrentAnimationName()];
    },

    getLastContext: function () {
        return this.animation[this.lastAnimation][this.lastFrame];
    },

    getCurrentPlayedContext: function () {
        var currentAnimation = this.getCurrentAnimation();
        if (this.getCurrentFrame() >= currentAnimation.length)
            return currentAnimation[0];
        return currentAnimation[this.getCurrentFrame()];
    },

    getCurrentFrameTimer: function () {
        return this.getCurrentPlayedContext().rate || 133;
    },

    setRate: function (ms) {
        this.currentRate = ms;
    },

    getRate: function () {
        return this.currentRate;
    }
});