var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Settings = (function () {
    "use strict";

    return {
        //For now must have odd number of tiles
        ViewportSize: {
            width: 416,
            height: 416
        },
        ViewportScale: {
            x: 2,
            y: 2
        },
        SmoothingPasses: 2,
        HiddenEdgeTiles: 6,
        TileSize: {
            width: 32,
            height: 32
        },
        FogOfWar: {
            InnerFraction: 0.05,
            OuterFraction: 0.95
        },
        ControlScheme: {
            KeyboardAndMouse: 0,
            Touch: 1,
            Keyboard: 2,
            Mouse: 3
        },
        Cursors: {
            Crosshair: "url(\"../../../Images/Crosshair.cur\"), auto"
        },
        MoveAmount: 1,
        Container: "container",
        ImageNoise: "../Images/MaskNoise.png",
        ImageMapTiles: "../Images/SpriteMap.png",
        ImageSpriteCharacterTiles: "../Images/SpriteCharacter.png",
        ImageSpritePetTiles: "../Images/SpritePet.png",
        SpinRate: 5,
        MoveRate: 10,
        HitBox: {
            width: 28,
            height: 28
        },
        Factions: {
            Zombie: {
                Name: "Zombie",
                Disposition: 0,
                ImageSpriteTiles: "../Images/SpriteZombie.png",
                Animations: [
                    {
                        Walking: [
                            0, 63, 32, 32,
                            0, 31, 32, 32,
                            0, 0, 32, 32,
                            0, 31, 32, 32
                        ],
                        Crawling: [
                            0, 159, 32, 32,
                            0, 127, 32, 32,
                            0, 95, 32, 32,
                            0, 127, 32, 32,
                            0, 159, 32, 32,
                            0, 191, 32, 32,
                            0, 223, 32, 32,
                            0, 191, 32, 32
                        ],
                        IdleWalking: [
                            0, 63, 32, 32
                        ],
                        IdleCrawling: [
                            0, 159, 32, 32
                        ],
                        Dead: [
                            0, 255, 32, 32
                        ]
                    },
                    {
                        Walking: [
                            32, 63, 32, 32,
                            32, 31, 32, 32,
                            32, 0, 32, 32,
                            32, 31, 32, 32
                        ],
                        Crawling: [
                            32, 159, 32, 32,
                            32, 127, 32, 32,
                            32, 95, 32, 32,
                            32, 127, 32, 32,
                            32, 159, 32, 32,
                            32, 191, 32, 32,
                            32, 223, 32, 32,
                            32, 191, 32, 32
                        ],
                        IdleWalking: [
                            32, 63, 32, 32
                        ],
                        IdleCrawling: [
                            32, 159, 32, 32
                        ],
                        Dead: [
                            32, 255, 32, 32
                        ]
                    },
                    {
                        Walking: [
                            64, 63, 32, 32,
                            64, 31, 32, 32,
                            64, 0, 32, 32,
                            64, 31, 32, 32
                        ],
                        Crawling: [
                            64, 159, 32, 32,
                            64, 127, 32, 32,
                            64, 95, 32, 32,
                            64, 127, 32, 32,
                            64, 159, 32, 32,
                            64, 191, 32, 32,
                            64, 223, 32, 32,
                            64, 191, 32, 32
                        ],
                        IdleWalking: [
                            64, 63, 32, 32
                        ],
                        IdleCrawling: [
                            64, 159, 32, 32
                        ],
                        Dead: [
                            64, 255, 32, 32
                        ]
                    },
                    {
                        Walking: [
                            96, 63, 32, 32,
                            96, 31, 32, 32,
                            96, 0, 32, 32,
                            96, 31, 32, 32
                        ],
                        Crawling: [
                            96, 159, 32, 32,
                            96, 127, 32, 32,
                            96, 95, 32, 32,
                            96, 127, 32, 32,
                            96, 159, 32, 32,
                            96, 191, 32, 32,
                            96, 223, 32, 32,
                            96, 191, 32, 32
                        ],
                        IdleWalking: [
                            96, 63, 32, 32
                        ],
                        IdleCrawling: [
                            96, 159, 32, 32
                        ],
                        Dead: [
                            96, 255, 32, 32
                        ]
                    }
                ]
            },
            Bandit: {
                Name: "Bandit",
                Disposition: 0,
                ImageSpriteTiles: "../Images/SpriteBandit.png",
                Animations: {
                    Walking: [],
                    Idle: []
                }
            },
            Neutral: {
                Name: "Neutral",
                Disposition: 1,
                ImageSpriteTiles: "../Images/SpritePerson.png",
                Animations: {
                    Walking: [],
                    Idle: []
                }
            },
            Friend: {
                Name: "Friend",
                Disposition: 2,
                ImageSpriteTiles: "../Images/SpritePerson.png",
                Animations: {
                    Walking: [],
                    Idle: []
                }
            }
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
        Pet: {
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
                    Deep: "#0A83EE",
                    Shallow: "#7CC3C5",
                },
                Terrain: {
                    Beach: "#F9D299",
                    Desert: "#D1C289",
                    BrushDesert: "#9FC95D",
                    DryGrass: "#73C53D",
                    PastureGrass: "#58BB3A",
                    HighlandGrass: "#4DA439",
                    MountainBrush: "#6F8942",
                    SnowyBrush: "#633E23",
                    LightSnow: "#D3C6B6",
                    HeavySnow: "#F3EDED"
                }
            }
        },

        Actions: {
            Single: 0,
            Manual: 1,
            SemiAutomatic: 2,
            FullyAutomatic: 3
        },

        Ammunition: {
            Pistol_22_Standard: {
                //ms
                Velocity: 360,
                //g
                Mass: 3,
                //MOA
                Accuracy: 1,
                //No. projectiles
                Projectiles: 1,
                //Friction:
                Friction: 0.992
            }
        },

    };
} ());
