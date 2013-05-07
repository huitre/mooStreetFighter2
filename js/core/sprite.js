/**
 * @author Huitre<gohin.j@gmail.com>
 */
var Sprite = new Class({
    Implements: [Options],

    child: null,
    root: null,
    isVisible: true,
    x: 0,
    y: 0,
    to : {
        x: 0,
        y: 0,
        stepX: 0,
        stepY: 0
    },

    // variables d'etat pour gerer la direction du sprite
    direction: LEFT,

    initialize: function (options) {
        if (options) {
            this.setOptions(options);
            this.root = $(options.el);
            this.child = new Element('p', {
                styles: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0
                }
            });
            this.child.setStyle('background-image', 'url("' + options.image + '")');
            this.root.adopt(this.child);
        }
    },

    show: function () {
        this.root.show();
    },

    hide: function () {
        this.root.hide();
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
            x: this.getX(),
            y: this.y,
            w: currentContext.w,
            h: currentContext.h,
            deltaY: currentContext.deltaX,
            deltaX: currentContext.deltaX
        }
        return bounds;
    },

    setCurrentBounds: function (w, h) {
        this.child.setStyles({
            'width': w,
            'height': h
        });
    },

    getCurrentPlayedContext: function () {
        return this.el.getSize();
    },

    render: function () {
        var currentContext = this.getCurrentPlayedContext();
        if (this.isVisible && !this.isPaused) {
            this.child.setStyles({
                'background-position': currentContext.x + 'px ' + currentContext.y + 'px'
            });
            this.root.setStyles({
                'width': currentContext.w,
                'height': currentContext.h
            })
        }
        this.updatePosition();
    },

    setPositionX: function (x) {
        this.root.setStyles({
            'left': x + 'px'
        });
        this.x = x;
    },

    setPositionY: function (y) {
        this.root.setStyles({
            'top': y + 'px'
        });
        this.y = y;
    },

    setPosition: function (x, y) {
        this.root.setStyles({
            'top': y + 'px',
            'left': x + 'px'
        });
        this.x = x;
        this.y = y;
    },

    getPosition: function () {
        return {x: this.getX(), y: this.y}
    },

    getX: function () {
        return this.x;
    },

    // return position based on stage element
    toStage: function () {

    },

    moveTo: function (x, y, speed) {
        if (!speed)
            speed = 1000;
        if (x)
            this.to.stepX = speed / x;
        if (y)
            this.to.stepY = speed / y;
    },

    moveBy: function (x, y) {
        this.x += x;
        this.y += y;
        this.setPosition(this.x, this.y);
    },

    updatePosition: function () {
        if (this.x <= this.to.x)
            this.x += this.to.stepX;
        if (this.y <= this.to.y)
            this.y += this.to.stepY;
        this.setPosition(this.x, this.y);
    },

    switchSide: function (dir) {
        var origin = 0, context;
        if (!this.isJumping && dir != this.direction) {
            this.direction = dir;
            context = this.getCurrentPlayedContext();
            this.root.setStyles({
                'width': context.w,
                'height': context.h
            });
            this.child.setStyles({
                'transform': 'scaleX(' + this.direction + ')',
                '-webkit-transform': 'scaleX(' + this.direction + ')'
            })
        }
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
    },

    render: function () {
        if (!this.paused) { 
            this.updateAnimation();
            this.parent();
        }
    },

    getTicks: function () {
        return Date.now();
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
        this.currentFrame = this.currentFrame + 1;
        if (this.currentFrame > this.getCurrentAnimation().length - 1) {
            //GlobalDispatcher.fireEvent(sfEvent.ANIMATION_END, this);
            this.onAnimationEnd();
        }
    },

    onAnimationEnd: function () {
        this.lastFrame = this.currentFrame - 1;
        this.currentFrame = 0;
    },

    changeAnimationTo: function (animation) {
        GlobalDispatcher.fireEvent(sfEvent.ANIMATION_START);
        this.setCurrentAnimation(animation);

        var lastContext = this.getLastContext(),
            context = this.getCurrentPlayedContext();
        try {
            if (this.direction == LEFT) {
                this.child.setStyles({
                    'margin-left': context.deltaX
                })
            } else {
                this.child.setStyles({
                    'margin-left': 0
                })
            }
            this.setPositionY(this.y + (context.deltaY - lastContext.deltaY));
        } catch (e) {
            debugger;
        }

    },

    setCurrentAnimation: function (animation) {
        this.lastAnimation = this.currentAnimation;
        if (this.lastAnimation != animation) {
            this.setCurrentFrame(0);
            this.setNextTicks();
        }
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
        return this.animation[this.lastAnimation][0];
    },

    getCurrentPlayedContext: function () {
        var currentAnimation = this.getCurrentAnimation();
        if (this.getCurrentFrame() >= currentAnimation.length)
            return currentAnimation[0];
        return currentAnimation[this.getCurrentFrame()];
    },

    getIdleContext: function () {
        return this.animation['idle'][0];
    },

    getCurrentFrameTimer: function () {
        if (this.getCurrentPlayedContext().rate)
            return this.getCurrentPlayedContext().rate;
        return 133;
    },

    setRate: function (ms) {
        this.currentRate = ms;
    },

    getRate: function () {
        return this.currentRate;
    }
});