var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Mouse = (function () {
    "use strict";

    function leftMouseClick() {
        try {
            var mousePos = TrapezeOnline.Calculations.GetPointerPosition();

            if (!mousePos) { return; }

            TrapezeOnline.Controller.FireRound(mousePos, TrapezeOnline.Variables.Weapon);

        } catch (e) {
            TrapezeOnline.Log.Error("leftMouseClick(): " + e);
        }
    }

    function middleMouseClick() {
        try {
            throw "Unimplemented.";

        } catch (e) {
            TrapezeOnline.Log.Error("middleMouseClick(): " + e);
        }
    }

    function rightMouseClick() {
        try {
            throw "Unimplemented.";

        } catch (e) {
            TrapezeOnline.Log.Error("rightMouseClick(): " + e);
        }
    }

    function bindKeyboardAndMouse() {
        try {
            document.body.style.cursor = TrapezeOnline.Settings.Cursors.Crosshair;

            $(document).off("mousemove touchmove").on("mousemove touchmove", function () {
                try {
                    var mousePos = TrapezeOnline.Calculations.GetPointerPosition(), direction;

                    if (!mousePos) { return; }

                    direction = TrapezeOnline.Calculations.GetAngleToCentre(mousePos, false);

                    TrapezeOnline.Variables.VisionDirection = direction - 180;
                    
                } catch (e) {
                    TrapezeOnline.Log.Error("bindKeyboardAndMouse.onmousemove(): " + e);
                }
            });

            $(document).off("click tap").on("click tap", function (event) {
                try {
                    switch (event.which) {
                        case 1:
                            leftMouseClick();
                            break;
                        case 2:
                            middleMouseClick();
                            break;
                        case 3:
                            leftMouseClick();
                            break;
                        default:
                            //Unknown, do nothing
                            break;
                    }

                } catch (e) {
                    TrapezeOnline.Log.Error("bindKeyboardAndMouse.onmousedown(): " + e);
                }
            });

            $(document).off("dblclick dbltap").on("dblclick dbltap", function (event) {
                try {
                    var mousePosition = TrapezeOnline.Calculations.GetPointerTilePosition(), diff;

                    //If not within canvas
                    if (!mousePosition) { return; }

                    TrapezeOnline.Variables.NextDesiredPosition = {
                        x: mousePosition.x,
                        y: mousePosition.y
                    };

                } catch (e) {
                    TrapezeOnline.Log.Error("TrapezeOnline.Mouse.BindEvents.onmousedown(): " + e);
                }
            });

        } catch (e) {
            throw "bindKeyboardAndMouse(): " + e;
        }
    }

    function bindMouse() {
        try {
            $(document).unbind("mousedown touchstart").bind("mousedown touchstart", function () {
                try {
                    var mousePosition = TrapezeOnline.Calculations.GetPointerTilePosition(), diff;

                    //If not within canvas
                    if (!mousePosition) { return; }

                    TrapezeOnline.Variables.NextDesiredPosition = {
                        x: mousePosition.x,
                        y: mousePosition.y
                    };

                } catch (e) {
                    TrapezeOnline.Log.Error("TrapezeOnline.Mouse.BindEvents.onmousedown(): " + e);
                }
            });
        } catch (e) {
            throw "bindMouse(): " + e;
        }
    }

    return {
        BindEvents: function () {
            try {
                switch (TrapezeOnline.Variables.ControlScheme) {
                    case TrapezeOnline.Settings.ControlScheme.KeyboardAndMouse:
                        bindKeyboardAndMouse();
                        break;

                    case TrapezeOnline.Settings.ControlScheme.Touch:
                        bindKeyboardAndMouse();
                        break;

                    case TrapezeOnline.Settings.ControlScheme.Mouse:
                        bindMouse();
                        break;

                    case TrapezeOnline.Settings.ControlScheme.Keyboard:
                        break;

                    default:
                        throw "Invalid control scheme.";

                }

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Mouse.BindEvents(): " + e);
            }
        }
    };
} ());