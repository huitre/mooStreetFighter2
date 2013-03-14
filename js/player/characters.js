/**
 * @author Huitre<gohin.j@gmail.com>
 */

var Character = new Class({
    Extends : AnimatedSprite,
    Implements : [ICollider, IPhysic],

    attackList : {},
    isJumping: true,
    isMoving: false,
    isCrouching: false,
    isBlocking: false,
    isAttacking: false,
    isHitable: false,

    initialize : function ( options ) {
        this.parent(options);
        this.attackList = options.attackList;
        GlobalDispatcher.addListener(sfEvent.ANIMATION_END, function (data, target) { this.updateState(data, target) }.bind(this));
        GlobalDispatcher.addListener(sfEvent.ON_INPUT_READY, this.onInputReady, this);
    },

    collideWith: function (objectCollider) {
        //console.log('collide with', objectCollider);
    },

    getCollidingPoint: function () {},

    getBounds: function () {
       return this.getCurrentBounds();
    },

    isOnFloor : function () {
        this.isJumping = false;
    },

    jump: function () {
        if (!this.isJumping) {
            this.isJumping = true;
            this.changeAnimationTo('jump');
            this.addForce(0, -25);
        }
    },

    // wrapper pour les noms courts d'action
    o: function () { this.moveLeft() },
    e: function () { this.moveRight() },
    n: function () { this.jump() },
    s: function () { this.crouch() },
    lp: function () { this.lpunch() },
    mp: function () { this.mediumPunch() },
    hp: function () { this.highPunch() },
    lk: function () { this.lkick() },
    mk: function () { this.mediumKick() },
    hk: function () { this.highKick() },

    moveLeft: function () {
        this.changeAnimationTo('walkright');
        this.addForce(-5, 0);
        this.isMoving = true;
    },

    moveRight: function () {
        this.isMoving = true;
        this.changeAnimationTo('walkright');
        this.addForce(5, 0);
    },

    setAttackState: function () {
        this.isAttacking = true;
        this.isHitable = true;
        this.isMoving = true;
    },

    onAttackEnd: function () {
        this.isAttacking = false;
        this.isHitable = false;
        this.isMoving = false;
    },

    crouch: function () {
        this.isMoving = true;
        this.isCrouching = true;
        this.changeAnimationTo('crouch');
    },

    attack: function (attackName) {
        if (!this.isAttacking)
            this.changeAnimationTo(attackName);
        this.setAttackState();
    },

    lpunch: function () {
        this. attack('lpunch');
    },

    mediumPunch: function () {
        this.attack('mpunch');
    },

    highPunch: function () {
        this.attack('mpunch');
    },

    lkick: function () {
        this.attack('lkick');
    },

    mediumkick: function () {
        this.attack('lkick');
    },

    highKick: function () {
        this.attack('lkick');
    },

    getHit: function () {

    },

    updateState: function (e, force) {
        this.isHitable = false;
        if (!this.isJumping) {
            if (!this.isAttacking) {
                this.isMoving = false;
            }
        }
        this.changeAnimationTo('idle');
    },

    onInputReady: function (actionList) {
        // on verifie si l'on a une attaque speciale en 1er
        actionList = this.checkForSpecialAttack(actionList);
        // puis on execute les actions du buffer
        if (!!actionList)
        for (var i = actionList.length -1; i > -1; i--) {
            for (var j = actionList[i].length -1; j > -1; j--) {
                if (this[actionList[i][j].action]) {
                    this[actionList[i][j].action]();
                }
            }
        }
        return [];
    },

    checkForSpecialAttack: function (actionList) {
        console.log(this.attackList);
        for (var i in this.attackList) {
            for (var j in this.attackList[i]) {
                //for (var k in actionList)
                console.log(actionList.join(''));
                    
            }
        }
        return actionList;
    }

})

var Ken = new Class({
    Extends : Character,

    initialize : function ( options ) {
        this.parent(options);
    }
});
