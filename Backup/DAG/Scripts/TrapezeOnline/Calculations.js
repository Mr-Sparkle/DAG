var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Calculations = (function () {
    "use strict";

    function getIntValue(string) {
        try {
            var i, len, val = 0;
            for (i = 0, len = string.length; i < len; i += 1) {
                val += string.charCodeAt(i);
            }

            return val;

        } catch (e) {
            throw "getIntValue(): " + e;
        }
    }

    function seedRandom(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    return {
        //Get a seeded random number based off the coordinate given
        GetSeededRandom: function (argsObj) {
            try {
                /*argsObj = {
                seed,
                coordinate, 
                end, 
                start
                }
                */
                if (!argsObj) { throw "argsObj is undefined or null."; }

                //Validate
                if (argsObj.coordinate) {
                    TrapezeOnline.Validate.Coordinate(argsObj.coordinate);
                }

                var rangeStart = argsObj.start || 0,
                    rangeEnd = argsObj.end || 1,
                    seed = argsObj.seed || "x: " + Math.sin(argsObj.coordinate.x) + "y: " + Math.sin(argsObj.coordinate.y),
                    seedInt = getIntValue(seed),
                    random = seedRandom(seedInt);

                //random = new Math.seedrandom(seed)();

                return (Math.floor((random * rangeEnd) + rangeStart));

            } catch (e) {
                throw "TrapezeOnline.Calculations.GetSeededRandom(): " + e;
            }
        }
    };
} ());