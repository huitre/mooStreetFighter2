var globalCounter    = 0;
// chemins d'acces des sprites pour le decor et les personnages
var CHARACTERURL     = 'sprites/characters/';
var BACKGROUNDURL    = 'sprites/background/';
var FOREGROUNDURL    = 'sprites/foreground/';
var FRONTGROUNDURL   = 'sprites/frontground/';
var SKYURL           = 'sprites/sky/';

/**
 * Configuration des inputs
 */
var GAMEPAD = {};

GAMEPAD.BUTTONS = {
  FACE_1: 0, // Face (main) buttons
  FACE_2: 1,
  FACE_3: 2,
  FACE_4: 3,
  LEFT_SHOULDER: 4, // Top shoulder buttons
  RIGHT_SHOULDER: 5,
  LEFT_SHOULDER_BOTTOM: 6, // Bottom shoulder buttons
  RIGHT_SHOULDER_BOTTOM: 7,
  SELECT: 8,
  START: 9,
  LEFT_ANALOGUE_STICK: 10, // Analogue sticks (if depressible)
  RIGHT_ANALOGUE_STICK: 11,
  PAD_TOP: 12, // Directional (discrete) pad
  PAD_BOTTOM: 13,
  PAD_LEFT: 14,
  PAD_RIGHT: 15
};

GAMEPAD.AXES = {
  LEFT_ANALOGUE_HOR: 0,
  LEFT_ANALOGUE_VERT: 1,
  RIGHT_ANALOGUE_HOR: 2,
  RIGHT_ANALOGUE_VERT: 3
};
var DIR = {'up': true, 'left': true, 'down': true, 'right': true};
var KEYCONFIGURATION = {
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

/**
 * Variable pour le debug
 */
var CONFIG = {
    SPEED: 1,
    SCALE: 2
}


var LEFT = -1;
var RIGHT = 1;

// variable globale d'acces au jeu
var myMooStreetFighter = null;
