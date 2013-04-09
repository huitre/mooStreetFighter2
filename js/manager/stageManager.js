var StageManager = new Class({
    Implements: Manager,

    ui: null,
    stage: null,
    stageName: null,
    stageType : 'versus', // versus, car, barrel...

    setStage: function (stage) {
        this.stageName = stage;
    },

    getStage: function () {
        return this.stageName.trim();
    },

    getUi: function () {
        return this.ui;
    },

    prepare: function () {
        this.players = pm = this.game.getPlayerManager().getPlayers();
        if (this.stageType == 'versus') {
            this.prepareVersusStage();
        }
    },

    prepareVersusStage: function () {
        var pm = this.game.getPlayerManager(),
            p1 = pm.getPlayer1(),
            p2 = pm.getPlayer2(),
            floor = 13;
        this.ui = new VersusUi(this.game);
        this.ui.init(this.options.ui);
        this.ui.prepare(p1, p2);
        this.options.stage = this.getStage();
        this.stage = new Stage(this.options);
        this.stage.setPosition(-140,0);
        this.stage.show();
        var stagePos = this.stage.el.getComputedSize();

        // positionnement des joueurs
        p1.setPosition(stagePos.width/2  - 100, stagePos.height - floor - p1.getCurrentPlayedContext().h);
        p2.setPosition(stagePos.width/2 + 100, stagePos.height - floor - p2.getCurrentPlayedContext().h);
    },

    updateStagePosition: function (player) {
        this.stage.update(player);
    },

    render: function () {
        this.players.each(function (player) {
            this.stage.checkPlayerBounds(player);
        }.bind(this));
        this.updateStagePosition(this.players);
        this.ui.update();
    },

});