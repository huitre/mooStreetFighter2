var Manager = new Class({
    initialize: function (game) {
        this.game = game;
    },
    update: function () {},
    render: function () {},
    start: function () {},
    stop: function () {},
    prepare: function () {},
    init: function (options) {}
})

var PlayerManager = new Class({
    Implements: Manager,
    player1: null,
    player2: null,

    setPlayer1: function (player) {
        this.player1 = this.playerFactory(player);
    },

    setPlayer2: function (player) {
        this.player2 = this.playerFactory(player);
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

        characterName = characterName.toLowerCase();

        // set defaults to Ken for the moment
        options.animation = Animation.ken;
        options.image = charactersUrl + characterName + '.gif';
        player = new Ken(options);

        switch (characterName) {
            case 'ken':
                break;

            case 'ryu':
                break;

            case 'thawk':
                break;

            case 'dalhsim':
                break;

            case 'balrog':
                break;

            case 'cammy':
                break;

            case 'bison':
                break;

            case 'vega':
                break;

            case 'feilong':
                break;
        }
        return player;
    },

    prepare: function () {
        this.player1.show();
        this.player2.show();
    }
})

var StageManager = new Class({
    Implements: Manager,

    background: null,
    frontground: null,
    foreground: null,
    stageName: null,

    setStage: function (stage) {
        this.stageName = stage;
    },

    getStage: function () {
        return this.stageName.trim();
    },

    prepare: function () {
        this.stage.setStyle('display', 'block');
        this.background.setStyle(
            'background-image', "url('"
        backgroundUrl + this.getStage() + ".gif')");

        this.frontground.setStyle(
            'background-image', "url('sprites/frontground/" + this.getStage() + ".gif')");
        this.foreground.setStyle(
            'background-image', "url('sprites/foreground/" + this.getStage() + ".gif')");
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
    Implements: Manager
});

var InputManager = new Class({
    Implements: Manager
});

var PhysicManager = new Class({
    Implements: Manager
});
