var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Log = (function () {
    "use strict";

    var timer;

    return {
        StartTimer: function () {
            try {
                timer = new Date().getTime();

            } catch (e) {
                throw "TrapezeOnline.Log.StartTimer(): " + e;
            }
        },

        Time: function (message) {
            try {
                var end = new Date().getTime(),
                timeTaken = end - timer, output = "";

                if (message) {
                    output = message + " ";
                }

                output += "Time taken: " + timeTaken + "ms";

                TrapezeOnline.Log.Message(output);

            } catch (e) {
                throw "TrapezeOnline.Log.Time(): " + e;
            }
        },

        Message: function (message) {
            try {
                TrapezeOnline.Validate.Message(message);

                window.console && console.log(message);

            } catch (e) {
                throw "TrapezeOnline.Log.Message(): " + e;
            }
        },

        Warning: function (message) {
            try {
                TrapezeOnline.Validate.Message(message);

                window.console && console.message(message);

            } catch (e) {
                throw "TrapezeOnline.Log.Warning(): " + e;
            }
        },

        Error: function (message) {
            try {
                TrapezeOnline.Validate.Message(message);

                window.console && console.error(message);

            } catch (e) {
                throw "TrapezeOnline.Log.Error(): " + e;
            }
        }
    };
} ());