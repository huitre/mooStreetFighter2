/**
 * @author Huitre<gohin.j@gmail.com>
 */
var KeyConfiguration = {
    'attack' : {
        'a': 'lp',
        's': 'hp',
        'z': 'lk',
        'x': 'hk'
    },
    'directions' : {
        // cardinalite pour les directions
        'up': 'n',
        'down': 's',
        'left': 'o',
        'right': 'e',
        'upleft': 'no',
        'leftup': 'no',
        'rightup': 'ne',
        'upright': 'ne',
        'leftdown': 'so',
        'downleft': 'so',
        'downright': 'se',
        'rightdown': 'se'
    }
}

/*
 * Represente l'etat d'une action suite a une suite de touches presses
 * ex : haut-droite presse depuis 2secondes
 */
var Key = new Class({
    repeated: 0,
    action: null,
    sinceLastPress: 0, // not for now
    pressed: true,

    initialize: function (action) {
        this.action = action;
        this.sinceLastPress = Date.now();
        this.pressed = true;
    },

    addRepetition: function () {
        this.repeated++;
    }
})

var InputManager = new Class({
    Extends: Manager,
    Implements: [Events],

    // buffer des touches
    keyList: [],
    // buffer des actions (coup de poings, coup de pieds...)
    actionList: [],
    rate: 100,
    // temps de latence entre 2 touches
    // avant de savoir si l'on a fini un combo
    comboTimeOut: 200,

    nextTicks: 0,
    lastTicks: 0,

    // status des touches de direction
    pushedKeys: {},


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
                if (e.key != 'f12' && e.key != 'f5')
                    e.preventDefault();
                e.stopPropagation();
                that.push(e.key);
            },
            'keyup' : function (e) {
                that.pop(e.key);
            }
        })
    },

    push: function (key) {
        this.inCombo = true;
        if (!this.pushedKeys[key])
            this.keyList.push(key);
        if (KeyConfiguration['attack'][key] ||
            KeyConfiguration['directions'][key]
            ) {
            this.pushedKeys[key] = true;
        }
        GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PRESSED, [this.translate([key]), this.pushedKeys], this);
    },

    pop: function (key) {
        if (this.pushedKeys[key])
            this.pushedKeys[key] = false;
        GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_RELEASED, [this.translate([key]), this.pushedKeys], this);
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
            this.translate(this.keyList);
            this.execute();
            this.nextTicks = this.getTicks() + this.rate;
            this.clean();
            GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_PRESSED, [this.pushedKeys], this);
        }
    },

    /*
     * Methode de suppression du buffer
     */
    clean: function () {
        this.keyList = [];
        this.actionList = [];
        /*if (this.actionList.length > 20)
            this.actionList = this.actionList.slice(0,1);*/
    },

    /*
     * Sert a transformer les touches enfoncees en actions
     * pour les combos et les actions des personnages
     */
    translate: function (keyList) {
        // parcours en sens inverse pour trouver la
        // 1ere touche appuyee
        var tmp = [],
            key = keyList,
            attack = KeyConfiguration['attack'],
            dir = KeyConfiguration['directions'];
        // tant que l'on a recu des touches
        for (var i = key.length - 1; i > -1; --i) {
            if (attack[key[i]]) {
                tmp.push(attack[key[i]]);
            } /*else if (dir[key[i]]) {
                // tant que l'on a une touche de direction
                var dirTmp = [], sdirTmp;
                while(dir[key[i]]) {
                    dirTmp.push(key[i]);
                    i--;
                }
                // on veut pouvoir dire que ['up', 'right']
                // equivaut a 'upright'
                sdirTmp = dirTmp.join('');
                if (dir[sdirTmp])
                    tmp.push(dir[sdirTmp]);
                else
                    for (var j = dirTmp.length - 1; j > -1; j--)
                        tmp.push(dir[dirTmp[j]]);
            }*/
        }

        var str = '', k = KeyConfiguration, dir = {'up': true, 'left': true, 'down': true, 'right': true},
            keyList = this.pushedKeys;
        if (keyList.up) {
            str = k[keyList.up];
            if (keyList.left)
                str +=  k[keyList.left];
            if (keyList.right)
                str +=  k[keyList.right];
            tmp.push(str);
        }
        if (keyList.down) {
            str = k[keyList.down];
            if (keyList.left)
                str += k[keyList.left];
            if (keyList.right)
                str += k[keyList.right];
            tmp.push(str);
        }
        if (keyList.left)
            tmp.push(k[keyList.left]);
        if (keyList.right)
            tmp.push(k[keyList.right]);
        for (var a in keyList)
            if (!dir[a])
                tmp.push(k[a]);

        // on verifie les repetitions
        var last = 0, cleanTmp = [], key;
        for (k = 0, m = tmp.length; k < m; k++) {
            if (last != tmp[k]) {
                key = new Key(tmp[k]);
                cleanTmp.push(key);
            } else {
                key.addRepetition();
            }
            last = tmp[k];
        }
        if (cleanTmp.length)
            this.actionList.push(cleanTmp);
    },

    getPushedKeys: function () {
        return this.pushedKeys;
    },

    execute: function () {
        if (this.actionList.length > 0)
            GlobalDispatcher.fireEvent(sfEvent.ON_INPUT_READY, [this.actionList, this.pushedKeys], this);
    }
});
