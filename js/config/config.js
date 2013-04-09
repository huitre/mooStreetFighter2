var globalCounter    = 0;
var characterUrl     = 'sprites/characters/';
var backgroundUrl    = 'sprites/background/';
var foregroundUrl    = 'sprites/foreground/';
var frontgroundUrl   = 'sprites/frontground/';
var skyUrl           = 'sprites/sky/';
var CONFIG = {
    SPEED: 1,
    SCALE: 2
}
var DIR = {'up': true, 'left': true, 'down': true, 'right': true};
var KeyConfiguration = {
    'a': 'lp',
    's': 'hp',
    'z': 'lk',
    'x': 'hk',
    // cardinalite pour les directions
    'up': 'n',
    'down': 's',
    'left': 'o',
    'right': 'e'
}
var myMooStreetFighter = null;
