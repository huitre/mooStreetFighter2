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

    /**
     * 
     */
    collideWith: function (objectCollider) {},

    /**
     * Methode de detection des collisions entre l'objet 
     * et la liste des objets ICollider present sur la scene
     * @return ICollider 
     */
    isColliding: function (colliderList) {
        console.log('tamere');
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

var Character = new Class({
    Extends : AnimatedSprite,
    Implements : [Events, ICollider],

    initialize : function ( options ) {
        this.parent(options);
    },
    
    collideWith: function (objectCollider) {
        console.log('Collision detecte !', objectCollider);
    },

    isColliding: function (colliderList) {
        var that = this;
        colliderList.each(function(collider) {
            var cBounds = collider.getBounds(),
                oBounds = that.getBounds();
            /*
            if (oBounds.x <= cBounds.x + (oBounds.w + cBounds.w) / 2 
                && oBounds.x >= cBounds.x – (oBounds.w + cBounds.w) / 2
                && oBounds.y >= cBounds.y – (oBounds.h + cBounds.h) / 2
                && oBounds.y >= cBounds.y – (oBounds.h + cBounds.h) / 2
                ) {
                    collider.collideWith(this);
                    this.collideWith(collider);
                }
                */
        });
    },
    getCollidingPoint: function () {},

    getBounds: function () {
        return this.getCurrentBounds();
    }
})

var Ken = new Class({
    Extends : Character,

    initialize : function ( options ) {
        this.parent(options);
    }
});
