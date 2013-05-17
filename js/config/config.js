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
// TOUCHES POUR PLAYER 1
var PLAYER1_LP = 'a',
    PLAYER1_MP = 's',
    PLAYER1_HP = 'd',
    PLAYER1_LK = 'z',
    PLAYER1_MK = 'x',
    PLAYER1_HK = 'c',
    PLAYER1_UP = 'up',
    PLAYER1_DWN = 'down',
    PLAYER1_LEFT = 'left',
    PLAYER1_RIGHT = 'right';

// TOUCHES POUR PLAYER 1
var PLAYER2_LP = 'a',
    PLAYER2_MP = 's',
    PLAYER2_HP = 'd',
    PLAYER2_LK = 'z',
    PLAYER2_MK = 'x',
    PLAYER2_HK = 'c',
    PLAYER2_UP = 'up',
    PLAYER2_DWN = 'down',
    PLAYER2_LEFT = 'left',
    PLAYER2_RIGHT = 'right';


var KEYCONFIGURATION = {};
    KEYCONFIGURATION[PLAYER1_LP] = 'lp',
    KEYCONFIGURATION[PLAYER1_MP] = 'mp',
    KEYCONFIGURATION[PLAYER1_HP] = 'hp',
    KEYCONFIGURATION[PLAYER1_LK] = 'lk',
    KEYCONFIGURATION[PLAYER1_MK] = 'mk',
    KEYCONFIGURATION[PLAYER1_HK] = 'hk',
    // cardinalite pour les directions
    KEYCONFIGURATION[PLAYER1_UP] = 'n',
    KEYCONFIGURATION[PLAYER1_DWN] = 's',
    KEYCONFIGURATION[PLAYER1_LEFT] = 'o',
    KEYCONFIGURATION[PLAYER1_RIGHT] = 'e';

/**
 * Variable pour le debug
 */
var CONFIG = {
    SPEED: 1,
    SCALE: 2,
    DEBUG: {
      HITINFO: true,
      HITBOX: true
    }
}


var LEFT = -1;
var RIGHT = 1;

// variable globale d'acces au jeu
var myMooStreetFighter = null;
