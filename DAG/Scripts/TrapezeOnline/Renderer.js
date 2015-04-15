var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Renderer = (function () {
    "use strict";

    function setupKineticStage() {
        try {
            TrapezeOnline.Variables.KineticStage = new Kinetic.Stage({
                width: TrapezeOnline.Settings.ViewportSize.width,
                height: TrapezeOnline.Settings.ViewportSize.height,
                container: TrapezeOnline.Settings.Container,
                listening: false
            });
            TrapezeOnline.Variables.KineticStage.listening(false);

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticStage(): " + e);
        }
    }

    function disableImageSmoothing(layer) {
        try {
            var ctx = layer.getContext();

            ctx._context['imageSmoothingEnabled'] = false;
            ctx._context['mozImageSmoothingEnabled'] = false;
            ctx._context['oImageSmoothingEnabled'] = false;
            ctx._context['webkitImageSmoothingEnabled'] = false;
            ctx._context['msImageSmoothingEnabled'] = false;

        } catch (e) {
            TrapezeOnline.Log.Error("disableImageSmoothing(): " + e);
        }
    }

    function setupKineticLayers() {
        try {
            TrapezeOnline.Variables.KineticLayerMap = new Kinetic.Layer({
                hitGraphEnabled: false,
                listening: false
            });
            TrapezeOnline.Variables.KineticLayerMap.hitGraphEnabled(false);
            TrapezeOnline.Variables.KineticLayerMap.listening(false);

            TrapezeOnline.Variables.KineticLayerMapNoise = new Kinetic.Layer({
                hitGraphEnabled: false,
                listening: false
            });
            TrapezeOnline.Variables.KineticLayerMapNoise.hitGraphEnabled(false);
            TrapezeOnline.Variables.KineticLayerMapNoise.listening(false);

            TrapezeOnline.Variables.KineticLayerSprite = new Kinetic.Layer({
                hitGraphEnabled: false,
                listening: false
            });
            TrapezeOnline.Variables.KineticLayerSprite.hitGraphEnabled(false);
            TrapezeOnline.Variables.KineticLayerSprite.listening(false);

            TrapezeOnline.Variables.KineticLayerPet = new Kinetic.Layer({
                hitGraphEnabled: false,
                listening: false
            });
            TrapezeOnline.Variables.KineticLayerPet.hitGraphEnabled(false);
            TrapezeOnline.Variables.KineticLayerPet.listening(false);

            TrapezeOnline.Variables.KineticLayerProjectile = new Kinetic.Layer({
                hitGraphEnabled: false,
                listening: false
            });
            TrapezeOnline.Variables.KineticLayerProjectile.hitGraphEnabled(false);
            TrapezeOnline.Variables.KineticLayerProjectile.listening(false);

            TrapezeOnline.Variables.KineticLayerWeapon = new Kinetic.Layer({
                hitGraphEnabled: false,
                listening: false
            });
            TrapezeOnline.Variables.KineticLayerWeapon.hitGraphEnabled(false);
            TrapezeOnline.Variables.KineticLayerWeapon.listening(false);

            TrapezeOnline.Variables.KineticLayerCharacter = new Kinetic.Layer({
                hitGraphEnabled: false,
                listening: false
            });
            TrapezeOnline.Variables.KineticLayerCharacter.hitGraphEnabled(false);
            TrapezeOnline.Variables.KineticLayerCharacter.listening(false);

            TrapezeOnline.Variables.KineticLayerFogOfWar = new Kinetic.FastLayer({
                clearBeforeDraw: false
            });

            TrapezeOnline.Variables.KineticLayerHit = new Kinetic.Layer({});

            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerMap);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerMapNoise);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerSprite);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerPet);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerProjectile);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerWeapon);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerCharacter);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerFogOfWar);
            TrapezeOnline.Variables.KineticStage.add(TrapezeOnline.Variables.KineticLayerHit);

            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerMap)
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerMapNoise);
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerSprite);
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerPet);
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerProjectile);
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerWeapon);
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerCharacter);
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerFogOfWar);
            disableImageSmoothing(TrapezeOnline.Variables.KineticLayerHit);

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticObjects(): " + e);
        }
    }

    function setupKineticHit(callback) {
        try {
            TrapezeOnline.Variables.KineticRectHit = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: TrapezeOnline.Settings.ViewportSize.width,
                height: TrapezeOnline.Settings.ViewportSize.height,
                fill: "#000",
                opacity: 0
            });

            TrapezeOnline.Variables.KineticLayerHit.add(TrapezeOnline.Variables.KineticRectHit);

            TrapezeOnline.Variables.KineticLayerHit.batchDraw();

            if (callback) {
                callback();
            }

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticHit(): " + e);
        }
    }

    function setupKineticCharacter(callback) {
        try {
            TrapezeOnline.Variables.ImageSpriteCharacterTiles = new Image();
            TrapezeOnline.Variables.ImageSpriteCharacterTiles.onload = function () {
                try {

                    if (!TrapezeOnline.Variables.ImageSpriteCharacterTiles.complete) {
                        TrapezeOnline.Variables.ImageSpriteCharacterTiles.src = TrapezeOnline.Variables.ImageSpriteCharacterTiles.src;
                        return;
                    }

                    //Get rid of the onload function to prevent endless loop
                    TrapezeOnline.Variables.ImageSpriteCharacterTiles.onload = null;

                    if (TrapezeOnline.Variables.Character) {
                        TrapezeOnline.Variables.Character.destroy();
                    }

                    //Create a new animated sprite
                    TrapezeOnline.Variables.Character = new Kinetic.Sprite({
                        x: TrapezeOnline.Variables.ViewportCentre.x,
                        y: TrapezeOnline.Variables.ViewportCentre.y,
                        offset: TrapezeOnline.Variables.TileCentre,
                        image: TrapezeOnline.Variables.ImageSpriteCharacterTiles,
                        animation: "Idle",
                        animations: TrapezeOnline.Settings.Character,
                        frameRate: 15,
                        index: 0
                    });

                    //Add to the character sprite layer
                    TrapezeOnline.Variables.KineticLayerCharacter.add(TrapezeOnline.Variables.Character);

                    //Start anim
                    TrapezeOnline.Variables.Character.start();

                    if (callback) {
                        callback();
                    }

                } catch (e) {
                    TrapezeOnline.Log.Error("TrapezeOnline.Variables.ImageSpriteCharacterTiles.onload(): " + e);
                }
            };

            TrapezeOnline.Variables.ImageSpriteCharacterTiles.src = TrapezeOnline.Settings.ImageSpriteCharacterTiles;

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticCharacter(): " + e);
        }
    }

    function setupKineticZombie(NPC, callback) {
        try {
            TrapezeOnline.Variables.ImageSpriteZombieTiles = new Image();
            TrapezeOnline.Variables.ImageSpriteZombieTiles.onload = function () {
                try {

                    if (!TrapezeOnline.Variables.ImageSpriteZombieTiles.complete) {
                        TrapezeOnline.Variables.ImageSpriteZombieTiles.src = TrapezeOnline.Variables.ImageSpriteZombieTiles.src;
                        return;
                    }

                    //Get rid of the onload function to prevent endless loop
                    TrapezeOnline.Variables.ImageSpriteZombieTiles.onload = null;

                    //Create a new animated sprite
                    var zombie = new Kinetic.Sprite({
                        offset: TrapezeOnline.Variables.TileCentre,
                        image: TrapezeOnline.Variables.ImageSpriteZombieTiles,
                        animation: NPC.health > 50 ? "IdleWalking" : "IdleCrawling",
                        animations: TrapezeOnline.Settings.Factions.Zombie.Animations[Math.floor(Math.random() * 4)],
                        frameRate: 5,
                        index: 0
                    });

                    zombie.position(TrapezeOnline.Calculations.GetPosition(NPC.position));
                    zombie.id = NPC.id;

                    NPC.sprite = zombie;

                    //Add to the character sprite layer
                    TrapezeOnline.Variables.KineticLayerSprite.add(zombie);

                    //Start anim
                    zombie.start();

                    if (callback) {
                        callback();
                    }

                } catch (e) {
                    TrapezeOnline.Log.Error("TrapezeOnline.Variables.ImageSpriteZombieTiles.onload(): " + e);
                }
            };

            TrapezeOnline.Variables.ImageSpriteZombieTiles.src = TrapezeOnline.Settings.Factions.Zombie.ImageSpriteTiles;

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticPet(): " + e);
        }
    }

    function setupKineticPet(callback) {
        try {
            TrapezeOnline.Variables.ImageSpritePetTiles = new Image();
            TrapezeOnline.Variables.ImageSpritePetTiles.onload = function () {
                try {

                    if (!TrapezeOnline.Variables.ImageSpritePetTiles.complete) {
                        TrapezeOnline.Variables.ImageSpritePetTiles.src = TrapezeOnline.Variables.ImageSpritePetTiles.src;
                        return;
                    }

                    //Get rid of the onload function to prevent endless loop
                    TrapezeOnline.Variables.ImageSpritePetTiles.onload = null;

                    if (TrapezeOnline.Variables.Pet) {
                        TrapezeOnline.Variables.Pet.destroy();
                    }

                    //Create a new animated sprite
                    TrapezeOnline.Variables.Pet = new Kinetic.Sprite({
                        x: TrapezeOnline.Variables.ViewportCentre.x + (TrapezeOnline.Settings.TileSize.width),
                        y: TrapezeOnline.Variables.ViewportCentre.y,
                        offset: TrapezeOnline.Variables.TileCentre,
                        image: TrapezeOnline.Variables.ImageSpritePetTiles,
                        animation: "Idle",
                        animations: TrapezeOnline.Settings.Pet,
                        frameRate: 10,
                        index: 0
                    });

                    //Add to the character sprite layer
                    TrapezeOnline.Variables.KineticLayerPet.add(TrapezeOnline.Variables.Pet);

                    //Start anim
                    TrapezeOnline.Variables.Pet.start();

                    if (callback) {
                        callback();
                    }

                } catch (e) {
                    TrapezeOnline.Log.Error("TrapezeOnline.Variables.ImageSpritePetTiles.onload(): " + e);
                }
            };

            TrapezeOnline.Variables.ImageSpritePetTiles.src = TrapezeOnline.Settings.ImageSpritePetTiles;

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticPet(): " + e);
        }
    }

    function setupKineticWeapon(callback) {
        try {
            TrapezeOnline.Variables.KineticRectWeapon = new Kinetic.Rect({
                x: TrapezeOnline.Variables.ViewportCentre.x + 10,
                y: TrapezeOnline.Variables.ViewportCentre.y,
                offset: {
                    x: 1,
                    y: 10
                },
                width: 2,
                height: 10,
                fill: "#000"
            });

            TrapezeOnline.Variables.KineticLayerWeapon.add(TrapezeOnline.Variables.KineticRectWeapon);
            TrapezeOnline.Variables.KineticLayerWeapon.batchDraw();

            if (callback) {
                callback();
            }

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticWeapon(): " + e);
        }
    }

    function setupKineticProjectile(position, callback) {
        try {
            var projectile = new Kinetic.Rect({
                x: position.x + 10,
                y: position.y,
                offset: {
                    x: 1,
                    y: 10
                },
                width: 1,
                height: 2,
                fill: "#000"
            });

            TrapezeOnline.Variables.KineticLayerProjectile.add(projectile);

            if (callback) {
                callback();
            }

            return projectile;


        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticProjectile(): " + e);
        }
    }

    function setupKineticFogOfWar(callback) {
        try {

            var radialGradirentEndRadius = TrapezeOnline.Calculations.GetRadialRadius(),

                rect = new Kinetic.RegularPolygon({
                    x: TrapezeOnline.Variables.ViewportCentre.x,
                    y: TrapezeOnline.Variables.ViewportCentre.y,
                    sides: 4,
                    rotation: 45,
                    radius: radialGradirentEndRadius * 2,
                    fillRadialGradientEndRadius: radialGradirentEndRadius,
                    fillRadialGradientColorStops: [TrapezeOnline.Settings.FogOfWar.OuterFraction, 'rgba(0,0,0,1)', TrapezeOnline.Settings.FogOfWar.InnerFraction, 'rgba(0,0,0,0)']
                });

            TrapezeOnline.Variables.KineticLayerFogOfWar.add(rect);

            TrapezeOnline.Variables.KineticLayerFogOfWar.draw();

            if (callback) {
                callback();
            }

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticFogOfWar(): " + e);
        }
    }

    function setupKineticMapNoise(callback) {
        try {
            var imageObj = new Image();
            imageObj.onload = function () {
                try {
                    if (!imageObj.complete) {
                        imageObj.src = imageObj.src;
                        return;
                    }

                    var rect = new Kinetic.Rect({
                        x: 0,
                        y: 0,
                        width: TrapezeOnline.Settings.ViewportSize.width,
                        height: TrapezeOnline.Settings.ViewportSize.height,
                        fillPatternImage: imageObj,
                        opacity: 0.25
                    });

                    TrapezeOnline.Variables.KineticLayerMapNoise.add(rect);

                    TrapezeOnline.Variables.KineticLayerMapNoise.batchDraw();

                    if (callback) {
                        callback();
                    }

                } catch (e) {
                    throw "image.onload(): " + e;
                }
            };
            imageObj.src = TrapezeOnline.Settings.ImageNoise;

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticMapNoise(): " + e);
        }
    }

    function getMapTileColour(smoothedValue) {
        try {

            switch (smoothedValue) {
                case 0:
                    return TrapezeOnline.Settings.MapTile.Nature.Water.Deep;
                case 1:
                    return TrapezeOnline.Settings.MapTile.Nature.Water.Shallow;
                case 2:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.Beach;
                case 3:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.Desert;
                case 4:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.BrushDesert;
                case 5:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.DryGrass;
                case 6:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.PastureGrass;
                case 7:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.HighlandGrass;
                case 8:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.MountainBrush;
                case 9:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.SnowyBrush;
                case 10:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.LightSnow;
                case 11:
                    return TrapezeOnline.Settings.MapTile.Nature.Terrain.HeavySnow;
                default:
                    TrapezeOnline.Log.Error(smoothedValue + " is unimplemented.");
                    return "#CCCCCC";
            }
        } catch (e) {
            TrapezeOnline.Log.Error("getMapTileColour(): " + e);
        }
    }

    function getTileColour(smoothedValue, coordinate) {
        try {
            return getMapTileColour(smoothedValue, coordinate);

        } catch (e) {
            TrapezeOnline.Log.Error("getTileColour(): " + e);
        }
    }

    function createMapTile(coordinate) {
        try {
            return new Kinetic.Rect({
                x: coordinate.x,
                y: coordinate.y,
                width: TrapezeOnline.Settings.TileSize.width,
                height: TrapezeOnline.Settings.TileSize.height
            });
        } catch (e) {
            TrapezeOnline.Log.Error("getMapTile(): " + e);
        }
    }

    function setupKineticMap(position) {
        try {
            //Base map
            var i, j, width, height, row, kineticRect, imageSpriteMapTileCoordinate, mapCoordinate, canvasCoordinate;

            var start = new Date().getMilliseconds();

            //Setup the vertical tile rows array
            TrapezeOnline.Variables.KineticMap = new Array(TrapezeOnline.Variables.Map.length);

            for (i = TrapezeOnline.Settings.HiddenEdgeTiles, height = TrapezeOnline.Variables.Map.length - TrapezeOnline.Settings.HiddenEdgeTiles; i < height; i += 1) {
                //Setup the horizontal tile array
                row = new Array(TrapezeOnline.Variables.Map[i].length);

                for (j = TrapezeOnline.Settings.HiddenEdgeTiles, width = TrapezeOnline.Variables.Map[i].length - TrapezeOnline.Settings.HiddenEdgeTiles; j < width; j += 1) {
                    //Calculate the absolute coordinate of the tile on the canvas                
                    canvasCoordinate = {
                        x: (j - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.width,
                        y: (i - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.height
                    };

                    //Create a kinetic rect object to represent a map tile
                    kineticRect = createMapTile(canvasCoordinate);

                    //Add tile to the map layer
                    TrapezeOnline.Variables.KineticLayerMap.add(kineticRect);

                    //Add the tile to the horrizontal row array
                    row[j] = kineticRect;
                }

                //Add the row of tiles to the vertical array
                TrapezeOnline.Variables.KineticMap[i] = row;
            }

            var end = new Date().getMilliseconds() - start;

            var b = 0;

        } catch (e) {
            TrapezeOnline.Log.Error("setupKineticMap(): " + e);
        }
    }

    //Draw the map (1ms)
    function renderMap(position) {
        try {
            var i, j, width, height, smoothedValue, kineticRect, imageSpriteMapTileCoordinate, mapCoordinate, canvasCoordinate, colour;

            for (i = TrapezeOnline.Settings.HiddenEdgeTiles, height = TrapezeOnline.Variables.Map.length - TrapezeOnline.Settings.HiddenEdgeTiles; i < height; i += 1) {
                for (j = TrapezeOnline.Settings.HiddenEdgeTiles, width = TrapezeOnline.Variables.Map[i].length - TrapezeOnline.Settings.HiddenEdgeTiles; j < width; j += 1) {

                    //Get the smoothedValue
                    smoothedValue = TrapezeOnline.Variables.Map[i][j].smoothedValue;

                    //Calculate the position of the tile relative to the canvas
                    canvasCoordinate = {
                        x: (j - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.width,
                        y: (i - TrapezeOnline.Settings.HiddenEdgeTiles) * TrapezeOnline.Settings.TileSize.height
                    };

                    if (!TrapezeOnline.Calculations.TileIsVisible(canvasCoordinate)) {
                        continue;
                    }

                    colour = getMapTileColour(smoothedValue);

                    //Create a kinetic image object
                    kineticRect = TrapezeOnline.Variables.KineticMap[i][j];

                    kineticRect.fill(colour);
                }
            }
        } catch (e) {
            TrapezeOnline.Log.Error("renderMap(): " + e);
        }
    }

    function updateCharacter(period, frameTime) {
        try {
            //Change the movement direction
            if (TrapezeOnline.Variables.LeftLeftKeyDown) {
                TrapezeOnline.Variables.MovementDirection = (TrapezeOnline.Variables.MovementDirection - ((frameTime / period) * TrapezeOnline.Settings.SpinRate)) % 360;
            }
            if (TrapezeOnline.Variables.LeftRightKeyDown) {
                TrapezeOnline.Variables.MovementDirection = (TrapezeOnline.Variables.MovementDirection + ((frameTime / period) * TrapezeOnline.Settings.SpinRate)) % 360;
            }

            var direction = ((TrapezeOnline.Variables.MovementDirection * Math.PI) / 180) - (Math.PI / 2);

            var MoveRatio = {
                x: Math.cos(direction),
                y: Math.sin(direction)
            };

            var position;

            TrapezeOnline.Variables.Character.rotation(TrapezeOnline.Variables.MovementDirection);
            TrapezeOnline.Variables.Pet.rotation(TrapezeOnline.Variables.MovementDirection);

            if (TrapezeOnline.Variables.RightLeftKeyDown) {
                TrapezeOnline.Variables.VisionDirection = (TrapezeOnline.Variables.VisionDirection - ((frameTime / period) * TrapezeOnline.Settings.SpinRate)) % 360;
            }
            if (TrapezeOnline.Variables.RightRightKeyDown) {
                TrapezeOnline.Variables.VisionDirection = (TrapezeOnline.Variables.VisionDirection + ((frameTime / period) * TrapezeOnline.Settings.SpinRate)) % 360;
            }

            TrapezeOnline.Variables.KineticRectWeapon.rotation(TrapezeOnline.Variables.VisionDirection);

            if (TrapezeOnline.Variables.LeftUpKeyDown) {

                if (TrapezeOnline.Variables.Character.animation() !== "Walking") {
                    TrapezeOnline.Variables.Character.animation("Walking");
                }

                if (TrapezeOnline.Variables.Pet.animation() !== "Walking") {
                    TrapezeOnline.Variables.Pet.animation("Walking");
                }

                position = {
                    x: TrapezeOnline.Variables.KineticLayerMap.getX() - (MoveRatio.x * (frameTime / period)),
                    y: TrapezeOnline.Variables.KineticLayerMap.getY() - (MoveRatio.y * (frameTime / period))
                };

                TrapezeOnline.Variables.KineticLayerMap.position(position);
                TrapezeOnline.Variables.KineticLayerMapNoise.position(position);

                if (Math.floor(position.x / TrapezeOnline.Settings.TileSize.width) >= 1) {
                    TrapezeOnline.Variables.Position.x -= Math.floor(position.x / TrapezeOnline.Settings.TileSize.width);
                    TrapezeOnline.Variables.KineticLayerMap.setX((position.x / TrapezeOnline.Settings.TileSize.width) - Math.floor(position.x / TrapezeOnline.Settings.TileSize.width));

                    //Redraw map
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);

                } else if (Math.ceil(position.x / TrapezeOnline.Settings.TileSize.width) <= -1) {
                    TrapezeOnline.Variables.Position.x -= Math.ceil(position.x / TrapezeOnline.Settings.TileSize.width);
                    TrapezeOnline.Variables.KineticLayerMap.setX((position.x / TrapezeOnline.Settings.TileSize.width) - Math.ceil(position.x / TrapezeOnline.Settings.TileSize.width));

                    //Redraw map
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);
                }

                if ((position.y / TrapezeOnline.Settings.TileSize.height) >= 1) {
                    TrapezeOnline.Variables.Position.y -= Math.floor(position.y / TrapezeOnline.Settings.TileSize.height);
                    TrapezeOnline.Variables.KineticLayerMap.setY(0);
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);

                } else if (Math.ceil(position.y / TrapezeOnline.Settings.TileSize.height) <= -1) {
                    TrapezeOnline.Variables.Position.y -= Math.ceil(position.y / TrapezeOnline.Settings.TileSize.height);
                    TrapezeOnline.Variables.KineticLayerMap.setY((position.y / TrapezeOnline.Settings.TileSize.height) - Math.ceil(position.y / TrapezeOnline.Settings.TileSize.height));

                    //Redraw map
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);
                }

                return;

            } else {
                TrapezeOnline.Variables.Character.animation("Idle");
                TrapezeOnline.Variables.Pet.animation("Idle");
            }


            if (TrapezeOnline.Variables.LeftDownKeyDown) {
                if (TrapezeOnline.Variables.Character.animation() !== "Walking") {
                    TrapezeOnline.Variables.Character.animation("Walking");
                }

                if (TrapezeOnline.Variables.Pet.animation() !== "Walking") {
                    TrapezeOnline.Variables.Pet.animation("Walking");
                }

                position = {
                    x: TrapezeOnline.Variables.KineticLayerMap.getX() + (MoveRatio.x * (frameTime / period)),
                    y: TrapezeOnline.Variables.KineticLayerMap.getY() + (MoveRatio.y * (frameTime / period))
                };

                TrapezeOnline.Variables.KineticLayerMap.position(position);
                TrapezeOnline.Variables.KineticLayerMapNoise.position(position);

                if (Math.floor(position.x / TrapezeOnline.Settings.TileSize.width) >= 1) {
                    TrapezeOnline.Variables.Position.x -= Math.floor(position.x / TrapezeOnline.Settings.TileSize.width);
                    TrapezeOnline.Variables.KineticLayerMap.setX((position.x / TrapezeOnline.Settings.TileSize.width) - Math.floor(position.x / TrapezeOnline.Settings.TileSize.width));

                    //Redraw map
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);

                } else if (Math.ceil(position.x / TrapezeOnline.Settings.TileSize.width) <= -1) {
                    TrapezeOnline.Variables.Position.x -= Math.ceil(position.x / TrapezeOnline.Settings.TileSize.width);
                    TrapezeOnline.Variables.KineticLayerMap.setX((position.x / TrapezeOnline.Settings.TileSize.width) - Math.ceil(position.x / TrapezeOnline.Settings.TileSize.width));

                    //Redraw map
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);
                }

                if ((position.y / TrapezeOnline.Settings.TileSize.height) >= 1) {
                    TrapezeOnline.Variables.Position.y -= Math.floor(position.y / TrapezeOnline.Settings.TileSize.height);
                    TrapezeOnline.Variables.KineticLayerMap.setY(0);
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);

                } else if (Math.ceil(position.y / TrapezeOnline.Settings.TileSize.height) <= -1) {
                    TrapezeOnline.Variables.Position.y -= Math.ceil(position.y / TrapezeOnline.Settings.TileSize.height);
                    TrapezeOnline.Variables.KineticLayerMap.setY((position.y / TrapezeOnline.Settings.TileSize.height) - Math.ceil(position.y / TrapezeOnline.Settings.TileSize.height));

                    //Redraw map
                    TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                    TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);
                }

                return;
            }

        } catch (e) {
            throw "updateCharacter(): " + e;
        }
    }

    function updateNPC(NPC, period, frameTime) {
        try {
            if (!NPC.sprite) { return; }

            var position = TrapezeOnline.Calculations.GetPosition(NPC.position);
            var mapPosition = TrapezeOnline.Variables.KineticLayerMap.position();
            var offset = {
                x: mapPosition.x,
                y: mapPosition.y
            };

            var moveAmount = 0;

            if (NPC.health > 0) {
                //NPC is "alive"
                if (Math.abs(NPC.position.x - TrapezeOnline.Variables.Position.x) < 3 && Math.abs(NPC.position.y - TrapezeOnline.Variables.Position.y) < 3) {
                    moveAmount = (frameTime / period) * NPC.speedModifier;
                    if (NPC.sprite.animation() !== "Walking" && NPC.sprite.animation() !== "Crawling") {
                        NPC.sprite.animation(NPC.health > 50 ? "Walking" : "Crawling");
                    }
                } else {
                    if (NPC.sprite.animation() !== "Walking" && NPC.sprite.animation() !== "Crawling") {
                        NPC.sprite.animation(NPC.health > 50 ? "IdleWalking" : "IdleCrawling");
                    }
                }

                //Calculate the direction of travel
                var direction = TrapezeOnline.Calculations.GetAngleToCentre({
                    x: position.x + offset.x,
                    y: position.y + offset.y
                }, true);

                //Set the rotation
                NPC.sprite.rotation(direction);

            } else {
                if (NPC.sprite.animation() !== "Dead") {
                    TrapezeOnline.Controller.AddNPC();
                    NPC.sprite.animation("Dead");
                }
                var opacity = NPC.sprite.opacity();

                if (opacity <= 0) {
                    //remove the NPC
                    TrapezeOnline.Controller.RemoveNPC(NPC);

                    return;
                }

                opacity -= (frameTime / period) * 0.001;

                NPC.sprite.opacity(opacity);
            }

            //if x - centre.x > y - centre.y move on x else move on y
            if (Math.abs(NPC.position.x - TrapezeOnline.Variables.Position.x) > Math.abs(NPC.position.y - TrapezeOnline.Variables.Position.y)) {
                //Move on x
                if ((NPC.position.x - TrapezeOnline.Variables.Position.x) > 0) {
                    position.x -= moveAmount;
                    NPC.position.x -= (moveAmount / TrapezeOnline.Settings.TileSize.width);
                } else {
                    position.x += moveAmount;
                    NPC.position.x += (moveAmount / TrapezeOnline.Settings.TileSize.width);
                }
            }
            if (Math.abs(NPC.position.x - TrapezeOnline.Variables.Position.x) < Math.abs(NPC.position.y - TrapezeOnline.Variables.Position.y)) {
                //Move on y
                if ((NPC.position.y - TrapezeOnline.Variables.Position.y) > 0) {
                    position.y -= moveAmount;
                    NPC.position.y -= (moveAmount / TrapezeOnline.Settings.TileSize.height);
                } else {
                    position.y += moveAmount;
                    NPC.position.y += (moveAmount / TrapezeOnline.Settings.TileSize.height);
                }
            }

            NPC.sprite.position({
                x: position.x + offset.x,
                y: position.y + offset.y
            });

            //If the NPC is too far from the player, kill it
            if (Math.abs(NPC.position.x - TrapezeOnline.Variables.Position.x) > 15 && Math.abs(NPC.position.y - TrapezeOnline.Variables.Position.y) > 15) {
                NPC.health = 0;
            }


        } catch (e) {
            TrapezeOnline.Log.Error("updateNPC(): " + e);
        }
    }

    function setProjectileOrientation(projectile, originPosition, destinationPosition) {
        try {
            var direction = TrapezeOnline.Calculations.GetAngleToCentre(destinationPosition);
            projectile.rotation(direction - 180);

        } catch (e) {
            throw "setProjectileOrientation(): " + e;
        }
    }

    function updateNPCs(period, frameTime) {
        try {
            var i, len;

            for (i = 0, len = TrapezeOnline.Variables.NPCs.length; i < len; i += 1) {
                updateNPC(TrapezeOnline.Variables.NPCs[i], period, frameTime);
            }

        } catch (e) {
            TrapezeOnline.Log.Error("updateNPCs(): " + e);
        }
    }

    function isNPCHit(NPC, projectile, oldPosition, newPosition) {
        try {
            if (TrapezeOnline.Calculations.LineIntersectsRect({
                rect: {
                    position: NPC.sprite.position(),
                    offset: NPC.sprite.offset(),
                    size: NPC.hitBox,
                    rotation: NPC.sprite.rotation()
                },
                line: {
                    position: projectile.position(),
                    offset: projectile.offset(),
                    points: [newPosition.x, newPosition.y, oldPosition.x, oldPosition.y], //TODO Need to do projectile last position
                    rotation: projectile.rotation()
                }
            })) {
                return true;
            }

            return false;

        } catch (e) {
            TrapezeOnline.Log.Error("checkForHit(): " + e);
        }
    }

    return {
        Setup: function () {
            try {
                TrapezeOnline.Variables.ViewportCentre = {
                    x: TrapezeOnline.Settings.ViewportSize.width / 2,
                    y: TrapezeOnline.Settings.ViewportSize.height / 2
                };
                TrapezeOnline.Variables.TileCentre = {
                    x: TrapezeOnline.Settings.TileSize.width / 2,
                    y: TrapezeOnline.Settings.TileSize.height / 2
                };
                setupKineticStage();
                setupKineticLayers();

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.Setup(): " + e);
            }
        },

        SetupHit: function (callback) {
            try {
                setupKineticHit(callback);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.SetupHit(): " + e);
            }
        },

        SetupMap: function (callback) {
            try {
                setupKineticMap(callback);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.setupMap(): " + e);
            }
        },

        SetupCharacter: function (callback) {
            try {
                setupKineticCharacter(callback);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.SetupCharacter(): " + e);
            }
        },

        SetupPet: function (callback) {
            try {
                setupKineticPet(callback);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.SetupPet(): " + e);
            }
        },

        SetupNPC: function (NPC, callback) {
            try {

                switch (NPC.faction) {
                    case (TrapezeOnline.Settings.Factions.Zombie):
                        setupKineticZombie(NPC, callback);
                        break;

                    case (TrapezeOnline.Settings.Factions.Bandit):
                        break;

                    case (TrapezeOnline.Settings.Factions.Neutral):
                        break;

                    case (TrapezeOnline.Settings.Factions.Friend):
                        break;

                    default:
                        throw "Invalid faction";
                }

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.SetupZombie(): " + e);
            }
        },

        SetupWeapon: function (callback) {
            try {
                setupKineticWeapon(callback);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.SetupWeapon(): " + e);
            }
        },

        SetupFogOfWar: function (callback) {
            try {
                setupKineticFogOfWar(callback);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.SetupFogOfWar(): " + e);
            }
        },

        SetupMapNoise: function (callback) {
            try {
                setupKineticMapNoise(callback);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.SetupMapNoise(): " + e);
            }
        },

        DrawMap: function (position) {
            try {
                TrapezeOnline.Validate.Coordinate(position);

                //Render the map tiles
                renderMap(position);

                //Draw the map layer
                TrapezeOnline.Variables.KineticLayerMap.batchDraw();

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.DrawMap(): " + e);
            }
        },

        Start: function () {
            try {
                var period = 25, previousTime = 0, frameTime,

                    animation = new Kinetic.Animation(function (frame) {
                        try {
                            frameTime = frame.time - previousTime;
                            previousTime = frame.time;

                            updateCharacter(period, frameTime);
                            updateNPCs(period, frameTime);

                            console.log("frameTime: " + frameTime);

                        } catch (e) {
                            TrapezeOnline.Log.Error("TrapezeOnline.Renderer.Start.animation(): " + e);
                        }
                    }, [TrapezeOnline.Variables.KineticLayerMap, TrapezeOnline.Variables.KineticLayerMapNoise, TrapezeOnline.Variables.KineticLayerWeapon]);

                animation.start();

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Renderer.Start(): " + e);
            }
        },

        FireProjectile: function (targetCoordinate, gun) {
            try {
                var period = 1000,
                totalTime = 0,
                velocity = gun.Ammunition.Velocity,
                projectile, positionChange, animation;

                //Create the kinetic object and add to the layer
                projectile = setupKineticProjectile(TrapezeOnline.Variables.ViewportCentre);

                //Reduce the accuracy
                targetCoordinate = TrapezeOnline.Calculations.ReduceDistanceAccuracy(gun, projectile.position(), targetCoordinate);

                //Workout the position change
                positionChange = TrapezeOnline.Calculations.CalculatePositionChange(projectile.position(), targetCoordinate);

                //Set the projectile orientation
                setProjectileOrientation(projectile, projectile.position(), targetCoordinate);


                animation = new Kinetic.Animation(function (frame) {
                    //Get the amount of time taken for frame
                    var frameTime = frame.time - totalTime,
                        position = projectile.position(),
                        newPosition, i, len;
                    totalTime = frame.time;

                    //Cleanup once projectile is out of view
                    if (position.x < 0 || position.x > TrapezeOnline.Settings.ViewportSize.width || position.y < 0 || position.y > TrapezeOnline.Settings.ViewportSize.height) {
                        projectile.destroy();
                        animation.stop();
                    }

                    newPosition = {
                        x: position.x + (positionChange.x * (velocity / 100)),
                        y: position.y + (positionChange.y * (velocity / 100))
                    };

                    for (i = 0, len = TrapezeOnline.Variables.NPCs.length; i < len; i += 1) {

                        if (TrapezeOnline.Variables.NPCs[i].health > 0 && isNPCHit(TrapezeOnline.Variables.NPCs[i], projectile, position, newPosition)) {
                            //Check health if dead, do nothing
                            animation.stop();
                            projectile.destroy();

                            TrapezeOnline.Variables.NPCs[i].speedModifier -= 0.25;
                            TrapezeOnline.Variables.NPCs[i].health -= 25;
                        }
                    }

                    //set the position
                    projectile.position(newPosition);

                    velocity *= gun.Ammunition.Friction;

                }, TrapezeOnline.Variables.KineticLayerProjectile);

                animation.start();

            } catch (e) {
                throw "TrapezeOnline.Renderer.FireProjectile(): " + e;
            }
        }

    };
} ());