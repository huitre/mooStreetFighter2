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
    ken: {
        'forwardpunch': [
          'ehp',
          'hpe',
          'ohp',
          'hpo'
        ],
        'hadoken': [
            'sseelp', 
            'ssoolp',
            'lpssee', 
            'lpssoo'
        ],
        'shoryuken': [
            'sseehp', 
            'ssoohp'
        ],
        'tatsumakisenpyaku': [
            'sseelk', 
            'ssoolk',
            'sseehk', 
            'ssoohk'
        ],
        'shoryuken': [
          'ososlp',
          'eseslp'
        ]
    }
 }