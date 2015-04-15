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
            TrapezeOnline.Log.Error("getIntValue(): " + e);
        }
    }

    function seedRandom(seed) {
        var x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    function getVector(p1, p2) {
        try {
            return {
                x: p2.x - p1.x,
                y: p2.y - p1.y
            };

        } catch (e) {
            throw ("getVector(): " + e);
        }
    }

    function getXRelativeAngle(vector) {
        try {
            var radians = Math.atan2(vector.y, vector.x),
                degrees = radians * 180 / Math.PI;

            return degrees;

        } catch (e) {
            throw ("getXRelativeAngle(): " + e);
        }
    }

    function angleRelativeToYAxis(p1, p2) {
        try {
            var vector = getVector(p1, p2),

            degrees = getXRelativeAngle(vector);

            degrees += 180;

            degrees %= 360;

            return degrees;

        } catch (e) {
            throw ("angleRelativeToXAxis(): " + e);

        }
    }

    //***********************************************************************************************

    /*Transform a coordinate by way of a rotation in radians.
    Rotated about { x: 0, y: 0 }*/
    function transformCoordinate(coordinate, radians) {
        return {
            x: (coordinate.x * Math.cos(radians)) - (coordinate.y * Math.sin(radians)),
            y: (coordinate.x * Math.sin(radians)) + (coordinate.y * Math.cos(radians))
        };
    }

    /*Returns coordinates for verticies of a rotated, 
    offset rectangle in clockwise order, 
    starting from the top-left vertex 
    if the rectangle were rotated zero degrees*/
    function getRectangleVerticies(position, offset, size, rotation) {
        var radians, originalVerticies, i, len, newVerticies = new Array(4), coordinateOffset;

        radians = rotation * Math.PI / 180;

        originalVerticies = new Array(
            { x: 0, y: 0 },
            { x: size.width, y: 0 },
            { x: size.width, y: size.height },
            { x: 0, y: size.height }
        );

        for (i = 0, len = originalVerticies.length; i < len; i += 1) {

            coordinateOffset = transformCoordinate({
                x: originalVerticies[i].x - offset.x,
                y: originalVerticies[i].y - offset.y
            }, radians);

            newVerticies[newVerticies.length] = {
                x: position.x + coordinateOffset.x,
                y: position.y + coordinateOffset.y
            };
        }

        return newVerticies;
    }

    function getLineVerticies(position, offset, points, rotation) {
        var i, len, verticies = new Array(points / 2);

        for (i = 0, len = points.length; i < len; i += 2) {
            verticies[i] = {
                x: points[i] + position.x - offset.x,
                y: points[i + 1] + position.y - offset.y
            };
        }

        return verticies;
    }

    /*Calculates and returns the area of a triangle when given 3 x, y coordinates representing the verticies */
    function areaOfTriangle(a, b, c) {
        //a: { x, y }, b: { x, y }, c: { x, y }
        var area = (c.x * b.y - b.x * c.y) - (c.x * a.y - a.x * c.y) + (b.x * a.y - a.x * b.y);

        return area;
    }

    /*Calculates if an x, y coordinate is within a rectange represented by 4 x, y coordinates of the verticies.
    Would be faster using the raytracing algorithm. This was quicker to implement*/
    function coordinateInRectangle(rectangleVerticies, coordinate) {
        if (areaOfTriangle(rectangleVerticies[0], rectangleVerticies[1], coordinate) > 0 ||
            areaOfTriangle(rectangleVerticies[1], rectangleVerticies[2], coordinate) > 0 ||
            areaOfTriangle(rectangleVerticies[2], rectangleVerticies[3], coordinate) > 0 ||
            areaOfTriangle(rectangleVerticies[3], rectangleVerticies[0], coordinate) > 0) {

            return false;
        }
        return true;
    }

    /*Returns the intersection coordinate of two lines represented by 2 x, y coordinates each*/
    function getLineIntersection(position1, position2, position3, position4) {
        var diff1 = {
            x: position2.x - position1.x,
            y: position2.y - position1.y
        },
            diff2 = {
                x: position4.x - position3.x,
                y: position4.y - position3.y
            };

        var s, t;
        s = (-diff1.y * (position1.x - position3.x) + diff1.x * (position1.y - position3.y)) / (-diff2.x * diff1.y + diff1.x * diff2.y);
        t = (diff2.x * (position1.y - position3.y) - diff2.y * (position1.x - position3.x)) / (-diff2.x * diff1.y + diff1.x * diff2.y);

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            // Collision detected
            var x = position1.x + (t * diff1.x);
            var y = position1.y + (t * diff1.y);

            return {
                x: x,
                y: y
            };
        }

        return null;
        // No collision 
    }

    return {
        ReduceDistanceAccuracy: function (weapon, originCoordinate, destinationCoordinate) {
            try {
                var distance = Math.sqrt(Math.pow(Math.abs(originCoordinate.x - destinationCoordinate.x), 2) + Math.pow(Math.abs(originCoordinate.y - destinationCoordinate.y), 2)),

                //Make it more difficult to attack at distance by reducing accuracy randomly at an increasing rate as distance is embiggend
                    variance = {
                        x: Math.pow(distance, 2) * (((Math.random() * 0.0005 * weapon.Accuracy) + (Math.random() * 0.0005 * weapon.Ammunition.Accuracy)) * (Math.random() > 0.5 ? 1 : -1)),
                        y: Math.pow(distance, 2) * (((Math.random() * 0.0005 * weapon.Accuracy) + (Math.random() * 0.0005 * weapon.Ammunition.Accuracy)) * (Math.random() > 0.5 ? 1 : -1))
                    };

                return {
                    x: destinationCoordinate.x + variance.x,
                    y: destinationCoordinate.y + variance.y
                };

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.ReduceDistanceAccuracy(): " + e);
            }
        },

        CalculatePositionChange: function (originCoordinate, destinationCoordinate) {
            try {
                var angle, dx, dy;

                angle = Math.atan2((originCoordinate.x - destinationCoordinate.x), (originCoordinate.y - destinationCoordinate.y));

                //add 90degrees
                angle += (Math.PI / 2);
                //Subtract from 360
                angle = (2 * Math.PI) - angle;

                return {
                    x: Math.cos(angle),
                    y: Math.sin(angle)
                };

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.CalculatePositionChange(): " + e);
            }
        },

        GetAngleToCentre: function (coordinate, useMapPosition) {
            try {
                //Vector of line from p1 to p2
                var mapPosition;

                if (useMapPosition) {
                    mapPosition = TrapezeOnline.Variables.KineticLayerMap.position();
                } else {
                    mapPosition = {
                        x: 0,
                        y: 0
                    };
                }

                var p1 = {
                    x: coordinate.x,
                    y: coordinate.y - 1
                },
                    p2 = {
                        x: coordinate.x,
                        y: coordinate.y
                    },
                    p3 = TrapezeOnline.Variables.ViewportCentre;

                var vector1 = getVector(p1, p2),
                    vector2 = getVector(p2, p3),

                    degreesVector1 = getXRelativeAngle(vector1),
                    degreesVector2 = getXRelativeAngle(vector2);

                if (degreesVector1 < 0) {
                    degreesVector1 = 360 + degreesVector1;
                }

                if (degreesVector2 < 0) {
                    degreesVector2 = 360 + degreesVector2;
                }

                var yAxisDegreesVector1 = (degreesVector1 + 90) % 360;
                var yAxisDegreesVector2 = (degreesVector2 + 90) % 360;

                var degreesRelative = yAxisDegreesVector1 - yAxisDegreesVector2;

                if (degreesRelative < 0) {
                    degreesRelative = 360 + degreesRelative;
                }

                degreesRelative = Math.abs(360 - ((degreesRelative + 180) % 360));

                return degreesRelative;

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.GetAngleToCentre(): " + e);
            }
        },

        GetPosition: function (coordinate) {
            try {
                var position = {
                    x: ((coordinate.x - TrapezeOnline.Variables.Position.x) * TrapezeOnline.Settings.TileSize.width) + TrapezeOnline.Variables.ViewportCentre.x,
                    y: ((coordinate.y - TrapezeOnline.Variables.Position.y) * TrapezeOnline.Settings.TileSize.height) + TrapezeOnline.Variables.ViewportCentre.y
                };

                return position;

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.GetPosition(): " + e);
            }
        },

        GetTilePosition: function (position) {
            try {
                var tilePosition = {
                    x: position.x / TrapezeOnline.Settings.TileSize.width,
                    y: position.y / TrapezeOnline.Settings.TileSize.height
                },
                centreRelativePosition = {
                    x: tilePosition.x - (TrapezeOnline.Variables.MapSize.width / 2),
                    y: tilePosition.y - (TrapezeOnline.Variables.MapSize.height / 2)
                };

                return {
                    x: Math.round(TrapezeOnline.Variables.Position.x + centreRelativePosition.x),
                    y: Math.round(TrapezeOnline.Variables.Position.y + centreRelativePosition.y)
                };

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.GetTilePosition(): " + e);
            }
        },

        GetPointerTilePosition: function () {
            try {
                var pointerPosition = TrapezeOnline.Variables.KineticStage.getPointerPosition();

                if (!pointerPosition) { return null; }

                return TrapezeOnline.Calculations.GetTilePosition(pointerPosition);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.GetPointerTilePosition(): " + e);
            }
        },

        GetPointerPosition: function () {
            try {
                var pointerPosition = TrapezeOnline.Variables.KineticStage.getPointerPosition();

                if (!pointerPosition) { return null; }

                return pointerPosition;

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.GetPointerPosition(): " + e);
            }
        },

        GetRadialRadius: function () {
            try {
                return Math.floor((TrapezeOnline.Settings.ViewportSize.height > TrapezeOnline.Settings.ViewportSize.width ? TrapezeOnline.Settings.ViewportSize.height - 32 : TrapezeOnline.Settings.ViewportSize.width) / 2) - 32;

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.GetRadialRadius(): " + e);
            }
        },

        TileIsVisible: function (coordinate) {
            try {
                var diffX = Math.abs(coordinate.x - TrapezeOnline.Variables.ViewportCentre.x),
                    diffY = Math.abs(coordinate.y - TrapezeOnline.Variables.ViewportCentre.y),
                    length = Math.sqrt((diffX * diffX) + (diffY * diffY));

                if (length < (TrapezeOnline.Calculations.GetRadialRadius() + TrapezeOnline.Settings.TileSize.width)) {
                    return true;
                }

                return false;

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.TileIsVisible(): " + e);
            }
        },

        GetSeededRandom: function (argsObj) {
            try {
                var seedInt = argsObj.coordinate.x * argsObj.coordinate.y + argsObj.coordinate.y,
                random = seedRandom(seedInt);

                return (Math.floor((random * argsObj.end) + argsObj.start));

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Calculations.GetSeededRandom(): " + e);
            }
        },

        LineIntersectsRect: function (argsObj) {
            /*argsObj = {
            rect: {
            position,
            offset,
            size,
            rotation
            },
            line: {
            position,
            offset,
            points,
            rotation
            }
            }*/
            var i, len, rectVerticies = getRectangleVerticies(
                argsObj.rect.position,
                argsObj.rect.offset,
                argsObj.rect.size,
                argsObj.rect.rotation
            ), lineVerticies = getLineVerticies(
                { x: 0, y: 0 }, //argsObj.line.position,
                argsObj.line.offset,
                argsObj.line.points,
                argsObj.line.rotation
            );

            //Check if the first line coordinate is within the rectangle
            if (coordinateInRectangle(rectVerticies, lineVerticies[0])) {
                return lineVerticies[0];
            }

            //Check if the second line coordinate is within the rectangle
            if (coordinateInRectangle(rectVerticies, lineVerticies[1])) {
                return lineVerticies[1];
            }

            //Check each line which forms the rectangle for a intersection with the line
            for (i = 0, len = rectVerticies.length; i < len; i += 1) {
                var intersection = getLineIntersection(
                    rectVerticies[i],
                    rectVerticies[i + 1] !== undefined ? rectVerticies[i + 1] : rectVerticies[0],
                    lineVerticies[0],
                    lineVerticies[1]
                );

                if (intersection) {
                    return intersection;
                }
            }

            return null;

        }

        //DONT DELETE!!!

        //Get a seeded random number based off the coordinate given
        /*GetSeededRandom: function (argsObj) {
        try {
        //argsObj = {
        //seed,
        //coordinate, 
        //end, 
        //start
        //}

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
        }*/

    };
} ());