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
            'background-image', "url('" + backgroundUrl + this.stageName + ".png')");
        this.frontground.setStyle(
            'background-image', "url('" + frontgroundUrl + this.stageName + ".png')");
        this.foreground.setStyle(
            'background-image', "url('" + foregroundUrl + this.stageName + ".png')");
        this.sky.setStyle(
            'background-image', "url('" + skyUrl + this.stageName + ".png')");
    },

    scroll: function (offset) {
        var viewportW = this.bounds.stage.width - this.bounds.viewport.width;
        this.foreground.setStyle('left', offset * 0.1 + 10 - viewportW);
        this.playersground.setStyle('left', offset * 0.3 - viewportW);
        this.background.setStyle('left', offset * 0.3 - viewportW);
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
        this.scroll(-(centerPos - this.bounds.stage.width/2));
    },

    // verifie si les joueurs sont dans le niveau
    checkPlayerBounds: function (collider) {
        var bounds = collider.getBounds(), paddingY = 5, paddingX = 15;

        if (bounds.h + bounds.y > this.bounds.stage.height - paddingY && collider.vy != 0) {
            collider.setPositionY(bounds.y - (bounds.h + bounds.y - (this.bounds.stage.height - paddingY)));
            collider.isOnFloor();
            collider.setForce(0, 0);
        }
        if (bounds.x < paddingX  + bounds.deltaX) {
            collider.setPositionX(paddingX + bounds.deltaX);
        }
        if (bounds.x + bounds.w / 2 > this.bounds.viewport.width - paddingX ) {
            collider.setPositionX(this.bounds.viewport.width - paddingX - bounds.w / 2);
        }
    }
});