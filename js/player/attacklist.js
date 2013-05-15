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
        'forwardpunch': {
          'actionList': [['ehp'],['ohp']],
          'damage': 15
        },
        'hadoken': {
          'actionList': [
            ['sseelp', 'lpssee'],
            ['ssoolp', 'lpssoo']
          ],
          'damage': 10
        },
        'shoryuken':  {
          'actionList': [['sseehp'],['ssoohp']],
          'damage': 20
        },
        'tatsumakisenpyaku': {
          'actionList': [
            ['sseelk', 'sseehk'],
            ['ssoolk', 'ssoohk']
          ],
          'damage': 20
        },
        'lkick': {
          'actionList': [['x'], ['x']],
          'damage': 3
        },
        'mkick': {
          'actionList': [['x'], ['x']],
          'damage': 5
        },
        'hkick': {
          'actionList': [['x'], ['x']],
          'damage': 7
        },
        'lpunch': {
          'actionList': [['x'], ['x']],
          'damage': 3
        },
        'mpunch': {
          'actionList': [['x'], ['x']],
          'damage': 5
        },
        'hpunch': {
          'actionList': [['x'], ['x']],
          'damage': 7
        },
    }
 }