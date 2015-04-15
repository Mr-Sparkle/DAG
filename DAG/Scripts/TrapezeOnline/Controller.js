var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Controller = (function () {
    "use strict";

    function bindBtnKeyboardAndMouse() {
        try {
            $("#btnKeyboardAndMouse").off("click tap").on("click tap", function () {
                try {
                    TrapezeOnline.Variables.ControlScheme = TrapezeOnline.Settings.ControlScheme.KeyboardAndMouse;
                    TrapezeOnline.Controller.Setup();
                    $("#pnlControlScheme").addClass("hidden");

                } catch (e) {
                    TrapezeOnline.Log.Error("btnKeyboardAndMouse.clicktap(): " + e);
                }
            });
        } catch (e) {
            throw "bindBtnKeyboardAndMouse(): " + e;
        }
    }

    function bindBtnTouch() {
        try {
            $("#btnTouch").off("click tap").on("click tap", function () {
                try {
                    TrapezeOnline.Variables.ControlScheme = TrapezeOnline.Settings.ControlScheme.Touch;
                    TrapezeOnline.Controller.Setup();
                    $("#pnlControlScheme").addClass("hidden");

                } catch (e) {
                    TrapezeOnline.Log.Error("btnTouch.clickTap(): " + e);
                }
            });
        } catch (e) {
            throw "bindBtnTouch(): " + e;
        }
    }

    $(document).ready(function () {
        try {
            Kinetic.pixelRatio = 1;
            bindBtnKeyboardAndMouse();
            bindBtnTouch();

        } catch (e) {
            TrapezeOnline.Log.Error("document.ready(): " + e);
        }
    });


    //Sets the instance variables of the program
    function setInstance() {
        try {
            TrapezeOnline.Variables.MapSize = {
                width: Math.floor(TrapezeOnline.Settings.ViewportSize.width / TrapezeOnline.Settings.TileSize.width),
                height: Math.floor(TrapezeOnline.Settings.ViewportSize.height / TrapezeOnline.Settings.TileSize.height)
            };

            TrapezeOnline.Variables.Map = null;
        } catch (e) {
            TrapezeOnline.Log.Error("setInstance(): " + e);
        }
    }

    function spawnNPC() {
        try {

            var NPC, position;

            //Random angle in radians
            var angle = Math.floor(Math.random() * (2 * Math.PI));

            //Magnitude atleast 5 squares max 10
            position = {
                x: Math.round(Math.cos(angle) * (Math.floor(Math.random() * 10) + 5)) + TrapezeOnline.Variables.Position.x,
                y: Math.round(Math.sin(angle) * (Math.floor(Math.random() * 10) + 5)) + TrapezeOnline.Variables.Position.y
            };

            NPC = TrapezeOnline.NPC.Create(position);

            TrapezeOnline.Variables.NPCs.push(NPC);

            TrapezeOnline.Renderer.SetupNPC(NPC, function () { });

        } catch (e) {
            TrapezeOnline.Log.Error("spawnNPC(): " + e);
        }
    }

    return {

        FireRound: function (targetCoordinate, weapon) {
            try {
                var i, len;
                //Check ammo level
                weapon.MagazineLevel -= 1;
                if (weapon.MagazineLevel < 1) {
                    if (weapon.MagazineLevel === 0) {
                        TrapezeOnline.Items.Reload(weapon);
                    }
                    return;
                }

                for (i = 0, len = weapon.Ammunition.Projectiles; i < len; i += 1) {
                    TrapezeOnline.Renderer.FireProjectile(targetCoordinate, weapon);
                }

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Controller.FireRound(): " + e);
            }
        },

        AddNPC: function () {
            try {
                if (TrapezeOnline.Variables.NPCs.length < 100) {
                    spawnNPC();
                }
            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Controller.AddNPC(): " + e);
            }
        },

        RemoveNPC: function (NPC) {
            try {
                var i, len, tempNPCs = new Array(TrapezeOnline.Variables.NPCs.length - 1);

                for (i = 0, len = TrapezeOnline.Variables.NPCs.length; i < len; i += 1) {
                    if (TrapezeOnline.Variables.NPCs[i] !== NPC) {
                        tempNPCs.push(TrapezeOnline.Variables.NPCs[i]);
                    }
                }

                NPC.sprite.opacity(0);
                NPC.sprite.destroy();

                TrapezeOnline.Variables.NPCs = tempNPCs;

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Controller.RemoveNPC(): " + e);
            }

        },

        //Perform the initial setup of the program
        Setup: function () {
            try {

                $("#wrapper").css({
                    "-ms-transform-origin": "0px 0px",
                    "-webkit-transform-origin": "0px 0px",
                    "transform-origin": "0px 0px",
                    "-ms-transform": "scale(" + TrapezeOnline.Settings.ViewportScale.x + "," + TrapezeOnline.Settings.ViewportScale.y + ")",
                    "-webkit-transform": "scale(" + TrapezeOnline.Settings.ViewportScale.x + "," + TrapezeOnline.Settings.ViewportScale.y + ")",
                    "transform": "scale(" + TrapezeOnline.Settings.ViewportScale.x + "," + TrapezeOnline.Settings.ViewportScale.y + ")"
                });

                setInstance();

                //Setup the renderer to allow drawing
                TrapezeOnline.Renderer.Setup();

                //When map ready to be drawn
                //Generate map
                TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);

                //Setup map
                TrapezeOnline.Renderer.SetupMap();

                //Draw map
                TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);

                //Add noise to map tiles
                TrapezeOnline.Renderer.SetupMapNoise();

                //Start animation
                TrapezeOnline.Renderer.Start();

                //Setup the hit detection layer
                TrapezeOnline.Renderer.SetupHit();

                //Setup character's faithful companion
                TrapezeOnline.Renderer.SetupPet();

                //Setup character
                TrapezeOnline.Renderer.SetupCharacter();

                //Setup character primary weapon
                TrapezeOnline.Renderer.SetupWeapon();

                //Setup the fog of war to obsure the map
                TrapezeOnline.Renderer.SetupFogOfWar();

                //Spawn a bunch of NPCs
                for (var i = 0, len = 50; i < len; i += 1) {
                    spawnNPC();
                }

                //Bind the keyboard events
                TrapezeOnline.Keyboard.BindEvents();

                //Bind the mouse events
                TrapezeOnline.Mouse.BindEvents();

                //Display the appropriate parts depending on the control scheme
                if (TrapezeOnline.Variables.ControlScheme === TrapezeOnline.Settings.ControlScheme.Touch) {
                    TrapezeOnline.Controls.Setup();
                    $("#leftControls").removeClass("hidden");
                    $("#container").removeClass("hidden");
                    $("#rightControls").removeClass("hidden");

                } else {
                    $("#container").removeClass("hidden");
                }


            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Controller.Setup(): " + e);
            }
        }
    };
} ());