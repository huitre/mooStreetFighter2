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
        'crouchlkick': {
          'actionList': [['x'], ['x']],
          'damage': 3
        },
        'crouchlkick': {
          'actionList': [['x'], ['x']],
          'damage': 5
        },
        'crouchmkick': {
          'actionList': [['x'], ['x']],
          'damage': 5
        },
        'crouchhkick': {
          'actionList': [['x'], ['x']],
          'damage': 10
        },
        'crouchlpunch': {
          'actionList': [['x'], ['x']],
          'damage': 3
        },
        'crouchmpunch': {
          'actionList': [['x'], ['x']],
          'damage': 5
        },
        'crouchhpunch': {
          'actionList': [['x'], ['x']],
          'damage': 7
        },
        'jumplkick': {
          'actionList': [['x'], ['x']],
          'damage': 3
        },
        'jumplkick': {
          'actionList': [['x'], ['x']],
          'damage': 5
        },
        'jumpmkick': {
          'actionList': [['x'], ['x']],
          'damage': 10
        },
        'jumphkick': {
          'actionList': [['x'], ['x']],
          'damage': 10
        },
        'jumplpunch': {
          'actionList': [['x'], ['x']],
          'damage': 3
        },
        'jumpmpunch': {
          'actionList': [['x'], ['x']],
          'damage': 5
        },
        'jumphpunch': {
          'actionList': [['x'], ['x']],
          'damage': 7
        }
    }
 }