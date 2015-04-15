var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Validate = (function () {
    "use strict";

    return {
        Coordinate: function (coordinate) {
            try {
                if (!coordinate) { throw "coordinate is undefined or null."; }
                if (coordinate.x === undefined || coordinate.x === null) { throw "coordinate.x is undefined or null."; }
                if (coordinate.y === undefined || coordinate.y === null) { throw "coordinate.y is undefined or null."; }
                if (isNaN(coordinate.x)) { throw "coordinate.x is NaN."; }
                if (isNaN(coordinate.y)) { throw "coordinate.y is NaN."; }

            } catch (e) {
                throw "TrapezeOnline.Validate.Coordinate(): " + e;
            }
        },

        Message: function (message) {
            try {
                if (message === undefined || message === null) { throw "message is undefined or null." }
                
            } catch (e) {
                throw "TrapezeOnline.Validate.Message(): " + e;
            }
        }
    };
} ());