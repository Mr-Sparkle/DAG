var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Keyboard = (function () {
    "use strict";

    var keyTimeout = null;

    return {
        BindEvents: function () {
            try {
                $(document).unbind("keyup").bind("keyup", function (event) {
                    try {
                        keyTimeout = setTimeout(function () {
                            try {
                                TrapezeOnline.Variables.Character.animation("Idle");

                            } catch (e) {
                                throw "keyTimeout(): " + e;
                            }
                        }, 20);

                    } catch (e) {
                        throw "TrapezeOnline.Keyboard.BindEvents.onkeyup(): " + e;
                    }
                });

                $(document).unbind("keydown").bind("keydown", function (event) {
                    try {
                        switch (event.which) {
                            //Left                         
                            case (37):

                                if (keyTimeout) {
                                    clearTimeout(keyTimeout);
                                }

                                TrapezeOnline.Renderer.MoveCharacter(TrapezeOnline.Settings.Direction.Left);

                                TrapezeOnline.Variables.Position = {
                                    x: TrapezeOnline.Variables.Position.x -= 1,
                                    y: TrapezeOnline.Variables.Position.y
                                };

                                TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                                TrapezeOnline.Renderer.MoveMap(TrapezeOnline.Settings.Direction.Left);

                                break;

                            //Up                            
                            case (38):

                                if (keyTimeout) {
                                    clearTimeout(keyTimeout);
                                }

                                TrapezeOnline.Renderer.MoveCharacter(TrapezeOnline.Settings.Direction.Up);

                                TrapezeOnline.Variables.Position = {
                                    x: TrapezeOnline.Variables.Position.x,
                                    y: TrapezeOnline.Variables.Position.y -= 1
                                };

                                TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                                TrapezeOnline.Renderer.MoveMap(TrapezeOnline.Settings.Direction.Up);

                                break;

                            //Right                            
                            case (39):

                                if (keyTimeout) {
                                    clearTimeout(keyTimeout);
                                }

                                TrapezeOnline.Renderer.MoveCharacter(TrapezeOnline.Settings.Direction.Right);

                                TrapezeOnline.Variables.Position = {
                                    x: TrapezeOnline.Variables.Position.x += 1,
                                    y: TrapezeOnline.Variables.Position.y
                                };

                                TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                                TrapezeOnline.Renderer.MoveMap(TrapezeOnline.Settings.Direction.Right);

                                break;


                            //Down                            
                            case (40):

                                if (keyTimeout) {
                                    clearTimeout(keyTimeout);
                                }

                                TrapezeOnline.Renderer.MoveCharacter(TrapezeOnline.Settings.Direction.Down);

                                TrapezeOnline.Variables.Position = {
                                    x: TrapezeOnline.Variables.Position.x,
                                    y: TrapezeOnline.Variables.Position.y += 1
                                };

                                TrapezeOnline.Variables.Map = TrapezeOnline.Map.Get(TrapezeOnline.Variables.Position);
                                TrapezeOnline.Renderer.MoveMap(TrapezeOnline.Settings.Direction.Down);

                                break;

                            default:
                                break;
                        }



                    } catch (e) {
                        throw "TrapezeOnline.Keyboard.BindEvents.onkeydown(): " + e;
                    }
                });

            } catch (e) {
                throw ("TrapezeOnline.Keyboard.BindEvents(): " + e);
            }
        }
    };
} ());