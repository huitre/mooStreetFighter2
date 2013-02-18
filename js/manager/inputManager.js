/**
 * @author Huitre<gohin.j@gmail.com>
 */
var KeyConfiguration = {
    a: 'lp',
    s: 'hp',
    z: 'lk',
    x: 'hk'
}

var InputManager = new Class({
    Extends: Manager,

    // buffer des touches
    keyList: [],
    // buffer des actions (coup de poings, coup de pieds...)
    actionList[],
    rate: 500,
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
            'keydown': funct
            ion (e) {
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
        $('combo-status').set('html', this.keyList);
    },

    pop: function () {
        this.inCombo = false;
        this.lastTicks = this.getTicks();
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
        if (this.getTicks() > this.nextTicks && !this.isInCombo()) {
            this.translate();
            this.nextTicks = this.getTicks() + this.rate;
            this.clean();
        }            
    },

    /*
     * Methode 
     */
    clean: function () {
        this.keyList = [];
    },

    translate: function () {}
});
