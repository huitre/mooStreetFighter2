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

    /*
     * Initialise tous les composants pour un stage 1 player vs IA
     */
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
        this.stage.show();
        var stagePos = this.stage.bounds.stage;

        // positionnement des joueurs
        p1.setPosition(stagePos.width/2 - p1.getCurrentPlayedContext().w, stagePos.height - floor - p1.getCurrentPlayedContext().h);
        p2.setPosition(stagePos.width/2 - p2.getCurrentPlayedContext().w, stagePos.height - floor - p2.getCurrentPlayedContext().h);
        p2.switchSide(LEFT);
    },

    updateStagePosition: function (player) {
        this.stage.update(player);
    },

    update: function (dt) {
        this.players.each(function (player) {
            player.render();
            this.stage.checkPlayerBounds(player);
        }.bind(this));
        this.updateStagePosition(this.players);
        this.ui.update(dt);
        this.checkPlayerDirection();
    },

    /*
     * Permet de definir le cote vers lequel le character est tourne (LEFT ou RIGHT)
     */
    checkPlayerDirection: function () {
        var p1 = this.players[0],
            p2 = this.players[1];

        if (p1.x > p2.x + p2.getCurrentPlayedContext().w / 2) {
            if (p1.direction != LEFT)
                p1.switchSide(LEFT);
        } else {
            if (p1.direction != RIGHT)
                p1.switchSide(RIGHT);
        }

        if (p2.x > p1.x + p1.getCurrentPlayedContext().w / 2) {
            if (p2.direction != LEFT)
                p2.switchSide(LEFT);
        } else {
            if (p2.direction != RIGHT)
                p2.switchSide(RIGHT);
        }
    }

});