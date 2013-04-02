/**
 * @author Huitre<gohin.j@gmail.com>
 */
var Sprite = new Class({
    Implements: [Options],

    el: null,
    isVisible: true,
    x : 0,
    y : 0,
    to : {
        x: 0,
        y: 0,
        stepX: 0,
        stepY: 0
    },

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
        var currentContext = this.getCurrentPlayedContext();
        if (this.isVisible && !this.isPaused) {
            this.el.setStyles({
                'background-position': currentContext.x + 'px ' + currentContext.y + 'px',
                'width': currentContext.w,
                'height': currentContext.h
            });
        }
        this.updatePosition();
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
        if (!speed)
            speed = 1000;
        if (x)
            this.to.stepX = speed / x;
        if (y)
            this.to.stepY = speed / y;
    },

    updatePosition: function () {
        if (this.x <= this.to.x)
            this.x += this.to.stepX;
        if (this.y <= this.to.y)
            this.y += this.to.stepY;
        this.setPosition(this.x, this.y);
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
        this.updateAnimation();
        this.parent();
    },

    getTicks: function () {
        return Date.now();
    },

    setNextTicks: function () {
        this.nextTicks = this.getTicks() + this.getCurrentFrameTimer() * CONFIG.SPEED;
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
            GlobalDispatcher.fireEvent(sfEvent.ANIMATION_END);
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
            this.setPosition(
                this.x + (context.deltaX - lastContext.deltaX),
                this.y + (context.deltaY - lastContext.deltaY)
            );            
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

var Stage = new Class({
    Extends: Sprite,
    Implements: ICollider,
    type: 'Stage',
    background: null,
    frontground: null,
    foreground: null,
    stageName: null,
    bounds: {},

    initialize: function (options) {
        options.el = options.main;
        this.stageName = options.stage;
        this.parent(options);
        this.sky = $(options.sky);
        this.viewport = $(options.viewport);
        this.bounds = this.viewport.getComputedSize();
        this.background = $(options.background);
        this.frontground = $(options.frontground);
        this.foreground = $(options.foreground);
        this.background.setStyle(
            'background-image', "url('" + backgroundUrl + this.stageName + ".png')");
        this.frontground.setStyle(
            'background-image', "url('" + frontgroundUrl + this.stageName + ".png')");
        this.foreground.setStyle(
            'background-image', "url('" + foregroundUrl + this.stageName + ".png')");
        this.sky.setStyle(
            'background-image', "url('" + skyUrl + this.stageName + ".png')");
    },

    scroll: function (offset) {
        var viewportW = this.bounds.width/2;
        this.foreground.setStyle('left', offset * 0.1 + 10 - viewportW);
        this.background.setStyle('left', offset * 0.3 + 100 - viewportW);
        this.frontground.setStyle('left', offset * 0.5 - 50 - viewportW);
    },

    update: function (players) {
        var pos = [],
            centerPos = 0;
        players.each(function (player) {
            pos.push(player.getPosition().x - player.getCurrentPlayedContext().deltaX);
            centerPos -= pos[pos.length - 1];
        }.bind(this));
        centerPos = centerPos/2 + pos[pos.length - 1];
        this.scroll(-(centerPos - this.bounds.width/2));
    },

    // verifie si les joueurs sont dans le niveau
    checkPlayerBounds: function (collider) {
        var b = collider.getBounds(), padding = 5;
        console.log(this.bounds.height);
        if (b.h + b.y > this.bounds.height - padding && collider.vy != 0) {
            collider.setPosition(b.x, b.y - (b.h + b.y - (this.bounds.height - padding)));
            collider.setForce(0, 0);
            collider.isOnFloor();
        } else if (b.x < padding) {
            collider.setPosition(padding, b.y);
        }
        else if (b.x + b.w > this.bounds.width - padding) {
            collider.setPosition(this.bounds.width - padding, b.y);
        } else {
            collider.setPosition(b.x, b.y);
        }
    }
});