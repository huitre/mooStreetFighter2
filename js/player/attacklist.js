/**
 * @author Huitre<gohin.j@gmail.com>
 */
 /*
  * Fichier de description des actions a effectuer pour 
  * les attaques speciales des personnages.
  *
  * Structure : 
        characterName :
            attackName : [ 
                    [leftsided list of actions], 
                    [rightsided list of actions]
                ]
  */
 var SpecialAttack = {
    ken : {
        'forwardpunch' : [
          ['e', 'hp'],
          ['o', 'hp']
        ],
        'hadoken' : [
            ['s', 'se', 'e', 'lp'], 
            ['s', 'so', 'o', 'lp']
        ],
        'shoryuken' : [
            ['s', 'se', 'e', 'hp'], 
            ['s', 'so', 'o', 'hp']
        ],
        'tatsumakisenpyaku' : [
            ['s', 'se', 'e', 'lk'], 
            ['s', 'so', 'o', 'lk']
        ]
    }
 }