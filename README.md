# mooStreetfighter 2

This project is an humble attempt at creating an HTML 5 fighting game, like the old one, but good, Street Fighter 2.

This project is powered by [http://www.mootools.net] MooTools

# What's working so far ?
* Sprite animation using div or canvas (on branch feat*canvas*sprite)
* Input detection
	* complex direction
	* keys holding
	* gamepad detection and handling
	* holding duration
	* configuration
* Combo detection for left and right side of the screen
* Health for each player
* Jump feature
* Box collision detection
* Few animations (kick, punch, crouch, crouch kick) for Ken character
* Special attack
* Player selection
* buggy parallax

# What's next ?
* Pixel collision detection
* All animations for Ken
* HADOUKEN !
* All characters
* AI
* Hitting the players
* Stage graphics
* Car and barrels stages
* Sounds
* ...

# How to play ?
- git clone
- launch index.html in a recent browser

        // change keys in config/config.js:41
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
	    
Or just use a gamepad
    


