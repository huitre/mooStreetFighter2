/**
 * @author Huitre<gohin.j@gmail.com>
 */

var mooStreetFighter = new Class({
    framerate: 1000 / 30,
    optios: null,
    playerManager: null,
    stageManager: null,
    menuManager: null,
    inputManager: null,
    collisionManager: null,
    gameLoop: null,

    initialize: function (options) {
        this.options = options;
    },

    getPlayerManager: function () {
        if (this.playerManager == null) {
            this.playerManager = new PlayerManager(this);
            this.playerManager.init(this.options.stage.player);
        }
        return this.playerManager;
    },

    getStageManager: function () {
        if (this.stageManager == null) {
            this.stageManager = new StageManager(this);
            this.stageManager.init(this.options.stage);
        }
        return this.stageManager;
    },

    getCollisionManager: function () {
        return this.collisionManager;
    },

    getInputManager: function () {
        return this.inputManager;
    },

    getPhysicManager: function () {
        return this.physicManager;
    },

    /**
     * Gameloop principal de rendu
     */
    render: function () {
        this.inputManager.update();
        this.collisionManager.update();
        this.stageManager.render();
        this.playerManager.render();
        this.physicManager.update();
    },

    play: function () {
        var that = this;
        requestAnimationFrame(function () { that.play() });
        that.render();
        //this.gameLoop.periodical(this.framerate);
    },

    pause: function () {
        clearInterval(this.gameLoop);
    },

    quit: function () {
        quit = mooMenu.showConfirm();
        if (quit) {
            this.gameOver();
        }
    },

    gameOver: function () {

    },

    /**
     * Initialise le jeu
     */
    startGame: function () {
        this.menuManager = new mooMenu({
            game: this,
            element: this.options.menu.element
        });
        this.menuManager.setMenus({
            'start-game': new menuPlayerSelection(this),
            'stage-selection': new menuStageSelection(this)
        });
        this.inputManager = new InputManager(this);
        this.collisionManager = new CollisionManager(this);
        this.physicManager = new PhysicManager(this);
    },

    /**
     * Methode d'initialisation de tous les composants
     * avant le debut du combat ( positionnement, affichage, affichage de l'ui ...)
     */
    launch: function () {
        var that = this,
            players = this.playerManager.getPlayers();
        this.menuManager.hide();
        var t = function () {
            this.stageManager.prepare();
            this.playerManager.prepare();
            this.inputManager.prepare(players);
            this.collisionManager.addCollider(players);
            this.physicManager.addCollider([this.playerManager.getPlayer1()]);
            this.play();
        }
        t.bind(this).delay(1000);
    }
});
