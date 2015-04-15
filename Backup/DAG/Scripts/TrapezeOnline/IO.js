var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.IO = (function () {
    "use strict";

    function supported() {
        try {
            return "localStorage" in window && window["localStorage"] !== null;

        } catch (e) {
            throw "supported(): " + e;
        }
    }

    return {
        Save: function () {
            try {
                var position;

            } catch (e) {
                throw "TrapezeOnline.IO.Save(): " + e;
            }
        },

        Load: function () {
            try {
                var position;

            } catch (e) {
                throw "TrapezeOnline.IO.Load(): " + e;
            }
        }
    };
} ());