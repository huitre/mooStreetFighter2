/**
 * @author Huitre<gohin.j@gmail.com>
 */

var Manager = new Class({
    Implements : Options,
    initialize: function (game) {
        this.game = game;
    },
    update: function () {},
    render: function () {},
    start: function () {},
    stop: function () {},
    prepare: function () {},
    init: function (options) {
        this.setOptions(options);
    }
})

var PlayerManager = new Class({
    Implements: Manager,
    player1: null,
    player2: null,

    setPlayer1: function (player) {
        this.player1 = this.playerFactory(player, this.options.p1);
    },

    setPlayer2: function (player) {
        this.player2 = this.playerFactory(player, this.options.p2);
    },

    getPlayers: function () {
        return [this.player1, this.player2];
    },

    getPlayer1: function () {
        return this.player1;
    },

    getPlayer2: function () {
        return this.player2;
    },

    playerFactory: function (characterName, playerElement) {
        var options = {
            el: playerElement
        }, player;
        characterName = characterName.trim().toLowerCase();

        // set defaults to Ken for the moment
        options.animation = Animation.ken;
        options.image = characterUrl + characterName + '.gif';
        options.currentAnimation = 'idle';
        player = new Ken(options);

        switch (characterName) {
            case 'ken':
            case 'ryu':
            case 'thawk':
            case 'dalhsim':
            case 'balrog':
            case 'cammy':
            case 'bison':
            case 'vega':
            case 'feilong':
            break;
        }
        return player;
    },

    prepare: function () {
        this.player1.show();
        this.player2.show();
    },

    render : function () {
        this.player1.render();
        this.player2.render();
    }
})

var StageManager = new Class({
    Implements: Manager,

    background: null,
    frontground: null,
    foreground: null,
    stageName: null,
    stageType : 'versus', // versus, car, barrel...

    setStage: function (stage) {
        this.stageName = stage;
    },

    getStage: function () {
        return this.stageName.trim();
    },

    prepare: function () {
        this.stage.setStyle('display', 'block');
        this.background.setStyle(
            'background-image', "url('" + backgroundUrl + this.getStage() + ".gif')");
        /*
        this.frontground.setStyle(
            'background-image', "url('" + frontgroundUrl + this.getStage() + ".gif')");
        this.foreground.setStyle(
            'background-image', "url('" + foregroundUrl + this.getStage() + ".gif')");
        */
        if (this.stageType == 'versus') {
            this.prepareVersusStage();
        }
    },

    prepareVersusStage: function () {
        var pm = this.game.getPlayerManager(),
            p1 = pm.getPlayer1(),
            p2 = pm.getPlayer2(),
            stagePos = this.stage.getCoordinates(),
            floor = 13;

        // centrage du background
        this.background.setStyle('background-position', '-140px 0px');

        // positionnement des joueurs
        p1.setPosition(stagePos.width/2  - 100, stagePos.height - floor - p1.getCurrentPlayedContext().h);
        p2.setPosition(stagePos.width/2 + 100, stagePos.height - floor - p2.getCurrentPlayedContext().h);
        // gravity test
    },

    render: function () {

    },

    init: function (options) {
        this.stage = $(options.main);
        this.background = $(options.background);
        this.frontground = $(options.frontground);
        this.foreground = $(options.foreground);
    }
});

var CollisionManager = new Class({
    Implements: Manager,

    colliderList : [],

    addCollider: function ( colliderArray ) {
        this.colliderList.combine(colliderArray);
    },

    update: function () {
        var that = this;
        this.colliderList.each(function (collider, index) {
            collider.isColliding(that.colliderList);
        });
    }
});

var InputManager = new Class({
    Implements: Manager,

    initialize: function () {

    },

    prepare: function (players) {
        var player1 = players[0];
        $(window).addEvents({
            'keydown': function (e) {
                switch (e.key) {
                    case 'space':
                        player1.lpunch();
                    break;
                    case 'up':
                        player1.jump();
                    break;

                    case 'left':
                        player1.moveLeft();
                    break;

                    case 'right':
                        player1.moveRight();
                    break;
                }
            },
            'keyup' : function () {
                player1.reset();
            }
        })
    }
});

var PhysicManager = new Class({
    Extends : CollisionManager,
    Implements: Manager,

    floor: 209,

    update: function () {
        var that = this;
        this.colliderList.each(function (collider) {
            var g = collider.applyGravity(),
                b = collider.getBounds();

            b.x = g.x;
            b.y = g.y;
            if (b.h + b.y > that.floor && collider.vy != 0) {
                collider.setPosition(b.x, b.y - (b.h + b.y - that.floor) + 1);
                collider.setForce(0, 0);
                collider.isOnFloor();
            } else {
                collider.setPosition(b.x, b.y);
            }
        });
    }
});

