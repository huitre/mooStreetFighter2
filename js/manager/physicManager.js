/**
 * @author Huitre<gohin.j@gmail.com>
 */

/**
 * Interface pour tous les objets qui sont suceptibles
 * de declencher une action quand ils sont en contacts
 * d'autres objets de type ICollider
 */
var ICollider = new Class({
    type: 'ICollider',
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
    velocity: {
        x: 0.0,
        y: 0.0
    },
    mass: 80,
    rho: 1.22,
    Cd: 0.47,
    gravity : 9.81,
    A: 83 * 41 / 10000,
    restitution: 0.2,

    update: function (delta) {
        var dt = 1/60;
        var Fx = -0.5 * this.Cd * this.A * this.rho * this.velocity.x * this.velocity.x * this.velocity.x / Math.abs(this.velocity.x);
        var Fy = -0.5 * this.Cd * this.A * this.rho * this.velocity.y * this.velocity.y * this.velocity.y / Math.abs(this.velocity.y);
                
        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);
                
        // Calculate acceleration ( F = ma )
        var ax = Fx / this.mass;
        var ay = this.gravity + (Fy / this.mass);

        // Integrate to get velocity
        this.velocity.x += ax * dt;
        this.velocity.y += ay * dt;

        // Integrate to get position
        var pos = this.getPosition();
        this.setPosition(pos.x + this.velocity.x * dt * 100, pos.y + this.velocity.y * dt * 100);
    },

    apply: function (pos) {
        this.setPosition(pos);
    },

    setForce: function (vx, vy) {
        //if (vx != null)
            this.velocity.x = vx;
        //if (vy != null)
            this.velocity.y = vy;
    },

    addForce: function (fx, fy) {
        this.velocity.x += fx;
        this.velocity.y += fy;
    },

    isOnFloor: function () {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

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

    // permet de verifier si l'on reste dans les environs du niveau
    update: function (dt) {
        var that = this;
        this.colliderList.each(function (collider) {
            collider.update(dt);
        });
    }
});