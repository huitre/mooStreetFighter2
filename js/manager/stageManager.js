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
        //p2.setPosition(stagePos.width/2 + 100, stagePos.height - floor - p2.getCurrentPlayedContext().h);
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