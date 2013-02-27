/**
 * @author Huitre<gohin.j@gmail.com>
 */

var Character = new Class({
    Extends : AnimatedSprite,
    Implements : [Events, ICollider, IPhysic],

    attackList : {},
    isJumping: true,
    isMoving: false,
    isAttacking: false,
    isHitable: false,

    initialize : function ( options ) {
        this.parent(options);
        this.attackList = options.attackList;
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
        if (!this.isMoving)
            this.changeAnimationTo('idle');
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

    crouch: function () {
        this.isMoving = true;
        this.changeAnimationTo('crouch');
    },

    lpunch: function () {
        this.setAttackState();
        this.changeAnimationTo('lpunch');
    },

    mediumPunch: function () {
        this.setAttackState();
        this.changeAnimationTo('mpunch');
    },

    highPunch: function () {
        this.setAttackState();
        this.changeAnimationTo('mpunch');
    },

    lkick: function () {
        this.setAttackState();
        this.changeAnimationTo('lkick');
    },

    mediumkick: function () {
        this.setAttackState();
        this.changeAnimationTo('lkick');
    },

    highKick: function () {
        this.setAttackState();
        this.changeAnimationTo('lkick');
    },

    getHit: function () {

    },

    reset: function (force) {
        this.isHitable = false;
        if (!this.isJumping) {
            this.isAttacking = this.getCurrentFrame() < this.getCurrentAnimation().length;
            if (!this.isAttacking || force) {
                this.isMoving = false;
                this.changeAnimationTo('idle');
                this.setCurrentFrame(0);
                this.setNextTicks();
            }
        }
    },

    execute: function (actionList) {
        // on verifie si l'on a une attaque speciale en 1er
        actionList = this.checkForSpecialAttack(actionList);
        // puis on execute les actions du buffer
        for (var i = actionList.length -1; i > -1; i--) {
            for (var j = actionList[i].length -1; j > -1; j--) {
                if (this[actionList[i][j]]) {
                    this[actionList[i][j]]();
                }
            }
        }
        
        return [];
    },

    checkForSpecialAttack: function (actionList) {
        return actionList;
    }

})

var Ken = new Class({
    Extends : Character,

    initialize : function ( options ) {
        this.parent(options);
    }
});
