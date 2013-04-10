/**
 * @author Huitre<gohin.j@gmail.com>
 */
var Menu = new Class({
    game: null,
    mainMenu: null,

    initialize: function (game) {
        this.game = game;
    },

    init: function (mainMenu) {
        this.mainMenu = mainMenu;
    },

    destroy: function () {},
});

var mooMenu = new Class({
    Implements: [Options, Events, Chain],
    currentLink: null,

    initialize: function (options) {
        var that = this;
        this.setOptions(options);
        this.options.element = $(this.options.element);

        $$('.menu').each(function (e) {
            e.getElements('a').addEvent('click', function (e) {
                e.preventDefault();
                that.showMenu(this.get('href'));
            });
        });
    },

    showSplashScreen: function () {
        this.showMenu('start-page');
    },

    showMenu: function (link) {
        menu = $(link);
        this.currentLink = menu;
        if (menu) {
            this.options.element.getElements('.menu').fade('out').setStyle('display', 'none');
            for (var o in this.options.menus) {
                this.options.menus[o].destroy();
            }
            if (this.options.menus[link]) this.options.menus[link].init(this);
            menu.fade('in').setStyle('display', 'block');
        }
    },

    setMenus: function (menus) {
        this.options.menus = menus;
    },

    showConfirm: function () {
        return false;
    },

    hide: function () {
        var that = this;
        this.options.element.fade('out')
        window.setTimeout(function () {
            that.options.element.setStyle('display', 'none');
        }, 1000);
    },

    show: function () {
        this.options.element.setStyle('display', 'block');
        this.options.element.fade('in');
    }
});


var menuPlayerSelection = new Class({
    Implements: Chain,
    // inheritance
    Extends: Menu,

    // members
    content: [],

    init: function (mainMenu) {
        this.parent(mainMenu);
        var that = this;
        $('blank-flash').hide();
        this.content = this.mainMenu.currentLink.getElements('.player');
        this.content.each(function (playerDiv) {
            playerDiv.removeEvents('mouseover')
                .removeEvents('click')
                .addEvents({
                mouseover: function (evt) {
                    that.onMouseOver(evt, playerDiv);
                },
                click: function (evt) {
                    that.onClick(playerDiv, evt);
                }
            });
        });
    },

    onMouseOver: function (evt, div) {
        $('player1-selection').className = 'pselected';
        $('player1-selection').addClass(div.get('class').replace('player', ''));
    },

    onClick: function (playerDiv, evt) {
        var el = playerDiv,
            player1 = this.getPlayerFromDiv(el),
            player2 = this.getRandomPlayer();

        this.game.getPlayerManager().setPlayer1(player1);
        this.game.getPlayerManager().setPlayer2(player2);

        $('player2-selection').className = 'pselected';
        $('player2-selection').addClass(player2);

        el.addClass('selected');

        this.showStageSelection();
    },

    getPlayerFromDiv: function (el) {
        return el.get('class').replace('player', '');
    },

    getRandomPlayer: function () {
        return this.getPlayerFromDiv(this.content[Math.floor(Math.random() * this.content.length) + 1]);
    },

    destroy: function () {
        try {
            this.content.each(

            function (playerDiv) {
                playerDiv.removeEvents('mouseover')
                    .removeEvents('click');
            });
            this.mainMenu.currentLink.hide();
        }
        catch (e) {
        }
    },

    showStageSelection: function () {
        var that = this;
        $('blank-flash').show().fade('out');
        window.setTimeout(function () {
            that.mainMenu.showMenu('stage-selection');
        }, 1000);
    }
});

var menuStageSelection = new Class({
    // inheritance
    Extends: Menu,

    init: function (mainMenu) {
        this.parent(mainMenu);
        var that = this;
        this.content = this.mainMenu.currentLink.getElements('.s');
        this.content.each(function (playerDiv) {
            playerDiv.addEvents({
                click: function (evt) {
                    that.onClick(playerDiv, evt);
                }
            });
        });
    },

    onClick: function (playerDiv, evt) {
        var el = playerDiv,
            player1 = this.getStageFromDiv(el);
        el.addClass('selected');
        this.game.getStageManager().setStage(player1);
        this.game.launch();
    },

    getStageFromDiv: function (el) {
        return el.get('class').replace('s', '');
    },
});

