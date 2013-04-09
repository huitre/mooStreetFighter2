var Utils = {
    calcSprite : function (x, y, w, h, nbFrames, rateList) {
        var str = '{x:-' + (x) +', y: -' + (y) + ', w:' + w + ', h: ' + h + ', deltaX: 0, deltaY: 0},\n';
        for (i = 1; i <= nbFrames; i++) {
            str += '{x:-' + (i*w + x) +', y: -' + y + ', w:' + w + ', h: ' + h +', deltaX: 0, deltaY: 0},\n';
        }
        console.log(str);
    }
}