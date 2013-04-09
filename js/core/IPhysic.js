/**
 * @author Huitre<gohin.j@gmail.com>
 */

/**
 * Interface pour tous les objets qui sont suceptibles
 * de recevoir une quelconque force (gravite, chocs...)
 */
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