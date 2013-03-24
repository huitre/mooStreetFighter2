var DIR = {'up': true, 'left': true, 'down': true, 'right': true};

var ComboManager = new Class({
    Extends: Manager,
    Implements: [Events],
    keyPressed: null,
    actionList: [],
    max: 20,

    onKeyDown: function (keyList) {
        if (this.keyPressed == null)
            this.keyPressed = {};
        for (var key in keyList) {
            if (!this.keyPressed[key]) {
                this.keyPressed[key] = true;
            }
        }
        // on force la mise a jour des touches avant le translate
        // pour ne pas avoir de touches parasites
        this.onKeyUp(keyList);
        var translated = this.translate(this.keyPressed);
        this.setContent(translated);
    },

    getActionList: function () {
        return this.actionList;
    },

    setContent: function (actionList) {
        this.actionList.push(actionList);
        if (this.actionList.length > this.max)
            while (this.actionList.length > this.max)
                this.actionList.shift();
    },

    onKeyUp: function (keyList) {
        for (var key in keyList) {
            this.keyPressed[key] = keyList[key];
        }
    },

    translate: function (keyList) {
        var tmp = [], translated = this.translatePushedKeysToAction(keyList);

        for (var j = 0, m = translated.length; j < m; j++)
            tmp.push(translated[j]);

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
            return cleanTmp;
        return [];
    },

    translatePushedKeysToAction: function (keyList) {
        var str = '', k = KeyConfiguration, tmp = [];

        if (keyList.up) {
            str = k['up'];
            if (keyList.left)
                str +=  k['left'];
            else if (keyList.right)
                str +=  k['right'];
            tmp.push(str);
        }

        if (keyList.down) {
            str = k['down'];
            if (keyList.left)
                str += k['left'];
            else if (keyList.right)
                str += k['right'];
            tmp.push(str);
        }

        if (!keyList.down && !keyList.up) {
            if (keyList.left)
                tmp.push(k['left']);
            if (keyList.right)
                tmp.push(k['right']);
        }

        for (var a in keyList)
            if (!DIR[a] && keyList[a])
                tmp.push(k[a]);

        return tmp;
    },

    actionListToStr: function (actionList) {
        var actionStr = '';
        for (var i = 0, max = actionList.length; i < max; i++) {
            for (var j = 0, maxj = actionList[i].length; j < maxj; j++) {
                if (actionList[i][j].action) {
                    actionStr = actionStr + actionList[i][j].action + '';
                }
            }
        }
        return actionStr;
    },

    checkForSpecialAttack: function (attackList) {
        var actionStr = this.actionListToStr(this.actionList),
            comboList = [];

        for (var attackName in attackList) {
            for (var i = attackList[attackName].length -1; i > -1; i--) {
                if (actionStr.indexOf(attackList[attackName][i]) > 0 ) {
                    comboList.push(attackName);
                }
            }
        }
        return comboList;
    },

    hasTouchPressed: function () {
        for (var key in this.keyPressed) {
            if (this.keyPressed[key] === true)
                return true;
        }
        return false;
    }

});