var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Variables = (function () {
    "use strict";

    return {
        /*GlobalTimer: null,*/
        MapSize: null,
        ViewportCentre: null,
        TileCentre: null,
        Map: null,
        KineticMap: null,
        ControlScheme: null,
        Position: { x: 0, y: 0 },
        DesiredPosition: { x: 0, y: 0 },
        NextDesiredPosition: { x: 0, y: 0 },
        ActionDirection: 0,
        Moving: false,
        KineticStage: null,
        KineticLayerMap: null,
        KineticLayerMapNoise: null,
        KineticLayerCharacter: null,
        KineticLayerWeapon: null,
        KineticLayerProjectile: null,
        KineticLayerPet: null,
        KineticLayerSprite: null,
        KineticLayerFogOfWar: null,
        KineticLayerHit: null,
        KineticRectHit: null,
        KineticRectWeapon: null,
        LeftLeftKeyDown: false,
        LeftUpKeyDown: false,
        LeftRightKeyDown: false,
        LeftDownKeyDown: false,
        RightLeftKeyDown: false,
        RightRightKeyDown: false,
        VisionDirection: 0,
        MovementDirection: 0,
        NPCs: [],
        ImageSpriteMapTiles: null,
        ImageSpriteCharacterTiles: null,
        ImageSpritePetTiles: null,
        ImageSpriteZombieTiles: null,
        ImageSpriteNPCTiles: null,
        KineticImageSpriteMapTiles: null,
        Character: null,
        Weapon: TrapezeOnline.Items.Pistol_22
    };
} ());