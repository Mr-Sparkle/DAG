var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Map = (function () {
    "use strict";

    function smooth(map, coordinate, min, max, iterations) {
        try {
            var negXnegY, sameXnegY, posXnegY,
                negXsameY, sameXsameY, posXsameY,
                negXposY, sameXposY, posXposY,
                smoothedCorners, smoothedSides, smoothedCentre,
                smoothed,
                yPlus1 = coordinate.y + 1,
                yMinus1 = coordinate.y - 1,
                xPlus1 = coordinate.x + 1,
                xMinus1 = coordinate.x - 1;

            sameXsameY = map[coordinate.y][coordinate.x].smoothedValue || map[coordinate.y][coordinate.x].seededRandom;

            if (sameXsameY === min) {
                return min;
            } else if (sameXsameY === max) {
                return max;
            }

            negXnegY = map[yMinus1][xMinus1].smoothedValue || map[yMinus1][xMinus1].seededRandom;
            sameXnegY = map[yMinus1][coordinate.x].smoothedValue || map[yMinus1][coordinate.x].seededRandom;
            posXnegY = map[yMinus1][xPlus1].smoothedValue || map[yMinus1][xPlus1].seededRandom;
            negXsameY = map[coordinate.y][xMinus1].smoothedValue || map[coordinate.y][xMinus1].seededRandom;            
            posXsameY = map[coordinate.y][xPlus1].smoothedValue || map[coordinate.y][xPlus1].seededRandom;
            negXposY = map[yPlus1][xMinus1].smoothedValue || map[yPlus1][xMinus1].seededRandom;
            sameXposY = map[yPlus1][coordinate.x].smoothedValue || map[yPlus1][coordinate.x].seededRandom;
            posXposY = map[yPlus1][xPlus1].smoothedValue || map[yPlus1][xPlus1].seededRandom;

            smoothedCorners = (negXnegY || 0) + (posXnegY || 0) + (negXposY || 0) + (posXposY || 0);
            smoothedSides = (sameXnegY || 0) + (negXsameY || 0) + (posXsameY || 0) + (sameXposY || 0);
            smoothedCentre = (sameXsameY || 0);

            smoothed = smoothedCorners / 16 + smoothedSides / 8 + smoothedCentre / 4;

            smoothed = Math.round(smoothed);

            return smoothed;

        } catch (e) {
            throw "smooth(): " + e;
        }
    }

    //5ms
    function smoothTerrain(map, coordinate, min, max, iterations) {
        try {
            var i, width, height, x, y;

            for (i = 0; i < iterations; i += 1) {
                for (y = 1, height = map.length - 1; y < height; y += 1) {
                    for (x = 1, width = map[y].length - 1; x < width; x += 1) {
                        map[y][x].smoothedValue = smooth(map, { x: x, y: y }, min, max, iterations - i);
                    }
                }
            }

            return map;

        } catch (e) {
            throw "smoothTerrain(): " + e;
        }
    }

    //1ms
    function generate(width, height, topLeftCoordinate) {
        try {
            var x, y, map = new Array(height), row, coordinate;

            for (y = 0; y < height; y += 1) {
                //For rows
                map[y] = new Array(width);

                for (x = 0; x < width; x += 1) {
                    //For columns
                    map[y][x] = {
                        seededRandom: TrapezeOnline.Calculations.GetSeededRandom({
                            coordinate: {
                                x: topLeftCoordinate.x + x,
                                y: topLeftCoordinate.y + y
                            },
                            start: 0,
                            end: 11
                        })
                    };
                }
            }

            return map;

        } catch (e) {
            throw "generate(): " + e;
        }
    }

    return {
        //6ms
        Get: function (mapCentreCoordinate) {
            try {
                //mapCentreCoordinate refers to the position at the centre of the map
                //topLeftCoordinate refers to the position at the top left of the map relative to the coordinate
                var start = new Date().getMilliseconds();

                var size = TrapezeOnline.Variables.MapSize,
                    i, j, map, row, seededRandom,

                //Middle of map is rendered. Extra edge thickness is for stable smoothing
                    width = size.width + (2 * TrapezeOnline.Settings.HiddenEdgeTiles),
                    height = size.height + (2 * TrapezeOnline.Settings.HiddenEdgeTiles),
                    topLeftCoordinate = {
                        x: mapCentreCoordinate.x - Math.floor((TrapezeOnline.Variables.MapSize.width + (2 * TrapezeOnline.Settings.HiddenEdgeTiles)) / 2),
                        y: mapCentreCoordinate.y - Math.floor((TrapezeOnline.Variables.MapSize.height + (2 * TrapezeOnline.Settings.HiddenEdgeTiles)) / 2)
                    };

                //Generate map
                map = generate(width, height, topLeftCoordinate);

                //Perform smoothing
                map = smoothTerrain(map, mapCentreCoordinate, 0, 11, TrapezeOnline.Settings.SmoothingPasses);

                var end = new Date().getMilliseconds() - start;

                return map;

            } catch (e) {
                throw "TrapezeOnline.Map.Get(): " + e;
            }
        }
    };
} ());