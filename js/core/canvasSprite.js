/**
 * @author Huitre<gohin.j@gmail.com>
 */
var CanvasSprite = new Class({
    Extends: Sprite,
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
    w: 0,
    h: 0,
    image: null,
    ctx: null, // canvas context

    // variables d'etat pour gerer la direction du sprite
    direction: LEFT,

    initialize: function (options) {
        if (options) {
            this.setOptions(options);
            this.image = new Image();
            this.image.src = this.options.image;
            this.root = $(options.el);
            this.root.width = 600;
            this.root.height = 400;
        }
        this.ctx = this.root.getContext('2d');
    },

    show: function () {
        this.isVisible = true;
    },

    hide: function () {
        this.isVisible = false;
    },

    setCurrentBounds: function (w, h) {
        this.w = w;
        this.h = h;
    },

    getCurrentPlayedContext: function () {
        return {
            w: this.w,
            h: this.h,
            x: this.x,
            y: this.y,
            deltaX: 0,
            deltaY: 0
        }
    },

    render: function () {
        this.ctx.drawImage(this.image, this.w, this.h, this.x, this.y);
        this.updatePosition();
    },

    setPositionX: function (x) {
        this.x = x;
    },

    setPositionY: function (y) {
        this.y = y;
    },

    setPosition: function (x, y) {
        this.x = x;
        this.y = y;
    },

    switchSide: function (dir) {
        var origin = 0, context;
        if (!this.isJumping && dir != this.direction) {
            this.direction = dir;
            context = this.getCurrentPlayedContext();
        }
    },

    toByteArray: function () {
        return this.ctx.getImageData(this.x, this.y, this.w, this.h);
    }
});

var AnimatedCanvasSprite = new Class({
    Extends : CanvasSprite,

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
            // recuperation des infos de l'animation courante a dessiner
            var currentContext = this.getCurrentPlayedContext();
            if (currentContext != this.lastContext)
                this.draw(currentContext);
        }
    },

    draw: function (currentContext) {
        //console.log(currentContext);
        // on efface tout
        //this.ctx.clearRect(this.x, this.y, currentContext.w, currentContext.h);
        this.ctx.drawImage(this.image, currentContext.x * -1, currentContext.y * -1, currentContext.w, currentContext.h, this.x, this.y, currentContext.w, currentContext.h);
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
                
            } else {
               
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
    },

    toByteArray: function () {
        var content = this.getCurrentPlayedContext();
        return this.ctx.getImageData(this.x, this.y, content.w, content.h);
    }
});