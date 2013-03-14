var EventDispatcher = new Class({
    listeners: {},
    events: {},

    removeListener: function (eventName, callback, target) {
        if (!callback)
            return removeAllListener(eventName);
        var i = -1;
        this.listeners[event].each(function (listener, index) {
            if (listener.callback == callback && listener.target == target) {
                i = index;
                break;
            }
        });
        if (i > -1)
            this.listeners.slice(i, 1);
    },

    removeAllListener: function (eventName) {
        this.listeners[eventName] = [];
    },

    addListener: function (eventName, callback, scope) {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];
        var dispatchEvent = {
            eventName: eventName,
            scope: scope,
            callback: callback
        }
        this.listeners[eventName].push(dispatchEvent);
    },

    fireEvent: function (event, data) {
        if (this.listeners[event]) {
            this.listeners[event].each(function (listener, index) {
                listener.callback.apply(listener.scope, data);
            })
        }
    }    
})

var GlobalDispatcher = new EventDispatcher();