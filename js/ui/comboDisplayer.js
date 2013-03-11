var ComboDisplayer = new Class({
    content: [],
    max: 13,

    display: function () {
        var str = [],
            displayDiv = $('combo-status');
            
        for (var i = this.content.length -1; i > -1; i--) {
            str.push('<div>');
            for (var j = 0; j > -1; j--) {
                var imgs = this.content[i][j];
                for (var k = imgs.length -1; k > -1; k--)
                    str.push('<img src="sprites/combo/' + this.content[i][j][k].action + '.png"/>');
            }
            str.push('</div>');
        }
        displayDiv.set('html', str.join(''));
    },

    setContent: function (actionList) {
        this.content.push(actionList);
        if (this.content.length > this.max)
            while (this.content.length > this.max)
                this.content.shift();
    },

    getContent: function () {
        return this.content;
    }
})
