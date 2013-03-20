/**
 * @author Huitre<gohin.j@gmail.com>
 */
 /*
  * Fichier de description des animations de chaque personnage
  *
  * Structure : 
        characterName :
            animationName : [ 
                    {
                      -left, -top, width, height, 
                      time between frame, 
                      diff between frame in x position, 
                      diff between frame in y position, 
                    }
                ]
  */
var Animation = {
  ken : {
    idle : [
      {x: -6,  y: -18,  w : 43, h: 81, rate:50, deltaX: 0, deltaY: 0},
      {x: -55,  y: -18, w : 43, h: 81, rate:50, deltaX: 0, deltaY: 0},
      {x: -105, y: -18, w : 43, h: 81, rate:50, deltaX: 0, deltaY: 0},
      {x: -154, y: -18, w : 43, h: 81, rate:50, deltaX: 0, deltaY: 0}
    ],
    walkright : [
      {x: -205, y: -17, w : 44, h: 82, rate: 50, deltaX: 0, deltaY: 0},
      {x: -252, y: -17, w : 43, h: 82, rate: 50, deltaX: 0, deltaY: 0},
      {x: -301, y: -17, w : 43, h: 82, rate: 50, deltaX: 0, deltaY: 0},
      {x: -351, y: -17, w : 43, h: 82, rate: 50, deltaX: 0, deltaY: 0},
      {x: -401, y: -17, w : 43, h: 82, rate: 50, deltaX: 0, deltaY: 0}
    ],
    lpunch: [
      {x: -7,   y: -134, w : 57, h: 81, rate: 90, deltaX: 0, deltaY: 0},
      {x: -64,  y: -134, w : 57, h: 81, rate: 120, deltaX: 0, deltaY: 0},
      {x: -121, y: -134, w : 57, h: 81, rate: 50, deltaX: 0, deltaY: 0}
    ],
    mpunch: [
      {x: -178, y: -130, w : 72, h: 86, rate: 30, deltaX: 0, deltaY: -4},
      {x: -250, y: -130, w : 72, h: 86, rate: 60, deltaX: 0, deltaY: -4},
      {x: -322, y: -130, w : 72, h: 86, rate: 60, deltaX: 0, deltaY: -4},
      {x: -394, y: -130, w : 72, h: 86, rate: 50, deltaX: 0, deltaY: -4},
      {x: -466, y: -130, w : 72, h: 86, rate: 40, deltaX: 0, deltaY: -4}
    ],
    lkick : [
      {x: -7,   y: -261, w : 67, h: 85, rate: 50, deltaX: -7, deltaY: -5},
      {x: -74,  y: -261, w : 67, h: 85, rate: 80, deltaX: -17, deltaY: -5},
      {x: -141, y: -261, w : 67, h: 85, rate: 80, deltaX: -7, deltaY: -5},
    ],
    shoryuken : [
      {x: -246, y: -0, w : 73, h: 100, deltaX: 0, deltaY: 0},
      {x: -320, y: 0, w : 73, h: 100, deltaX: 0, deltaY: 0},
      {x: -395, y: 0, w : 82, h: 100, deltaX: 0, deltaY: 0},
      {x: -476, y: 1, w : 82, h: 100, deltaX: 0, deltaY: 0},
      {x: -27, y: -110, w : 68, h: 136, deltaX: 0, deltaY: 0},
      {x: -107, y: -110, w : 68, h: 136, deltaX: 0, deltaY: 0},
      {x: -183, y: -110, w : 68, h: 136, deltaX: 0, deltaY: 0},
      {x: -251, y: -110, w : 73, h: 136, deltaX: 0, deltaY: 0},
      {x: -325, y: -114, w : 73, h: 136, deltaX: 0, deltaY: 0},
      {x: -398, y: -120, w : 64, h: 119, deltaX: 0, deltaY: 0},
      {x: -468, y: -126, w : 64, h: 115, deltaX: 0, deltaY: 0}
    ],
    jump : [
      {x: -498, y: -6, w: 43, h: 93, deltaX: 0, deltaY: 0},
      {x: -537, y: -15, w: 43, h: 81, deltaX: 0, deltaY: 0},
      {x: -575, y: -15, w: 43, h: 81, deltaX: 0, deltaY: 0},
      {x: -614, y: -15, w: 42, h: 81, deltaX: 0, deltaY: 0},
      {x: -498, y: -6, w: 43, h: 93, deltaX: 0, deltaY: 0}
    ],
    crouch: [
      {x: -1113, y: -24, w: 43, h: 75, deltaX: 0, },
      {x: -1160, y: -43, w: 43, h: 56, deltaX: 0, deltaY: 19}
    ],
    tatsumakisenpyaku: [
      {x: -1097, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1163, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1229, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1295, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1361, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1427, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1493, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1559, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40},
      {x: -1625, y: -493, w: 66, h: 121, deltaX: 23, deltaY: 40}
    ]
  },
  hadouken : {
    moving: [

    ],
    exploded: [
    ],
    idle: [
    ]
  }
};
