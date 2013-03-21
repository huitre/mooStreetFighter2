/**
 * @author Huitre<gohin.j@gmail.com>
 */

var Character = new Class({
    Extends: AnimatedSprite,
    Implements: [ICollider, IPhysic],

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
        GlobalDispatcher.addListener(sfEvent.ANIMATION_END, function (data, target) { this.updateState(data, target) }.bind(this));
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

    isInactive: function () {
        return false;
    },

    updateState: function (e, force) {
        this.isHitable = false;
        this.isAttacking = false;
        this.isMoving = false;
        if (this.isInactive())
            this.changeAnimationTo('idle');
    },


    executeActionList: function (actionList) {
        for (var i = 0, max = actionList.length; i < max; i++) {
            if (this[actionList[i].action])
                this[actionList[i].action]();
        }
    },

    onInputPushed: function (keyList) {
        console.log('onInputPushed')
        this.comboManager.onKeyDown(keyList);
        //this.onInputPressed(keyList);
    },

    onInputReleased: function (keyList) {
        //console.log('onInputReleased');
        this.comboManager.onKeyUp(keyList);
        var comboList = this.comboManager.checkForSpecialAttack();
        console.log(comboList);
    },

    onInputPressed: function (keyList) {
        //console.log('onInputPressed');
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
        this.addForce(5, 5);
        this.attack('tatsumakisenpyaku');
    }
});
