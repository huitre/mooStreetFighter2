/**
 * @author Huitre<gohin.j@gmail.com>
 */
var KeyConfiguration = {
    'a': 'lp',
    's': 'hp',
    'z': 'lk',
    'x': 'hk',
    // cardinalite pour les directions
    'up': 'n',
    'down': 's',
    'left': 'o',
    'right': 'e',
    'upleft': 'no',
    'upright': 'ne',
    'downleft': 'so',
    'downright': 'se'
}

var InputManager = new Class({
    Extends: Manager,

    // buffer des touches
    keyList: [],
    // buffer des actions (coup de poings, coup de pieds...)
    actionList: [],
    rate: 200,
    // temps de latence entre 2 touches
    // avant de savoir si l'on a fini un combo
    comboTimeOut: 200,

    nextTicks: 0,
    lastTicks: 0,

    initialize: function (options) {
        this.parent(options);
        $(window).removeEvents('keydown');
        $(window).removeEvents('keyup');
    },

    /*
     * Methode d'initialisation appelee avant le debut du combat
     * charge de mettre en place la capture des inputs
     */
    prepare: function (players) {
        var that = this;
        this.nextTicks = this.lastTicks = this.getTicks() + this.rate;
        $(window).addEvents({
            'keydown': function (e) {
                if (e.key != 'f12')
                    e.preventDefault();
                that.push(e.key);
            },
            'keyup' : function (e) {
                that.pop();
            }
        })
    },

    push: function (key) {
        this.inCombo = true;
        this.keyList.push(key);
    },

    pop: function () {
    },

    /*
     * Verifie si l'on est entrain d'effectuer un combo
     * en verifiant le temps d'appui entre chaque touche
     * @return boolean
     */
    isInCombo: function () {
        if (!this.inCombo && (this.getTicks() - this.lastTicks > this.comboTimeOut))
            return true;
        return false;
    },

    /*
     * Methode appelee toutes les 30 i/s qui est chargee
     * de vider le buffer si besoin et de transformer la liste de touches en actions
     */
    update: function () {
        if (this.getTicks() > this.nextTicks) {
            this.translate();
            this.nextTicks = this.getTicks() + this.rate;
            this.clean();
            this.displayActions();
        }            
    },

    displayActions: function () {
        var imgs = [];
        for (var i = 0, max = this.actionList.length; i < max; i++) {
            imgs.push('<img src="sprites/combo/' + this.actionList[i] + '.png"/>');
        }
        $('combo-status').set('html', imgs.join(''));
        if (this.actionList.length > 20)
            this.actionList = [];
    },

    /*
     * Methode de suppression du buffer
     */
    clean: function () {
        this.keyList = [];
    },

    /*
     * Sert a transformer les touches enfoncees en actions
     * pour les combos et les actions des personnages
     */
    translate: function () {
        // parcours en sens inverse pour trouver la
        // 1ere touche appuyee
        var key = this.keyList.join('');
        if (KeyConfiguration[key]) {
            this.actionList.push(KeyConfiguration[key]);
        } else {
            for (var i = key.length - 1; i > -1; --i) {
                if (KeyConfiguration[key[i]]) {
                    this.actionList.push(KeyConfiguration[key[i]]);
                }
            }
        }
    }
});
