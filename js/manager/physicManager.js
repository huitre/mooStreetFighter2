/**
 * @author Huitre<gohin.j@gmail.com>
 */
var CollisionManager = new Class({
    Implements: Manager,

    colliderList : [],

    addCollider: function ( colliderArray ) {
        this.colliderList.combine(colliderArray);
    },

    update: function () {
        var that = this;
        this.colliderList.each(function (collider, index) {
            collider.isColliding(that.colliderList);
        });
    }
});

var PhysicManager = new Class({
    Extends : CollisionManager,
    Implements: Manager,

    // permet de verifier si l'on reste dans les environs du niveau
    update: function (dt) {
        var that = this;
        this.colliderList.each(function (collider) {
            collider.update(dt);
        });
    }
});