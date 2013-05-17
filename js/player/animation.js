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
    hpunch: [
      {x: -178, y: -129, w: 72, h: 86, rate: 30, deltaX: -29, deltaY: -5},
      {x: -250, y: -129, w: 72, h: 86, rate: 60, deltaX: -29, deltaY: -5},
      {x: -322, y: -129, w: 72, h: 86, rate: 60, deltaX: -29, deltaY: -5},
      {x: -394, y: -129, w: 72, h: 86, rate: 50, deltaX: -29, deltaY: -5},
      {x: -466, y: -129, w: 72, h: 86, rate: 40, deltaX: -29, deltaY: -5}
    ],
    lkick: [
      {x: -7,   y: -261, w: 67, h: 85, rate: 50, deltaX: -17, deltaY: -4},
      {x: -74,  y: -261, w: 67, h: 85, rate: 80, deltaX: -17, deltaY: -4},
      {x: -141, y: -261, w: 67, h: 85, rate: 80, deltaX: -17, deltaY: -4}
    ],
    mkick: [
      {x:-208, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-277, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-346, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-415, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-484, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8}
    ],
    hkick: [
      {x:-208, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-277, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-346, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-415, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8},
      {x:-484, y: -257, w:69, h: 89, rate: 50, deltaX: -26, deltaY: -8}
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
      {x: -498, y: -6, w: 43, h: 93, rate: 680, deltaX: 0, deltaY: -12}
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
    jumphpunch: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    jumplkick: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    jumpmkick: [
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
      {x: -1442, y: -27, w: 43, h: 75, deltaX: 0, deltaY: 0}
    ],
    crouchlpunch: [
      {x: -62, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 27},
      {x: -1, y: -420, w: 62, h: 54, deltaX: 0, deltaY: 27}
    ],
    crouchmpunch: [
      {x: -1, y: -420, w: 61, h: 63, deltaX: -18, deltaY: 19},
      {x:-186, y: -411, w:61, h: 63, deltaX: -18, deltaY: 19},
      {x:-247, y: -411, w:61, h: 63, deltaX: -18, deltaY: 19},
      {x:-308, y: -411, w:61, h: 63, deltaX: -18, deltaY: 19},
      {x:-3619, y: -411, w:61, h: 63, deltaX: -18, deltaY: 19}
    ],
    crouchhpunch: [
      {x:-186, y: -411, w:61, h: 63, deltaX: -18, deltaY: 19},
      {x:-247, y: -411, w:61, h: 63, deltaX: -18, deltaY: 19},
      {x:-308, y: -411, w:61, h: 63, deltaX: -18, deltaY: 19}
    ],
    crouchlkick: [
      {x:-663, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18},
      {x:-733, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18},
      {x:-803, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18}
    ],
    crouchmkick: [
      {x:-875, y: -409, w:89, h: 65, deltaX: -46, deltaY: 18},
      {x:-964, y: -409, w:89, h: 65, deltaX: -46, deltaY: 18},
      {x:-1053, y: -409, w:89, h: 65, deltaX: -46, deltaY: 18}
    ],
    crouchhkick: [
      {x:-1142, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18},
      {x:-1212, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18},
      {x:-1282, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18},
      {x:-1352, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18},
      {x:-1422, y: -409, w:70, h: 65, deltaX: -27, deltaY: 18}
    ],
    /* BLOCKING */
    blocking: [
      {x: -1393, y: -16, w: 43, h: 83, deltaX: 0, deltaY: 0}
    ],
    /* SPECIAL ATTACK */
    tatsumakisenpyaku: [
      {x:-1299, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49},
      {x:-1368, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49},
      {x:-1437, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49},
      {x:-1506, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49},
      {x:-1575, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49},
      {x:-1644, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49},
      {x:-1713, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49},
      {x:-1782, y: -493, w:69, h: 121, deltaX: -26, deltaY: -49}
    ],
    forwardlkick: [
      {x:-552, y: -237, w:70, h: 109, deltaX: -27, deltaY: -37},
      {x:-622, y: -237, w:70, h: 109, deltaX: -27, deltaY: -37},
      {x:-692, y: -237, w:70, h: 109, deltaX: -27, deltaY: -37}
    ],
    forwardhkick: [
      {x:-805, y: -237, w:79, h: 109, deltaX: -36, deltaY: -37},
      {x:-884, y: -237, w:79, h: 109, deltaX: -36, deltaY: -37},
      {x:-963, y: -237, w:79, h: 109, deltaX: -36, deltaY: -37},
      {x:-1042, y: -237, w:79, h: 109, deltaX: -36, deltaY: -37},
      {x:-1121, y: -237, w:79, h: 109, deltaX: -36, deltaY: -37}
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
