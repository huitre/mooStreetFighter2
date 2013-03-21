var DIR = {'up': true, 'left': true, 'down': true, 'right': true};

var ComboManager = new Class({
    Extends: Manager,
    Implements: [Events],
    keyPressed: {},
    actionList: [],

    onKeyDown: function (keyList) {
        for (var key in keyList) {
            if (!this.keyPressed[key]) {
                this.keyPressed[key] = true;
            }
        }
        var translated = this.translate(this.keyPressed);
        this.setContent(translated);
    },

    setContent: function (actionList) {
        this.actionList.push(actionList);
        if (this.actionList.length > this.max)
            while (this.actionList.length > this.max)
                this.actionList.shift();
    },

    onKeyUp: function (keyList) {
        for (var key in keyList) {
            if (this.keyPressed[key])
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
            if (keyList.right)
                str +=  k['right'];
            tmp.push(str);
        }

        if (keyList.down) {
            str = k['down'];
            if (keyList.left)
                str += k['left'];
            if (keyList.right)
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

    checkForSpecialAttack: function () {
        var actionStr = this.actionListToStr(this.actionList),
            comboList = [];
        if (this.actionList.length > 10)
            debugger;
        for (var attackName in this.attackList) {
            for (var i = this.attackList[attackName].length -1; i > -1; i--) {
                if (actionStr.indexOf(this.attackList[attackName][i]) > 0 ) {
                    comboList.push(this.attackList[attackName][i]);
                }
            }
        }
        return comboList;
    }

});