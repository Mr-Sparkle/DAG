var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Controls = (function () {
    "use strict";

    function setupLeftControls() {
        try {
            var size = {
                width: TrapezeOnline.Settings.ViewportSize.height,
                height: TrapezeOnline.Settings.ViewportSize.height
            }, radius = 40;

            var stage = new Kinetic.Stage({
                container: "leftControls",
                width: size.width,
                height: size.height
            });

            var layer = new Kinetic.Layer({});

            stage.add(layer);

            var background = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: size.width,
                height: size.height,
                fill: "#000"
            });

            layer.add(background);

            //Left
            var circleLeft = new Kinetic.Circle({
                x: size.width / 2 - 2.5 * radius,
                y: size.height / 2,
                radius: radius,
                fill: "#aaa",
                stroke: "#333",
                strokeWidth: 4
            });

            circleLeft.off("mousedown touchstart").on("mousedown touchstart", function () {
                try {
                    TrapezeOnline.Variables.LeftLeftKeyDown = true;
                    circleLeft.fill("#00ccff");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleLeft.mousedown(): " + e);
                }
            });

            circleLeft.off("mouseup touchend").on("mouseup touchend", function () {
                try {
                    TrapezeOnline.Variables.LeftLeftKeyDown = false;
                    circleLeft.fill("#aaa");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleLeft.mouseup(): " + e);
                }
            });

            //Up
            var circleUp = new Kinetic.Circle({
                x: size.width / 2,
                y: size.height / 2 - 2.5 * radius,
                radius: radius,
                fill: "#aaa",
                stroke: "#333",
                strokeWidth: 4
            });

            circleUp.off("mousedown touchstart").on("mousedown touchstart", function () {
                try {
                    TrapezeOnline.Variables.LeftUpKeyDown = true;
                    circleUp.fill("#00ccff");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleUp.mousedown(): " + e);
                }
            });

            circleUp.off("mouseup touchend").on("mouseup touchend", function () {
                try {
                    TrapezeOnline.Variables.LeftUpKeyDown = false;
                    circleUp.fill("#aaa");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleUp.mouseup(): " + e);
                }
            });

            //Right
            var circleRight = new Kinetic.Circle({
                x: size.width / 2 + 2.5 * radius,
                y: size.height / 2,
                radius: radius,
                fill: "#aaa",
                stroke: "#333",
                strokeWidth: 4
            });

            circleRight.off("mousedown touchstart").on("mousedown touchstart", function () {
                try {
                    TrapezeOnline.Variables.LeftRightKeyDown = true;
                    circleRight.fill("#00ccff");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleRight.mousedown(): " + e);
                }
            });

            circleRight.off("mouseup touchend").on("mouseup touchend", function () {
                try {
                    TrapezeOnline.Variables.LeftRightKeyDown = false;
                    circleRight.fill("#aaa");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleRight.mouseup(): " + e);
                }
            });

            //Down
            var circleDown = new Kinetic.Circle({
                x: size.width / 2,
                y: size.height / 2 + 2.5 * radius,
                radius: radius,
                fill: "#aaa",
                stroke: "#333",
                strokeWidth: 4
            });

            circleDown.off("mousedown touchstart").on("mousedown touchstart", function () {
                try {
                    TrapezeOnline.Variables.LeftDownKeyDown = true;
                    circleDown.fill("#00ccff");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleDown.mousedown(): " + e);
                }
            });

            circleDown.off("mouseup touchend").on("mouseup touchend", function () {
                try {
                    TrapezeOnline.Variables.LeftDownKeyDown = false;
                    circleDown.fill("#aaa");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleDown.mouseup(): " + e);
                }
            });

            layer.add(circleLeft);
            layer.add(circleUp);
            layer.add(circleRight);
            layer.add(circleDown);

            layer.batchDraw();

        } catch (e) {
            throw "setupLeftControls(): " + e;
        }
    }

    function setupRightControls() {
        try {
            var size = {
                width: TrapezeOnline.Settings.ViewportSize.height,
                height: TrapezeOnline.Settings.ViewportSize.height
            }, radius = 40;
            
            var stage = new Kinetic.Stage({
                container: "rightControls",
                width: TrapezeOnline.Settings.ViewportSize.height,
                height: TrapezeOnline.Settings.ViewportSize.height
            });

            var layer = new Kinetic.Layer({});

            stage.add(layer);

            var background = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: TrapezeOnline.Settings.ViewportSize.height,
                height: TrapezeOnline.Settings.ViewportSize.height,
                fill: "#000"
            });

            layer.add(background);

            //Left
            var circleLeft = new Kinetic.Circle({
                x: size.width / 2 - 2.5 * radius,
                y: size.height / 2,
                radius: radius,
                fill: "#aaa",
                stroke: "#333",
                strokeWidth: 4
            });

            circleLeft.off("mousedown touchstart").on("mousedown touchstart", function () {
                try {
                    TrapezeOnline.Variables.RightLeftKeyDown = true;
                    circleLeft.fill("#00ccff");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleLeft.mousedown(): " + e);
                }
            });

            circleLeft.off("mouseup touchend").on("mouseup touchend", function () {
                try {
                    TrapezeOnline.Variables.RightLeftKeyDown = false;
                    circleLeft.fill("#aaa");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleLeft.mouseup(): " + e);
                }
            });

            //Up
            var circleMiddle = new Kinetic.Circle({
                x: size.width / 2,
                y: size.height / 2,
                radius: radius,
                fill: "#aaa",
                stroke: "#333",
                strokeWidth: 4
            });

            circleMiddle.off("click tap").on("click tap", function () {
                try {
                    var radians = TrapezeOnline.Variables.VisionDirection * Math.PI / 180 - Math.PI / 2,
                        position = {
                            x: Math.cos(radians) + TrapezeOnline.Variables.ViewportCentre.x,
                            y: Math.sin(radians) + TrapezeOnline.Variables.ViewportCentre.y
                        };

                    TrapezeOnline.Controller.FireRound(position, TrapezeOnline.Variables.Weapon);

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleMiddle.mousedown(): " + e);
                }
            });

            //Right
            var circleRight = new Kinetic.Circle({
                x: size.width / 2 + 2.5 * radius,
                y: size.height / 2,
                radius: radius,
                fill: "#aaa",
                stroke: "#333",
                strokeWidth: 4
            });

            circleRight.off("mousedown touchstart").on("mousedown touchstart", function () {
                try {
                    TrapezeOnline.Variables.RightRightKeyDown = true;
                    circleRight.fill("#00ccff");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleRight.mousedown(): " + e);
                }
            });

            circleRight.off("mouseup touchend").on("mouseup touchend", function () {
                try {
                    TrapezeOnline.Variables.RightRightKeyDown = false;
                    circleRight.fill("#aaa");
                    layer.batchDraw();

                } catch (e) {
                    TrapezeOnline.Log.Error("setupLeftControls.circleRight.mouseup(): " + e);
                }
            });

            layer.add(circleLeft);
            layer.add(circleMiddle);
            layer.add(circleRight);

            stage.draw();

        } catch (e) {
            throw "setupLeftControls(): " + e;
        }
    }

    return {
        Setup: function () {
            try {
                setupLeftControls();
                setupRightControls();

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Controls.Setup(): " + e);
            }
        }
    };
} ());