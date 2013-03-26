/**
 * @author Huitre<gohin.j@gmail.com>
 */

var IActionable = new Class({
    // wrapper pour les noms courts d'action
    o: function () { this.moveLeft() },
    e: function () { this.moveRight() },
    n: function () { this.jump() },
    no: function () { this.forwardJump('left') },
    ne: function () { this.forwardJump('right') },
    s: function () { this.crouch() },
    se: function () { this.crouch() },
    so: function () { this.crouch() },
    lp: function () { this.lowpunch() },
    mp: function () { this.mediumPunch() },
    hp: function () { this.highPunch() },
    lk: function () { this.lowkick() },
    mk: function () { this.mediumKick() },
    hk: function () { this.highKick() },
});

var Character = new Class({
    Extends: AnimatedSprite,
    Implements: [ICollider, IPhysic, IActionable],

    attackList : {},
    isJumping: true,
    isMoving: false,
    isCrouching: false,
    isBlocking: false,
    isAttacking: false,
    isHitable: false,
    comboDisplayer: null,
    comboManager: null,

    initialize : function ( options ) {
        this.parent(options);
        this.attackList = options.attackList;
        this.comboDisplayer = new ComboDisplayer();
        this.comboManager = new ComboManager();
        GlobalDispatcher.addListener(sfEvent.ANIMATION_END, this.updateState, this);
    },

    collideWith: function (objectCollider) {
        switch (objectCollider.type) {
            case 'Floor':
                this.isOnFloor();
            break;
        }
    },

    getCollidingPoint: function () {},

    getBounds: function () {
       return this.getCurrentBounds();
    },

    isOnFloor : function () {
        this.isJumping = false;
    },

    forwardJump: function (dir) {
        if (!this.isJumping) {
            this.isJumping = true;
            this.isMoving = true;
            this.isHitable = true;
            if (dir == 'left') {
                this.addForce(-15, -12);
                this.changeAnimationTo('jumpforwardleft');
            } else {
                this.addForce(15, -12);
                this.changeAnimationTo('jumpforwardright');
            }
        }
    },

    jump: function () {
        if (!this.isJumping) {
            this.isJumping = true;
            this.isMoving = true;
            this.isHitable = true;
            this.changeAnimationTo('jump');
            this.addForce(0, -12);
        }
    },

    canMove: function () {
        if (this.isAttacking || this.isCrouching || this.isJumping || this.isBlocking)
            return false;
        return true;
    },

    moveLeft: function () {
        if (this.canMove()) {
            this.changeAnimationTo('walkright');
            this.addForce(-5, 0);
            this.isMoving = true;
        }
    },

    moveRight: function () {
        if (this.canMove()) {
            this.isMoving = true;
            this.changeAnimationTo('walkright');
            this.addForce(5, 0);
        }
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
        if (!this.isAttacking) {
            if (this.isCrouching && !this.isJumping)
                attackName = 'crouch' + attackName;
            if (this.isJumping && !this.isCrouching)
                attackName = 'jump' + attackName;
            this.changeAnimationTo(attackName);
        }
        this.setAttackState();
    },

    lowpunch: function () {
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

    isInactive: function () {
        return !this.comboManager.hasTouchPressed();
    },

    resetState: function () {
        this.isJumping = false;
        this.isCrouching = false;
        this.isHitable = false;
        this.isMoving = false;
        this.isBlocking = false;
        this.isAttacking = false;
    },

    updateState: function (e, force) {
        this.isAttacking = false;
        if (this.isInactive()) {
            this.changeAnimationTo('idle');
            this.isHitable = false;
            this.isCrouching = false;
        }
    },


    executeActionList: function (actionList) {
        for (var i = 0, max = actionList.length; i < max; i++) {
            if (this[actionList[i].action])
                this[actionList[i].action]();
        }
    },

    onInputPushed: function (keyList) {
        this.comboManager.onKeyDown(keyList);
        this.comboDisplayer.setContent(this.comboManager.getActionList());
        this.comboDisplayer.display();
        var comboList = this.comboManager.checkForSpecialAttack(this.attackList);
        for (var i = 0, max = comboList.length; i < max; i++)
            if (this[comboList[i]])
                this[comboList[i]]();
    },

    onInputReleased: function (keyList) {
        this.comboManager.onKeyUp(keyList);
    },

    onInputPressed: function (keyList) {
        this.executeActionList(this.comboManager.translate(keyList));
    },

    onInputReady: function () {
    }
})


var Ken = new Class({
    Extends : Character,

    initialize: function (options) {
        this.parent(options);
    },

    forwardpunch: function () {

    },

    hadoken: function () {

    },

    shoryuken: function () {

    },

    tatsumakisenpyaku: function () {
        this.moveTo(25, 0);
        this.resetState();
        this.attack('tatsumakisenpyaku');
    }
});
