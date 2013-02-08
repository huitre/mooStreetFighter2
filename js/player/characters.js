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
     */
    isColliding: function (colliderList) {},

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
    
    collideWith: function (objectCollider) {},

    isColliding: function (colliderList) {
        colliderList.each(function(collider) {
            collider.getBounds();
        });
    },

    getCollingPoint: function () {}
})

var Ken = new Class({
    Extends : Character,

    initialize : function ( options ) {
        this.parent(options);
    }
});
