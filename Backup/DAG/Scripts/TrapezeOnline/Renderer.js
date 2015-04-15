var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Renderer = (function () {
    "use strict";

    //Base map
    function renderMapTiles(position) {
        try {
            TrapezeOnline.Variables.ImageSpriteMapTiles.onload = function () {
                try {
                    var i, j, width, height, smoothedValue, kineticImage, imageSpriteMapTileCoordinate, mapCoordinate;

                    TrapezeOnline.Log.StartTimer();

                    for (i = TrapezeOnline.Settings.HiddenEdgeTiles, height = TrapezeOnline.Variables.Map.length - TrapezeOnline.Settings.HiddenEdgeTiles; i < height; i += 1) {
                        for (j = TrapezeOnline.Settings.HiddenEdgeTiles, width = TrapezeOnline.Variables.Map[i].length - TrapezeOnline.Settings.HiddenEdgeTiles; j < width; j += 1) {

                            //Get the smoothedValue
                            smoothedValue = TrapezeOnline.Variables.Map[i][j].smoothedValue;

                            //Get tile position
                            mapCoordinate = TrapezeOnline.Variables.Map[i][j].coordinate;

                            //Get the sprite map tile coordinate
                            imageSpriteMapTileCoordinate = TrapezeOnline.Renderer.GetMapTileCoordinates(smoothedValue, mapCoordinate);

                            //Create a kinetic image object
                            kineticImage = new Kinetic.Image({
                                x: (j - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.width,
                                y: (i - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.height,
                                width: TrapezeOnline.Settings.TileSize.width,
                                height: TrapezeOnline.Settings.TileSize.height,
                                image: TrapezeOnline.Variables.ImageSpriteMapTiles,
                                crop: {
                                    x: imageSpriteMapTileCoordinate.x,
                                    y: imageSpriteMapTileCoordinate.y,
                                    width: TrapezeOnline.Settings.TileSize.width,
                                    height: TrapezeOnline.Settings.TileSize.height
                                }
                            });

                            TrapezeOnline.Variables.KineticLayerMap.add(kineticImage);
                        }
                    }

                } catch (e) {
                    throw "TrapezeOnline.Variables.ImageSpriteMapTiles.onload(): " + e;
                }
            }

            TrapezeOnline.Variables.ImageSpriteMapTiles.src = TrapezeOnline.Settings.ImageMapTiles;
        } catch (e) {
            throw "renderMapTiles(): " + e;
        }
    }

    //Changes to environment due to play
    function renderMapModifiers() {
        try {

        } catch (e) {
            throw "renderMapModifiers(): " + e;
        }
    }

    function setupCharacter() {
        try {

            var imageObj = new Image();

            imageObj.onload = function () {
                try {
                    if (!imageObj.complete) {
                        imageObj.src = imageObj.src;
                    }

                    if (TrapezeOnline.Variables.Character) {
                        TrapezeOnline.Variables.Character.destroy();
                    }

                    TrapezeOnline.Variables.Character = new Kinetic.Sprite({
                        x: (TrapezeOnline.Settings.ViewportSize.width / 2) - (TrapezeOnline.Settings.TileSize.width / 2),
                        y: (TrapezeOnline.Settings.ViewportSize.height / 2) - (TrapezeOnline.Settings.TileSize.height / 2),
                        image: imageObj,
                        animation: "Idle",
                        animations: TrapezeOnline.Settings.Character,
                        framerRate: 1,
                        index: 0
                    });

                    TrapezeOnline.Variables.KineticLayerSprite.add(TrapezeOnline.Variables.Character);

                    //Start anim
                    TrapezeOnline.Variables.Character.start();

                } catch (e) {
                    throw "imgObj.onload(): " + e;
                }
            };

            imageObj.src = TrapezeOnline.Settings.ImageSpriteTiles;

        } catch (e) {
            throw "renderCharacter(): " + e;
        }
    }

    return {
        Setup: function () {
            try {
                TrapezeOnline.Variables.KineticStage = new Kinetic.Stage({
                    width: TrapezeOnline.Settings.ViewportSize.width,
                    height: TrapezeOnline.Settings.ViewportSize.height,
                    container: TrapezeOnline.Settings.Container
                });

                TrapezeOnline.Variables.KineticLayerMap = new Kinetic.Layer();
                TrapezeOnline.Variables.KineticLayerMapImage = new Kinetic.Layer();
                TrapezeOnline.Variables.KineticLayerSprite = new Kinetic.Layer();

                TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerMap);
                TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerMapImage);
                TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerSprite);

                TrapezeOnline.Variables.ImageSpriteMapTiles = new Image();

            } catch (e) {
                throw "TrapezeOnline.Renderer.Setup(): " + e;
            }
        },

        GetMapTileCoordinates: function (smoothedValue, coordinate) {
            try {
                TrapezeOnline.Validate.Coordinate(coordinate);

                var positionalValue = coordinate.x + coordinate.y,
                    seedModifier = TrapezeOnline.Calculations.GetSeededRandom({
                        coordinate: coordinate,
                        end: 4,
                        start: 0
                    });

                switch (smoothedValue) {
                    case 0:
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 1:
                        return TrapezeOnline.Settings.MapTile.Road.Junction[seedModifier];
                    case 2:
                        return TrapezeOnline.Settings.MapTile.Road.Vertical[seedModifier];
                    case 3:
                        return TrapezeOnline.Settings.MapTile.Road.Horizontal[seedModifier];
                    case 4:
                        return TrapezeOnline.Settings.MapTile.Structure.Residential.Up[seedModifier];
                    case 5:
                        return TrapezeOnline.Settings.MapTile.Structure.Residential.Down[seedModifier];
                    case 6:
                        return TrapezeOnline.Settings.MapTile.Structure.Residential.Left[seedModifier];
                    case 7:
                        return TrapezeOnline.Settings.MapTile.Structure.Residential.Right[seedModifier];
                    case 8:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 9:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 10:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 11:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 12:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 13:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 14:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 15:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                    case 16:
                        return TrapezeOnline.Settings.MapTile.Nature.Water.Deep[seedModifier];
                    case 17:
                        return TrapezeOnline.Settings.MapTile.Nature.Water.Shallow[seedModifier];
                    case 18:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.Beach[seedModifier];
                    case 19:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.Desert[seedModifier];
                    case 20:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.BrushDesert[seedModifier];
                    case 21:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.DryGrass[seedModifier];
                    case 22:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.PastureGrass[seedModifier];
                    case 23:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.HighlandGrass[seedModifier];
                    case 24:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.MountainBrush[seedModifier];
                    case 25:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.SnowyBrush[seedModifier];
                    case 26:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.LightSnow[seedModifier];
                    case 27:
                        return TrapezeOnline.Settings.MapTile.Nature.Terrain.HeavySnow[seedModifier];
                    default:
                        TrapezeOnline.Log.Error("Tile coordinate: " + smoothedValue + " is unimplemented.");
                        return TrapezeOnline.Settings.MapTile.Road.Unmarked[seedModifier];
                }
            } catch (e) {
                throw "GetMapTile(): " + e;
            }
        },

        DrawMap: function (position) {
            try {
                TrapezeOnline.Validate.Coordinate(position);
                //Clear the map
                //TODO optimise by moving the map and only rendering the changes
                TrapezeOnline.Variables.KineticLayerMap.destroyChildren();

                renderMapTiles(position);
                renderMapModifiers(position);

                TrapezeOnline.Variables.KineticLayerMap.batchDraw();
            } catch (e) {
                throw "TrapezeOnline.Renderer.DrawMap(): " + e;
            }
        },

        SetupSprites: function () {
            try {
                TrapezeOnline.Variables.KineticLayerSprite.destroyChildren();

                setupCharacter();

            } catch (e) {
                throw "TrapezeOnline.Renderer.DrawSprites(): " + e;
            }
        },

        MoveCharacter: function (direction) {
            try {
                if (TrapezeOnline.Variables.Character.animation() !== "Walking") {
                    TrapezeOnline.Variables.Character.animation("Walking");
                }

                switch (direction) {

                    case (TrapezeOnline.Settings.Direction.Left):
                        TrapezeOnline.Variables.Character.rotation(270);
                        TrapezeOnline.Variables.Character.offset({
                            x: 32,
                            y: 0
                        });
                        break;

                    case (TrapezeOnline.Settings.Direction.Up):
                        TrapezeOnline.Variables.Character.rotation(0);
                        TrapezeOnline.Variables.Character.offset({
                            x: 0,
                            y: 0
                        });
                        break;

                    case (TrapezeOnline.Settings.Direction.Right):
                        TrapezeOnline.Variables.Character.rotation(90);
                        TrapezeOnline.Variables.Character.offset({
                            x: 0,
                            y: 32
                        });
                        break;

                    case (TrapezeOnline.Settings.Direction.Down):
                        TrapezeOnline.Variables.Character.rotation(180);
                        TrapezeOnline.Variables.Character.offset({
                            x: 32,
                            y: 32
                        });
                        break;

                    default:
                        throw "Unsupported direction";
                }

            } catch (e) {
                throw "TrapezeOnline.Renderer.MoveCharacter(): " + e;
            }
        },

        MoveMap: function (direction) {
            try {

                var i, j, width, height, smoothedValue, kineticImage, imageSpriteMapTileCoordinate, mapCoordinate;


                switch (direction) {

                    case (TrapezeOnline.Settings.Direction.Left):

                        TrapezeOnline.Renderer.CacheMap({ x: -32, y: 0 });

                        for (i = TrapezeOnline.Settings.HiddenEdgeTiles, height = TrapezeOnline.Variables.Map.length - TrapezeOnline.Settings.HiddenEdgeTiles; i < height; i += 1) {

                            j = TrapezeOnline.Settings.HiddenEdgeTiles;

                            //Get the smoothedValue
                            smoothedValue = TrapezeOnline.Variables.Map[i][j].smoothedValue;

                            //Get tile position
                            mapCoordinate = TrapezeOnline.Variables.Map[i][j].coordinate;

                            //Get the sprite map tile coordinate
                            imageSpriteMapTileCoordinate = TrapezeOnline.Renderer.GetMapTileCoordinates(smoothedValue, mapCoordinate);

                            //Create a kinetic image object
                            kineticImage = new Kinetic.Image({
                                x: (j - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.width,
                                y: (i - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.height,
                                width: TrapezeOnline.Settings.TileSize.width,
                                height: TrapezeOnline.Settings.TileSize.height,
                                image: TrapezeOnline.Variables.ImageSpriteMapTiles,
                                crop: {
                                    x: imageSpriteMapTileCoordinate.x,
                                    y: imageSpriteMapTileCoordinate.y,
                                    width: TrapezeOnline.Settings.TileSize.width,
                                    height: TrapezeOnline.Settings.TileSize.height
                                }
                            });

                            TrapezeOnline.Variables.KineticLayerMap.add(kineticImage);
                        }

                        break;

                    case (TrapezeOnline.Settings.Direction.Up):

                        TrapezeOnline.Renderer.CacheMap({ x: 0, y: -32 });

                        i = TrapezeOnline.Settings.HiddenEdgeTiles;

                        for (j = TrapezeOnline.Settings.HiddenEdgeTiles, width = TrapezeOnline.Variables.Map[i].length - TrapezeOnline.Settings.HiddenEdgeTiles; j < width; j += 1) {

                            //Get the smoothedValue
                            smoothedValue = TrapezeOnline.Variables.Map[i][j].smoothedValue;

                            //Get tile position
                            mapCoordinate = TrapezeOnline.Variables.Map[i][j].coordinate;

                            //Get the sprite map tile coordinate
                            imageSpriteMapTileCoordinate = TrapezeOnline.Renderer.GetMapTileCoordinates(smoothedValue, mapCoordinate);

                            //Create a kinetic image object
                            kineticImage = new Kinetic.Image({
                                x: (j - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.width,
                                y: (i - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.height,
                                width: TrapezeOnline.Settings.TileSize.width,
                                height: TrapezeOnline.Settings.TileSize.height,
                                image: TrapezeOnline.Variables.ImageSpriteMapTiles,
                                crop: {
                                    x: imageSpriteMapTileCoordinate.x,
                                    y: imageSpriteMapTileCoordinate.y,
                                    width: TrapezeOnline.Settings.TileSize.width,
                                    height: TrapezeOnline.Settings.TileSize.height
                                }
                            });

                            TrapezeOnline.Variables.KineticLayerMap.add(kineticImage);
                        }

                        break;

                    case (TrapezeOnline.Settings.Direction.Right):

                        TrapezeOnline.Renderer.CacheMap({ x: 32, y: 0 });

                        for (i = TrapezeOnline.Settings.HiddenEdgeTiles, height = TrapezeOnline.Variables.Map.length - TrapezeOnline.Settings.HiddenEdgeTiles; i < height; i += 1) {

                            j = TrapezeOnline.Variables.Map[i].length - TrapezeOnline.Settings.HiddenEdgeTiles - 1;

                            //Get the smoothedValue
                            smoothedValue = TrapezeOnline.Variables.Map[i][j].smoothedValue;

                            //Get tile position
                            mapCoordinate = TrapezeOnline.Variables.Map[i][j].coordinate;

                            //Get the sprite map tile coordinate
                            imageSpriteMapTileCoordinate = TrapezeOnline.Renderer.GetMapTileCoordinates(smoothedValue, mapCoordinate);

                            //Create a kinetic image object
                            kineticImage = new Kinetic.Image({
                                x: (j - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.width,
                                y: (i - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.height,
                                width: TrapezeOnline.Settings.TileSize.width,
                                height: TrapezeOnline.Settings.TileSize.height,
                                image: TrapezeOnline.Variables.ImageSpriteMapTiles,
                                crop: {
                                    x: imageSpriteMapTileCoordinate.x,
                                    y: imageSpriteMapTileCoordinate.y,
                                    width: TrapezeOnline.Settings.TileSize.width,
                                    height: TrapezeOnline.Settings.TileSize.height
                                }
                            });

                            TrapezeOnline.Variables.KineticLayerMap.add(kineticImage);
                        }

                        break;

                    case (TrapezeOnline.Settings.Direction.Down):

                        TrapezeOnline.Renderer.CacheMap({ x: 0, y: 32 });

                        i = TrapezeOnline.Variables.Map.length - TrapezeOnline.Settings.HiddenEdgeTiles - 1;

                        for (j = TrapezeOnline.Settings.HiddenEdgeTiles, width = TrapezeOnline.Variables.Map[i].length - TrapezeOnline.Settings.HiddenEdgeTiles; j < width; j += 1) {

                            //Get the smoothedValue
                            smoothedValue = TrapezeOnline.Variables.Map[i][j].smoothedValue;

                            //Get tile position
                            mapCoordinate = TrapezeOnline.Variables.Map[i][j].coordinate;

                            //Get the sprite map tile coordinate
                            imageSpriteMapTileCoordinate = TrapezeOnline.Renderer.GetMapTileCoordinates(smoothedValue, mapCoordinate);

                            //Create a kinetic image object
                            kineticImage = new Kinetic.Image({
                                x: (j - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.width,
                                y: (i - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.height,
                                width: TrapezeOnline.Settings.TileSize.width,
                                height: TrapezeOnline.Settings.TileSize.height,
                                image: TrapezeOnline.Variables.ImageSpriteMapTiles,
                                crop: {
                                    x: imageSpriteMapTileCoordinate.x,
                                    y: imageSpriteMapTileCoordinate.y,
                                    width: TrapezeOnline.Settings.TileSize.width,
                                    height: TrapezeOnline.Settings.TileSize.height
                                }
                            });

                            TrapezeOnline.Variables.KineticLayerMap.add(kineticImage);
                        }

                        break;

                    default:
                        throw "Unsupported direction";
                }

            } catch (e) {
                throw "TrapezeOnline.Renderer.MoveMap(): " + e;
            }
        },

        CacheMap: function (offset) {
            try {
                TrapezeOnline.Variables.KineticLayerMap.toImage({
                    x: 0,
                    y: 0,
                    width: TrapezeOnline.Settings.ViewportSize.width,
                    height: TrapezeOnline.Settings.ViewportSize.height,
                    callback: function (image) {
                        try {
                            TrapezeOnline.Variables.KineticLayerMap.destroyChildren();

                            var kineticImage = new Kinetic.Image({
                                image: image,
                                x: offset.x,
                                y: offset.y
                            });

                            TrapezeOnline.Variables.KineticLayerMap.add(kineticImage);
                            TrapezeOnline.Variables.KineticLayerMap.batchDraw();

                        } catch (e) {
                            throw "TrapezeOnline.Variables.KineticLayerMap.toImage(): " + e;
                        }
                    }
                });

            } catch (e) {
                throw "TrapezeOnline.Renderer.CacheMap(): " + e;
            }
        }
    };
} ());