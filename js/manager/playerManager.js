/**
 * @author Huitre<gohin.j@gmail.com>
 */

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
        if (this.player1 && this.player2)
            return [this.player1, this.player2];
        if (this.player1 && !this.player2)
            return [this.player1];
        return [this.player2];
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
        options.attackList = SpecialAttack.ken;
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
        this.getPlayers().each(function(player) {
            if (player)
                player.show();
        });

        GlobalDispatcher.addListener(sfEvent.ON_INPUT_READY, this.player1.onInputReady, this.player1);
        GlobalDispatcher.addListener(sfEvent.ON_INPUT_PUSHED, this.player1.onInputPushed, this.player1);
        GlobalDispatcher.addListener(sfEvent.ON_INPUT_PRESSED, this.player1.onInputPressed, this.player1);
        GlobalDispatcher.addListener(sfEvent.ON_INPUT_RELEASED, this.player1.onInputReleased, this.player1);
    },

    update : function (dt) {
        this.getPlayers().each(function(player) {
            player.render(dt);
        });
    }
})


