var Utils = {
    calcSprite : function (x, y, w, h, nbFrames, rateList) {
        var a = 43, b = 72;
        var str = '{x:-' + (x) +', y: -' + (y) + ', w:' + w + ', h: ' + h + ', deltaX: ' + (a - w) + ', deltaY: ' + (b - h) + '},\n';
        for (i = 1; i < nbFrames; i++) {
            str += '{x:-' + (i*w + x) +', y: -' + y + ', w:' + w + ', h: ' + h +', deltaX: ' + (a - w) + ', deltaY: ' + (b - h) + '},\n';
        }
        console.log(str);
    }
}