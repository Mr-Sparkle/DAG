var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Controller = (function () {
    "use strict";

    $(document).ready(function () {
        try {
            TrapezeOnline.Controller.Setup();

        } catch (e) {
            throw "document.ready(): " + e;
        }
    });


    //Sets the instance variables of the program
    function setInstance() {
        try {
            TrapezeOnline.Variables.MapSize = {
                width: Math.floor(TrapezeOnline.Settings.ViewportSize.width / TrapezeOnline.Settings.TileSize.width),
                height: Math.floor(TrapezeOnline.Settings.ViewportSize.height / TrapezeOnline.Settings.TileSize.height)
            };

            TrapezeOnline.Variables.Map = [];
        } catch (e) {
            throw "setInstance(): " + e;
        }
    }

    return {

        //Perform the initial setup of the program
        Setup: function () {
            try {
                setInstance();
                TrapezeOnline.Renderer.Setup();

                TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);

                TrapezeOnline.Renderer.DrawMap(TrapezeOnline.Variables.Position);

                TrapezeOnline.Renderer.SetupSprites();

                TrapezeOnline.Keyboard.BindEvents();

            } catch (e) {
                throw "TrapezeOnline.Controller.Setup(): " + e;
            }
        }
    };
} ());