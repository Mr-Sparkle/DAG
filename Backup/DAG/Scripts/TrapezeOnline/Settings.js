var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Settings = (function () {
    "use strict";

    return {
        //For now must have odd number of tiles
        ViewportSize: {
            width: 800,
            height: 480
        },
        SmoothingPasses: 5,
        HiddenEdgeTiles: 5,
        TileSize: {
            width: 32,
            height: 32
        },
        Container: "container",
        ImageMapTiles: "../Images/SpriteMap.png",
        ImageSpriteTiles: "../Images/SpriteCharacter.png",
        Direction: {
            Left: 0,
            Top: 1,
            Right: 2,
            Down: 3
        },
        Character: {
            Walking: [
                0, 0, 32, 32,
                0, 31, 32, 32,
                0, 63, 32, 32,
                0, 95, 32, 32,
                0, 127, 32, 32, 
                0, 95, 32, 32,
                0, 63, 32, 32,
                0, 31, 32, 32,
            ],
            Idle: [
                0, 63, 32, 32
            ]
        },
        MapTile: {
            Road: {
                Unmarked: [
                    { x: 0, y: 0 },
                    { x: 32, y: 0 },
                    { x: 64, y: 0 },
                    { x: 96, y: 0 }
                ],
                Vertical:
                [
                    { x: 0, y: 64 },
                    { x: 32, y: 64 },
                    { x: 64, y: 64 },
                    { x: 96, y: 64 }
                ],
                Horizontal: [
                    { x: 0, y: 96 },
                    { x: 32, y: 96 },
                    { x: 64, y: 96 },
                    { x: 96, y: 96 }
                ],
                Junction: [
                    { x: 0, y: 32 },
                    { x: 32, y: 32 },
                    { x: 64, y: 32 },
                    { x: 96, y: 32 }
                ]
            },
            Structure: {
                Residential: {
                    Up: [
                        { x: 0, y: 192 },
                        { x: 32, y: 192 },
                        { x: 64, y: 192 },
                        { x: 96, y: 192 }
                    ],
                    Down: [
                        { x: 0, y: 224 },
                        { x: 32, y: 224 },
                        { x: 64, y: 224 },
                        { x: 96, y: 224 }
                    ],
                    Left: [
                        { x: 0, y: 128 },
                        { x: 32, y: 128 },
                        { x: 64, y: 128 },
                        { x: 96, y: 128 }
                    ],
                    Right: [
                        { x: 0, y: 160 },
                        { x: 32, y: 160 },
                        { x: 64, y: 160 },
                        { x: 96, y: 160 }
                    ]
                },
                Industrial: null,
                Comerical: null
            },
            Nature: {
                Water: {
                    Deep: [
                        { x: 0, y: 256 },
                        { x: 32, y: 256 },
                        { x: 64, y: 256 },
                        { x: 96, y: 256 }
                    ],
                    Shallow: [
                        { x: 0, y: 288 },
                        { x: 32, y: 288 },
                        { x: 64, y: 288 },
                        { x: 96, y: 288 }
                    ]
                },
                Terrain: {
                    Beach: [
                        { x: 0, y: 320 },
                        { x: 32, y: 320 },
                        { x: 64, y: 320 },
                        { x: 96, y: 320 }
                    ],
                    Desert: [
                        { x: 0, y: 352 },
                        { x: 32, y: 352 },
                        { x: 64, y: 352 },
                        { x: 96, y: 352 }
                    ],
                    BrushDesert: [
                        { x: 0, y: 384 },
                        { x: 32, y: 384 },
                        { x: 64, y: 384 },
                        { x: 96, y: 384 }
                    ],
                    DryGrass: [
                        { x: 0, y: 416 },
                        { x: 32, y: 416 },
                        { x: 64, y: 416 },
                        { x: 96, y: 416 }
                    ],
                    PastureGrass: [
                        { x: 0, y: 448 },
                        { x: 32, y: 448 },
                        { x: 64, y: 448 },
                        { x: 96, y: 448 }
                    ],
                    HighlandGrass: [
                        { x: 0, y: 480 },
                        { x: 32, y: 480 },
                        { x: 64, y: 480 },
                        { x: 96, y: 480 }
                    ],
                    MountainBrush: [
                        { x: 0, y: 512 },
                        { x: 32, y: 512 },
                        { x: 64, y: 512 },
                        { x: 96, y: 512 }
                    ],
                    SnowyBrush: [
                        { x: 0, y: 544 },
                        { x: 32, y: 544 },
                        { x: 64, y: 544 },
                        { x: 96, y: 544 }
                    ],
                    LightSnow: [
                        { x: 0, y: 576 },
                        { x: 32, y: 576 },
                        { x: 64, y: 576 },
                        { x: 96, y: 576 }
                    ],
                    HeavySnow: [
                        { x: 0, y: 608 },
                        { x: 32, y: 608 },
                        { x: 64, y: 608 },
                        { x: 96, y: 608 }
                    ]
                }
            }
        }
    };
} ());
