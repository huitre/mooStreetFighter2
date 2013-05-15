/**
 * @author Huitre<gohin.j@gmail.com>
 */

var IActionable = new Class({
    // wrapper pour les noms courts d'action
    o: function () { this.moveLeft() },
    e: function () { this.moveRight() },
    n: function () { this.jump() },
    no: function () { this.forwardJump(LEFT) },
    ne: function () { this.forwardJump(RIGHT) },
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

    // gestion des actions/deplacements
    attackList : {},
    comboDisplayer: null,
    comboManager: null,

    // variables d'etat
    isJumping: true,
    isMoving: false,
    isCrouching: false,
    isBlocking: false,
    isAttacking: false,
    isHitable: true,

    // variables pour gerer les status d'attaques
    attackName: null,
    collider: null,

    // type d'instance
    type: 'character',


    // sa vie
    health: 100,

    initialize : function ( options ) {
        this.parent(options);
        this.attackList = options.attackList;
        this.comboDisplayer = new ComboDisplayer();
        this.comboManager = new ComboManager();
        //GlobalDispatcher.addListener(sfEvent.ANIMATION_END, this.updateState, this);
    },

    collideWith: function (objectCollider) {
        switch (objectCollider.type) {
            case 'Floor':
                this.isOnFloor();
            break;
            case 'character':
                if (this.isAttacking) {
                    objectCollider.getHit();
                    this.collider = objectCollider;
                }
                if (objectCollider.isAttacking) {
                    this.getHit(objectCollider.getAttackDamage());
                }
                //this.setOutsideBounds();
            break;
        }
    },

    remove: function () {
        this.paused = true;
        this.visible = false;
        //GlobalDispatcher.removeListener(sfEvent.ANIMATION_END, this.updateState, this);
    },

    getCollidingPoint: function () {},

    onAnimationEnd: function () {
        this.parent();
        this.updateState();
    },

    forwardJump: function (dir) {
        if (!this.isJumping) {
            this.isJumping = true;
            this.isMoving = true;
            this.isHitable = true;
            this.addForce(dir, -5);
            if (this.direction == RIGHT) {
                if (dir == LEFT)
                    this.changeAnimationTo('jumpforwardleft');
                else
                    this.changeAnimationTo('jumpforwardright');
            } else {
                if (dir == LEFT)
                    this.changeAnimationTo('jumpforwardright');
                else
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
            this.addForce(0, -5);
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
            this.moveBy(-1.5, 0);
            this.isMoving = true;
        }
    },

    moveRight: function () {
        if (this.canMove()) {
            this.isMoving = true;
            this.changeAnimationTo('walkright');
            this.moveBy(1.5, 0);
        }
    },

    setAttackState: function () {
        this.isAttacking = true;
        this.isHitable = true;
        this.isMoving = true;
    },

    crouch: function () {
        if (!this.isAttacking && !this.isJumping) {
            this.isMoving = true;
            this.isCrouching = true;
            this.changeAnimationTo('crouch');
        }
    },

    attack: function (attackName) {
        if (!this.isAttacking) {
            if (this.isCrouching && !this.isJumping)
                attackName = 'crouch' + attackName;
            if (this.isJumping && !this.isCrouching)
                attackName = 'jump' + attackName;
            this.changeAnimationTo(attackName);
            this.attackName = attackName;
        }
        this.setAttackState();
    },

    lowpunch: function () {
        this.attack('lpunch');
    },

    mediumPunch: function () {
        this.attack('mpunch');
    },

    highPunch: function () {
        this.attack('mpunch');
    },

    lowkick: function () {
        this.attack('lkick');
    },

    mediumkick: function () {
        this.attack('lkick');
    },

    highKick: function () {
        this.attack('lkick');
    },

    getHit: function () {
        if (this.isHitable && !this.isBlocking)
            this.health -= 5;
        this.isHitable = false;
        if (CONFIG.DEBUG)
            this.root.setStyle('background', '#ff0000');
    },

    isOnFloor : function () {
        this.isJumping = false;
    },

    isInactive: function () {
        return !this.comboManager.hasTouchPressed() && !this.isJumping;
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
        if (this.isInactive()) {
            this.changeAnimationTo('idle');
            this.isHitable = false;
            this.isCrouching = false;
        }
        this.isAttacking = false;
        this.attackName = null;

         // si l'on a touche quelqu'un
        if (this.collider) {
            this.collider.isHitable = true;
            this.collider = null;
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
        var comboList = this.comboManager.checkForSpecialAttack(this.attackList, this.direction);
        for (var i = 0, max = comboList.length; i < max; i++)
            if (this[comboList[i]])
                this[comboList[i]]();
    },

    onInputReleased: function (keyList) {
        this.comboManager.onKeyUp(keyList);
    },

    onInputPressed: function (keyList) {
        this.executeActionList(this.comboManager.translate(keyList, this.direction));
    },

    getBounds: function () {
       return this.getCurrentBounds();
    },

    getHealth: function () {
        return this.health;
    },

    getAttackDamage: function () {
        return this.attackList[this.attackName].damage;
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
