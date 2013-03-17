/**
 * @author Huitre<gohin.j@gmail.com>
 */

/**
 * Interface pour tous les objets qui sont suceptibles
 * de declencher une action quand ils sont en contacts
 * d'autres objets de type ICollider
 */
var ICollider = new Class({

    initialize: function (options) {},

    collideWith: function (objectCollider) {},

    /**
     * Methode de detection des collisions entre l'objet
     * et la liste des objets ICollider present sur la scene
     * @return bool
     */
    isColliding: function (colliderList) {
        var that = this;
        colliderList.each(function(collider) {
            if (collider != that) {
                var b1 = collider.getBounds(),
                    b2 = that.getBounds();
                if (that.intersects(b1.x, b1.y, b1.w, b1.h, b2.x, b2.y, b2.w, b2.h)) {
                    that.collideWith(collider);
                    collider.collideWith(that);
                }
            }
        });
    },

    /**
     * Methode qui verifie si 2 rectangles se superposent en partie
     * @return Boolean
     */
    intersects: function (x1, y1, w1, h1, x2, y2, w2, h2) {
        w2 += x2;
        w1 += x1;
        if (x2 > w1 || x1 > w2)
           return false;
        h2 += y2;
        h1 += y1;
        if (y2 > h1 || y1 > h2)
            return false;
        return true;
    },


    /**
     * Methode de detection des collisions entre l'objet
     * et la liste des objets ICollider present sur la scene.
     * TODO : detection par shape ou par pixels.
     */
    getCollidingPoint: function () {},

    /**
     * Retourne les dimensions de l'objet ICollider.
     * @return object
     */
    getBounds: function () {}
});


var IPhysic = new Class({
    vx : 0,
    vy : 0,
    gravity : 4,

    applyGravity: function () {
        var pos = this.getPosition();
        pos.x += this.vx;
        pos.y += this.vy;
        this.vy += this.gravity;
        return pos;
    },

    setForce: function (vx, vy) {
        this.vx = vx;
        this.vy = vy;
    },

    addForce: function (fx, fy) {
        this.vx += fx;
        this.vy += fy;
    },

    isOnFloor: function () {}

});

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
                collider.setPosition(b.x, b.y - (b.h + b.y - that.floor) + 1);
                collider.setForce(0, 0);
                collider.isOnFloor();
            } else {
                collider.setPosition(b.x, b.y);
            }
        });
    }
});