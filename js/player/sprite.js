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
    Implements: [Events],

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
    },

    getTicks: function () {
        return Date.now();
    },

    render: function () {
        this.updateAnimation();
        this.currentContext = this.getCurrentPlayedContext();
        if (this.isVisible && !this.isPaused) {
               
            this.el.setStyles({
                'background-position': this.currentContext.x + 'px ' + this.currentContext.y + 'px',
                'width': this.currentContext.w,
                'height': this.currentContext.h
            });

        }
    },

    updateAnimation: function () {
        if ( this.getTicks() > this.nextTicks ) {
            this.playNextFrame();
            this.nextTicks = this.getTicks() + this.getCurrentFrameTimer();
        }
    },

    playNextFrame: function () {
        this.lastFrame = this.currentFrame;
        this.lastAnimation = this.getCurrentAnimationName();
        this.currentFrame = this.currentFrame + 1;
        if (this.currentFrame > this.getCurrentAnimation().length - 1) {
            this.currentFrame = 0;
            this.reset(true);
        }
        this.normalizeDelta();
    },

    normalizeDelta: function () {
        // on decale le sprite suivant la differente entre les images, pour centrer l'animation
        var pos = this.getPosition(),
            currentContext = this.getCurrentPlayedContext(),
            lastContext = this.getLastContext(),
            deltaY = (currentContext.h - lastContext.h),
            deltaX = (currentContext.w - lastContext.w);

        if (!currentContext.deltaX)
            deltaX *= -1;
        if (!currentContext.deltaY)
            deltaY *= -1;
            //deltaY = currentContext.deltaY - lastContext.deltaY - (currentContext.h - lastContext.h),
            //deltaX = currentContext.deltaX - lastContext.deltaX - (currentContext.w - lastContext.w);
        this.setPosition((pos.x - deltaX), (pos.y - deltaY));
        console.log('pos.x ' + pos.x, 'new pos.x ' + this.getPosition().x);
    },

    setCurrentAnimation: function (animation) {
        if (animation != this.getCurrentAnimationName())
            this.setCurrentFrame(0);
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
        return this.animation[this.getCurrentAnimationName()][this.getCurrentFrame()];
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