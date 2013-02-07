var mooSprite = new Class({
    Implements: [Options, Events, Chain],

    // contenu
    el : null,
  	animation : null,

    // variable de contexte
    currentAnimation : null,
    currentFrame : null,
    currentRate : 1000/60,
    isVisible : true,
    isPaused : false,

  	initialize : function ( options ) {
      if ( options ) {
  		  this.setOptions( options );
        this.el.setStyle( 'background-image', 'url("' + options.image + '")' );
        this.el = $(options.el);
        this.animation = this.options.animation;
      }
      this.play();
  	},

    show : function () {
      this.el.show();
    },

    hide : function () {
      this.el.hide();
    },

  	play : function () {
      this.isPaused = false;
  	},

  	pause : function () {
      this.paused = true;
  	},

    render : function () {
      if ( this.isVisible && !this.isPaused ) {
        var context = this.getCurrentPlayedContext();
        this.el.setStyle( 'background-position', context.x, context.y );
      }
    },

    getCurrentBounds : function () {
      var currentContext = this.animation[ this.getCurrentAnimation() ][ this.getCurrentFrame() ];
      var bounds = {
            w : currentContext.w,
            h : currentContext.h
          }
      return bounds;
    },

    setCurrentBounds : function ( w, h ) {
      var currentContext = this.getCurrentPlayedContext();
      currentContext.w = w;
      currentContext.h = h;
    },

    setCurrentAnimation : function ( animation ) {
      this.currentAnimation = animation;
    },

    getCurrentAnimation : function () {
      return this.currentAnimation;
    },

    getCurrentFrame : function () {
      return this.currentFrame;
    },

    getCurrentPlayedContext : function () {
      return this.animation[ this.getCurrentAnimation() ][ this.getCurrentFrame() ];
    },

    setRate : function ( ms ) {
      this.currentRate = ms;
    },

    getRate : function () {
      return this.currentRate;
    },

    setPosition : function ( x, y ) {
      this.el.setPosition( { x: x, y : y } );
    },

    getPosition : function () {
      return this.el.getPosition();
    },

    moveTo : function ( x, y, speed ) {

    }
});