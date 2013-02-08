var ICollider = new Class({
    initialize: function (options) {},
    collideWith: function (objectCollider) {},
    isColliding: function () {},
    getCollingPoint: function () {}
});

var Character = new Class({
    Extends : AnimatedSprite,
    Implements : [Events, ICollider],

    initialize : function ( options ) {
        this.parent(options);
    },
    collideWith: function (objectCollider) {},
    isColliding: function () {},
    getCollingPoint: function () {}
})

var Ken = new Class({
    Extends : Character,

    initialize : function ( options ) {
        this.parent(options);
    }
});
