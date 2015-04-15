var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Map = (function () {
    "use strict";

    //Get the cartesian coordinate for a given array position, depedant on the cartesian position of the centre of the map.
    function getCoordinate(mapCentrePosition, mapArrayPosition) {
        try {
            var coordinate = {
                x: (mapCentrePosition.x - Math.floor(TrapezeOnline.Variables.MapSize.width / 2)) + mapArrayPosition.x,
                y: (mapCentrePosition.y - Math.floor(TrapezeOnline.Variables.MapSize.height / 2)) + mapArrayPosition.y
            };

            return coordinate;

        } catch (e) {
            throw "getCoordinate(): " + e;
        }
    }

    //Get the array positions within the 2d map array
    function getMapArrayPosition(mapCentrePosition, coordinate) {
        try {
            var mapArrayPosition = {
                x: coordinate.x - (mapCentrePosition.x - Math.floor(TrapezeOnline.Variables.MapSize.width / 2)),
                y: coordinate.y - (mapCentrePosition.y - Math.floor(TrapezeOnline.Variables.MapSize.height / 2))
            };

            return mapArrayPosition;

        } catch (e) {
            throw "getMapArrayPosition(): " + e;
        }
    }


    function generatePaths2(map) {
        try {
            var i, j, height, width;

            for (i = 0, height = map.length; i < height; i += 1) {
                //For rows
                for (j = 0, width = map[i].length; j < width; j += 1) {
                    //For columns
                    //Calculate the current coordinate

                    //Horizontal buildings
                    if ((map[i][j].coordinate.y - 1) % 7 === 0) {
                        map[i][j].seededRandom = 5;
                        //continue;
                    }
                    if ((map[i][j].coordinate.y + 1) % 7 === 0) {
                        map[i][j].seededRandom = 4;
                        //continue;
                    }

                    //Vertical buildings
                    if ((map[i][j].coordinate.x - 1) % 5 === 0) {
                        map[i][j].seededRandom = 7;
                        //continue;
                    }
                    if ((map[i][j].coordinate.x + 1) % 5 === 0) {
                        map[i][j].seededRandom = 6;
                        //continue;
                    }

                    //Vertical roads
                    if (map[i][j].coordinate.x % 5 === 0) {
                        map[i][j].seededRandom = 2;
                        //continue;
                    }
                    //Horizontal roads
                    if (map[i][j].coordinate.y % 7 === 0) {
                        map[i][j].seededRandom = 3;
                        //continue;
                    }
                    //Junctions
                    if (map[i][j].coordinate.x % 5 === 0 && map[i][j].coordinate.y % 7 === 0) {
                        map[i][j].seededRandom = 1;
                        //continue;
                    }
                }
            }

        } catch (e) {
            throw "generatePaths(): " + e;
        }
    }

    //1 = junction
    //2 = vertical
    //3 = horizontal
    function generatePath(map, mapCentrePosition, newPosition, oldPosition, maxDepth, previousTileValue) {
        try {
            var diffX = newPosition.x - oldPosition.x,
                diffY = newPosition.y - oldPosition.y,
                seededRandom = TrapezeOnline.Calculations.GetSeededRandom({
                    coordinate: newPosition,
                    start: 0,
                    end: 24
                }),
                tileValue, i, j, width, height, junctionMinDepth = 3, mapArrayPosition = getMapArrayPosition(mapCentrePosition, newPosition);

            if (mapArrayPosition.y < 0 || mapArrayPosition.x < 0 || map.length <= mapArrayPosition.y || map[mapArrayPosition.y].length <= mapArrayPosition.x) {
                //If map array position is out of bounds
                return;
            }

            switch (seededRandom) {
                case 14:
                case 7:
                    //Junction
                    if (!previousTileValue || previousTileValue !== 1 && maxDepth > 1) {
                        tileValue = 1;
                        break;
                    }

                default:
                    if (diffY) {
                        //Vertical road
                        tileValue = 2;
                    } else {
                        //Horizontal road
                        tileValue = 3;
                    }
                    break;
            }

            //Set seeded value
            map[mapArrayPosition.y][mapArrayPosition.x].seededRandom = tileValue;

            //If deeper recursive depth required
            if (maxDepth > 0) {
                switch (tileValue) {
                    case 1:
                        if (diffY) {
                            //Junction on vertical road
                            //Continue on main path
                            generatePath(map, mapCentrePosition, { x: newPosition.x, y: newPosition.y + diffY }, newPosition, maxDepth - 1, tileValue);
                            //Branch in two perpendicular directions
                            generatePath(map, mapCentrePosition, { x: newPosition.x + 1, y: newPosition.y }, newPosition, maxDepth - 1, tileValue);
                            generatePath(map, mapCentrePosition, { x: newPosition.x - 1, y: newPosition.y }, newPosition, maxDepth - 1, tileValue);
                        } else {
                            //Junction on horizontal road
                            //Continue on main path
                            generatePath(map, mapCentrePosition, { x: newPosition.x + diffX, y: newPosition.y }, newPosition, maxDepth - 1, tileValue);
                            //branch in two perpendicular directions
                            generatePath(map, mapCentrePosition, { x: newPosition.x, y: newPosition.y + 1 }, newPosition, maxDepth - 1, tileValue);
                            generatePath(map, mapCentrePosition, { x: newPosition.x, y: newPosition.y - 1 }, newPosition, maxDepth - 1, tileValue);
                        }
                        break;

                    default:
                        //Not junction, continue in same direction
                        generatePath(map, mapCentrePosition, { x: newPosition.x + diffX, y: newPosition.y + diffY }, newPosition, maxDepth - 1, tileValue);
                        break;

                }
            }
        } catch (e) {
            throw "generatePath(): " + e;
        }
    }


    function generatePaths(map, coordinate, maxDepth) {
        try {
            generatePath(map, coordinate, coordinate, { x: coordinate.x, y: coordinate.y + 1 }, maxDepth);
            generatePath(map, coordinate, coordinate, { x: coordinate.x, y: coordinate.y - 1 }, maxDepth);
            generatePath(map, coordinate, coordinate, { x: coordinate.x + 1, y: coordinate.y }, maxDepth);
            generatePath(map, coordinate, coordinate, { x: coordinate.x - 1, y: coordinate.y }, maxDepth);
        } catch (e) {
            throw "generatePaths():" + e;
        }
    }

    function generateCity(map, coordinate) {
        try {
            //Generate Height Map
            map = generateNoise(map, coordinate, 4, 4);

            //Path Generation
            generatePaths2(map, coordinate, 20);

            return map;

        } catch (e) {
            throw "generateCity(): " + e;
        }
    }


    function smooth(map, coordinate, min, max, iterations) {
        try {
            TrapezeOnline.Validate.Coordinate(coordinate);

            var negXnegY, sameXnegY, posXnegY,
                negXsameY, sameXsameY, posXsameY,
                negXposY, sameXposY, posXposY,
                smoothedCorners, smoothedSides, smoothedCentre,
                smoothed;

            negXnegY = map[coordinate.y - 1][coordinate.x - 1].smoothedValue || map[coordinate.y - 1][coordinate.x - 1].seededRandom;
            sameXnegY = map[coordinate.y - 1][coordinate.x].smoothedValue || map[coordinate.y - 1][coordinate.x].seededRandom;
            posXnegY = map[coordinate.y - 1][coordinate.x + 1].smoothedValue || map[coordinate.y - 1][coordinate.x + 1].seededRandom;
            negXsameY = map[coordinate.y][coordinate.x - 1].smoothedValue || map[coordinate.y][coordinate.x - 1].seededRandom;
            sameXsameY = map[coordinate.y][coordinate.x].smoothedValue || map[coordinate.y][coordinate.x].seededRandom;
            posXsameY = map[coordinate.y][coordinate.x + 1].smoothedValue || map[coordinate.y][coordinate.x + 1].seededRandom;
            negXposY = map[coordinate.y + 1][coordinate.x - 1].smoothedValue || map[coordinate.y + 1][coordinate.x - 1].seededRandom;
            sameXposY = map[coordinate.y + 1][coordinate.x].smoothedValue || map[coordinate.y + 1][coordinate.x].seededRandom;
            posXposY = map[coordinate.y + 1][coordinate.x + 1].smoothedValue || map[coordinate.y + 1][coordinate.x + 1].seededRandom;

            smoothedCorners = ((negXnegY || 0) / 16) + ((posXnegY || 0) / 16) + ((negXposY || 0) / 16) + ((posXposY || 0) / 16);
            smoothedSides = ((sameXnegY || 0) / 8) + ((negXsameY || 0) / 8) + ((posXsameY || 0) / 8) + ((sameXposY || 0) / 8);
            smoothedCentre = ((sameXsameY || 0) / 4);

            smoothed = smoothedCorners + smoothedSides + smoothedCentre;

            smoothed = Math.round(smoothed);

            if (iterations < 6 && iterations > 0) {
                if (smoothed < min + (iterations - 2)) {
                    smoothed = min;
                }

                if (smoothed > max - (iterations - 2)) {
                    smoothed = max;
                }
            }

            return smoothed;

        } catch (e) {
            throw "smooth(): " + e;
        }
    }

    function smoothTerrain(map, coordinate, min, max, iterations) {
        try {
            var i, j, k, width, height, x, y, smoothedValue;

            for (i = 0; i < iterations; i += 1) {
                for (j = 1, height = map.length - 1; j < height; j += 1) {
                    for (k = 1, width = map[j].length - 1; k < width; k += 1) {
                        map[j][k].smoothedValue = smooth(map, { x: k, y: j }, min, max, iterations - i);
                    }
                }
            }

            return map;

        } catch (e) {
            throw "smoothTerrain(): " + e;
        }
    }
    
    return {


        Move: function (newMapCentreCoordinate, oldMapCentreCoordinate) {
            try {
                var diffX = newMapCentreCoordinate.x - oldMapCentreCoordinate.x,
                    diffY = newMapCentreCoordinate.y - oldMapCentreCoordinate.y,
                    row;

                //Map moved left
                if (diffX < 0) {

                }

                //Map moved right
                if (diffX > 0) {

                }

                //Map moved down
                if (diffY < 0) {
                    
                }

                //Map moved up
                if (diffY > 0) {

                }


            } catch (e) {
                throw "TrapezeOnline.Map.Move(): " + e;
            }
        },

        Get: function (mapCentreCoordinate) {
            try {
                //mapCentreCoordinate refers to the position at the centre of the map
                //topLeftCoordinate refers to the position at the top left of the map relative to the coordinate

                TrapezeOnline.Log.StartTimer();

                var size = TrapezeOnline.Variables.MapSize,
                    i, j, map = [], row, seededRandom,
                    width = size.width + (2 * TrapezeOnline.Settings.HiddenEdgeTiles),
                    height = size.height + (2 * TrapezeOnline.Settings.HiddenEdgeTiles),
                    topLeftCoordinate = {
                        x: mapCentreCoordinate.x - Math.floor((TrapezeOnline.Variables.MapSize.width + (2 * TrapezeOnline.Settings.HiddenEdgeTiles)) / 2),
                        y: mapCentreCoordinate.y - Math.floor((TrapezeOnline.Variables.MapSize.height + (2 * TrapezeOnline.Settings.HiddenEdgeTiles)) / 2)
                    };

                //Middle of map is rendered. Extra edge thickness is for stable smoothing

                for (i = 0; i < height; i += 1) {
                    //For rows
                    row = [];

                    for (j = 0; j < width; j += 1) {
                        //For columns
                        row[j] = {}
                        row[j].coordinate = {
                            x: topLeftCoordinate.x + j,
                            y: topLeftCoordinate.y + i
                        };
                        row[j].seededRandom = TrapezeOnline.Calculations.GetSeededRandom({
                            coordinate: row[j].coordinate,
                            start: 10,
                            end: 24
                        });
                    }
                    map[i] = row;
                }

                map = smoothTerrain(map, mapCentreCoordinate, 16, 27, TrapezeOnline.Settings.SmoothingPasses);

                TrapezeOnline.Log.Time("TrapezeOnline.Map.Get");

                return map;

            } catch (e) {
                throw "TrapezeOnline.Map.Get(): " + e;
            }
        }
    };
} ());