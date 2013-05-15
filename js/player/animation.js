/**
 * @author Huitre<gohin.j@gmail.com>
 */
 /*
  * Fichier de description des animations de chaque personnage
  *
  * Structure:
        characterName:
            animationName: [
                    {
                      -left, -top, width, height,
                      time between frame,
                      diff between frame in x position,
                      diff between frame in y position,
                    }
                ]
  */
var Animation = {
  ken: {
    idle: [
      {x: -6,  y: -18,  w: 43, h: 81, rate:70, deltaX: 0, deltaY: 0},
      {x: -55,  y: -18, w: 43, h: 81, rate:90, deltaX: 0, deltaY: 0},
      {x: -105, y: -18, w: 43, h: 81, rate:110, deltaX: 0, deltaY: 0},
      {x: -154, y: -18, w: 43, h: 81, rate:50, deltaX: 0, deltaY: 0}
    ],
    walkright: [
      {x: -205, y: -17, w: 43, h: 82, rate: 50, deltaX: 0, deltaY: -1},
      {x: -252, y: -17, w: 43, h: 82, rate: 50, deltaX: 0, deltaY: -1},
      {x: -301, y: -17, w: 43, h: 82, rate: 50, deltaX: 0, deltaY: -1},
      {x: -351, y: -17, w: 43, h: 82, rate: 50, deltaX: 0, deltaY: -1},
      {x: -401, y: -17, w: 43, h: 82, rate: 50, deltaX: 0, deltaY: -1}
    ],
    lpunch: [
      {x: -7,   y: -134, w: 57, h: 81, rate: 90, deltaX: -14, deltaY: 0},
      {x: -64,  y: -134, w: 57, h: 81, rate: 120, deltaX: -14, deltaY: 0},
      {x: -121, y: -134, w: 57, h: 81, rate: 50, deltaX: -14, deltaY: 0}
    ],
    mpunch: [
      {x: -178, y: -129, w: 72, h: 86, rate: 30, deltaX: -29, deltaY: -5},
      {x: -250, y: -129, w: 72, h: 86, rate: 60, deltaX: -29, deltaY: -5},
      {x: -322, y: -129, w: 72, h: 86, rate: 60, deltaX: -29, deltaY: -5},
      {x: -394, y: -129, w: 72, h: 86, rate: 50, deltaX: -29, deltaY: -5},
      {x: -466, y: -129, w: 72, h: 86, rate: 40, deltaX: -29, deltaY: -5}
    ],
    lkick: [
      {x: -7,   y: -261, w: 67, h: 85, rate: 50, deltaX: -17, deltaY: -4},
      {x: -74,  y: -261, w: 67, h: 85, rate: 80, deltaX: -17, deltaY: -4},
      {x: -141, y: -261, w: 67, h: 85, rate: 80, deltaX: -17, deltaY: -4},
    ],
    shoryuken: [
      {x: -246, y: -0, w: 73, h: 100, deltaX: 0, deltaY: 0},
      {x: -320, y: 0, w: 73, h: 100, deltaX: 0, deltaY: 0},
      {x: -395, y: 0, w: 82, h: 100, deltaX: 0, deltaY: 0},
      {x: -476, y: 1, w: 82, h: 100, deltaX: 0, deltaY: 0},
      {x: -27, y: -110, w: 68, h: 136, deltaX: 0, deltaY: 0},
      {x: -107, y: -110, w: 68, h: 136, deltaX: 0, deltaY: 0},
      {x: -183, y: -110, w: 68, h: 136, deltaX: 0, deltaY: 0},
      {x: -251, y: -110, w: 73, h: 136, deltaX: 0, deltaY: 0},
      {x: -325, y: -114, w: 73, h: 136, deltaX: 0, deltaY: 0},
      {x: -398, y: -120, w: 64, h: 119, deltaX: 0, deltaY: 0},
      {x: -468, y: -126, w: 64, h: 115, deltaX: 0, deltaY: 0}
    ],
    /* JUMPING ANIMATION */
    jump: [
      {x: -498, y: -6, w: 43, h: 93, rate: 60, deltaX: 0, deltaY: -12},
      {x: -541, y: -6, w: 43, h: 93, rate: 50, deltaX: 0, deltaY: -12},
      {x: -584, y: -6, w: 43, h: 93, rate: 50, deltaX: 0, deltaY: -12},
      {x: -627, y: -6, w: 43, h: 93, rate: 50, deltaX: 0, deltaY: -12},
      {x: -498, y: -6, w: 43, h: 93, rate: 680, deltaX: 0, deltaY: -12},
    ],
    jumpforwardright: [
      {x: -754,  y: -7, w: 74, h: 93, rate: 60,  deltaX: -30, deltaY: -12},
      {x: -828,  y: -7, w: 74, h: 93, rate: 100, deltaX: -30, deltaY: -12},
      {x: -902,  y: -7, w: 74, h: 93, rate: 60,  deltaX: -30, deltaY: -12},
      {x: -976,  y: -7, w: 74, h: 93, rate: 60,  deltaX: -30, deltaY: -12},
      {x: -1050, y: -7, w: 74, h: 93, rate: 90,  deltaX: -30, deltaY: -12},
      {x: -1124, y: -7, w: 74, h: 93, rate: 650, deltaX: -10, deltaY: -12}
    ],
    jumpforwardleft: [
      {x: -1124, y: -7, w: 74, h: 93, rate: 60,  deltaX: -30, deltaY: -12},
      {x: -1050, y: -7, w: 74, h: 93, rate: 100, deltaX: -30, deltaY: -12},
      {x: -976,  y: -7, w: 74, h: 93, rate: 60,  deltaX: -30, deltaY: -12},
      {x: -902,  y: -7, w: 74, h: 93, rate: 60,  deltaX: -30, deltaY: -12},
      {x: -828,  y: -7, w: 74, h: 93, rate: 90,  deltaX: -30, deltaY: -12},
      {x: -754,  y: -7, w: 74, h: 93, rate: 650, deltaX: -10, deltaY: -12}
    ],
    jumplpunch: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    jumpmpunch: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    jumplkick: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    jumphkick: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    /* CROUCHING ANIMATION */
    crouch: [
      {x: -1338, y: -24, w: 44, h: 75, deltaX: 0, deltaY: 6}
    ],
    crouchblocking: [
      {x: -1442, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    crouchlpunch: [
      {x: -62, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 27},
      {x: -1, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 27}
    ],
    crouchmpunch: [
      {x: -62, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 27},
      {x: -1, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 27}
    ],
    crouchlkick: [
      {x: -62, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 27},
      {x: -1, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 0}
    ],
    crouchmkick: [
      {x: -62, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 0},
      {x: -1, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 0}
    ],
    blocking: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    /* SPECIAL ATTACK */
    tatsumakisenpyaku: [
      {x:-1299, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40},
      {x:-1365, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40},
      {x:-1431, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40},
      {x:-1497, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40},
      {x:-1563, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40},
      {x:-1629, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40},
      {x:-1695, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40},
      {x:-1761, y: -492, w:66, h: 122, deltaX: -32, deltaY: -40}
    ]
  },
  hadouken: {
    moving: [

    ],
    exploded: [
    ],
    idle: [
    ]
  }
};
