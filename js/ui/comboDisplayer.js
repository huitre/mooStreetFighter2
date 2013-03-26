var ComboDisplayer = new Class({
    content: [],
    max: 13,

    display: function () {
        var str = [],
            displayDiv = $('combo-status');

        for (var i = this.content.length -1; i > -1; i--) {
            for (var j = this.content[i].length -1; j > -1; j--) {
                str.push('<div>');
                //for (var k = this.content[i][j].length -1; k > -1; k--) {
                    //str.push('<img src="sprites/combo/' + this.content[i][j][k].action + '.png"/>');
                    str.push('<img src="sprites/combo/' + this.content[i][j].action + '.png"/>');
                //}
                str.push('</div>');
            }
        }
        displayDiv.set('html', str.join(''));
    },

    setContent: function (actionList) {
        this.content = actionList;
        if (this.content.length > this.max)
            while (this.content.length > this.max)
                this.content.shift();
    },

    getContent: function () {
        return this.content;
    }
})
