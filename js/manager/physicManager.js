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

    floor: 209,

    update: function () {
        var that = this;
        this.colliderList.each(function (collider) {
            var g = collider.applyGravity(),
                b = collider.getBounds();

            b.x = g.x;
            b.y = g.y;
            if (b.h + b.y > that.floor && collider.vy != 0) {
                collider.setPosition(b.x, b.y - (b.h + b.y - that.floor));
                collider.setForce(0, 0);
                collider.isOnFloor();
            } else {
                collider.setPosition(b.x, b.y);
            }
        });
    }
});