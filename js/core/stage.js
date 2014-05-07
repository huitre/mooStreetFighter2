/**
 * @author Huitre<gohin.j@gmail.com>
 */
var Stage = new Class({
    Extends: Sprite,
    Implements: ICollider,
    type: 'Stage',
    background: null,
    frontground: null,
    foreground: null,
    stageName: null,
    stageContainer: null,
    bounds: {},

    initialize: function (options) {
        options.el = options.main;
        this.stageName = options.stage;
        this.parent(options);
        this.sky = $(options.sky);
        this.viewport = $(options.viewport);
        this.stageContainer = $(options.main);
        this.bounds.viewport = this.viewport.getComputedSize();
        this.bounds.stage = this.stageContainer.getComputedSize();
        this.background = $(options.background);
        this.frontground = $(options.frontground);
        this.foreground = $(options.foreground);
        this.playersground = $('players');
        this.background.setStyle(
            'background-image', "url('" + BACKGROUNDURL + this.stageName + ".png')");
        this.frontground.setStyle(
            'background-image', "url('" + FRONTGROUNDURL + this.stageName + ".png')");
        this.foreground.setStyle(
            'background-image', "url('" + FOREGROUNDURL + this.stageName + ".png')");
        this.sky.setStyle(
            'background-image', "url('" + SKYURL + this.stageName + ".png')");
    },

    scroll: function (offset) {
        var viewportW = this.bounds.stage.width - this.bounds.viewport.width;
        /*this.foreground.setStyle('-webkit-transform', 'translate3d(' + (offset * 0.1 + 10 - viewportW) + 'px, 0, 0)');
        this.playersground.setStyle('-webkit-transform', 'translate3d(' + (offset * 0.3 - viewportW) + 'px, 0, 0)');
        this.background.setStyle('-webkit-transform', 'translate3d(' + (offset * 0.3 - viewportW) + 'px, 0, 0)');
        this.frontground.setStyle('-webkit-transform', 'translate3d(' + (offset * 0.5 - 50 - viewportW) + 'px, 0, 0)');*/
    },

    update: function (players) {
       var pos = [],
            centerPos = 0;
        players.each(function (player) {
            pos.push(player.getPosition().x - player.getIdleContext().deltaX);
            centerPos -= pos[pos.length - 1];
        }.bind(this));
        centerPos = centerPos/2 + pos[pos.length - 1];
        this.scroll(-(centerPos - this.bounds.stage.width/2));
    },

    // verifie si les joueurs sont dans le niveau
    checkPlayerBounds: function (collider) {
        var bounds = collider.getBounds(), paddingY = 5, paddingX = 0, pOffset = bounds.offset;

        if (bounds.h + bounds.y > this.bounds.stage.height - paddingY && collider.vy != 0) {
            collider.setPositionY(bounds.y - (bounds.h + bounds.y - (this.bounds.stage.height - paddingY)));
            collider.isOnFloor();
            collider.setForce(0, 0);
        }
        
        if (bounds.x < paddingX + bounds.deltaX - pOffset) {
            collider.setPositionX(paddingX + bounds.deltaX - pOffset);
        }
        if (bounds.x + bounds.w / 2 > this.bounds.viewport.width - paddingX ) {
            collider.setPositionX(this.bounds.viewport.width - paddingX - bounds.w / 2);
        }
        //debugger;
    },

    show: function () {
        this.parent();
        this.bounds.viewport = Object.merge(this.bounds.viewport, this.viewport.getPosition());
        this.bounds.stage = Object.merge(this.bounds.stage, this.stageContainer.getPosition());
    }
});