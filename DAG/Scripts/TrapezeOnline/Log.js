var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Log = (function () {
    "use strict";

    return {
        /*StartTimer: function () {
            try {
                return new Date().getTime();

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Log.StartTimer(): " + e);
            }
        },

        Time: function (timer, message) {
            try {
                var end = new Date().getTime(),
                timeTaken = end - timer, output = "";

                if (message) {
                    output = message + " ";
                }

                output += "Time taken: " + timeTaken + "ms";

                TrapezeOnline.Log.Message(output);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Log.Time(): " + e);
            }
        },
        */
        Message: function (message) {
            try {
                TrapezeOnline.Validate.Message(message);

                window.console && console.log(message);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Log.Message(): " + e);
            }
        },

        Warning: function (message) {
            try {
                TrapezeOnline.Validate.Message(message);

                window.console && console.message(message);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Log.Warning(): " + e);
            }
        },

        Error: function (message) {
            try {
                TrapezeOnline.Validate.Message(message);

                window.console && console.error(message);

            } catch (e) {
                try {
                    alert("TrapezeOnline.Log.Error(): " + e);

                } catch (ee) {
                    throw ee;
                }
            }
        }
    };
} ());