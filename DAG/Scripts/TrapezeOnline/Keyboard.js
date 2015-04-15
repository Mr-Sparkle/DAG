var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Keyboard = (function () {
    "use strict";

    return {
        BindEvents: function () {
            try {
                
                $(document).unbind("keydown").bind("keydown", function (event) {
                    try {
                        /*TrapezeOnline.Variables.GlobalTimer = TrapezeOnline.Log.StartTimer();*/

                        switch (event.keyCode || event.which) {

                            //Left, A               
                            case (65):
                            case (37):
                                TrapezeOnline.Variables.LeftLeftKeyDown = true;
                                break;

                            //Up, W              
                            case (87):
                            case (38):
                                TrapezeOnline.Variables.LeftUpKeyDown = true;
                                break;

                            //Right, D                
                            case (68):
                            case (39):
                                TrapezeOnline.Variables.LeftRightKeyDown = true;
                                break;

                            //Down, S              
                            case (83):
                            case (40):
                                TrapezeOnline.Variables.LeftDownKeyDown = true;
                                break;

                            default:
                                break;
                        }

                    } catch (e) {
                        throw "TrapezeOnline.Keyboard.BindEvents.onkeydown(): " + e;
                    }
                });

                $(document).unbind("keyup").bind("keyup", function (event) {
                    try {
                        /*TrapezeOnline.Variables.GlobalTimer = TrapezeOnline.Log.StartTimer();*/

                        switch (event.keyCode || event.which) {

                            //Left, A               
                            case (65):
                            case (37):
                                TrapezeOnline.Variables.LeftLeftKeyDown = false;
                                break;

                                //Up, W              
                            case (87):
                            case (38):
                                TrapezeOnline.Variables.LeftUpKeyDown = false;
                                break;

                                //Right, D                
                            case (68):
                            case (39):
                                TrapezeOnline.Variables.LeftRightKeyDown = false;
                                break;

                                //Down, S              
                            case (83):
                            case (40):
                                TrapezeOnline.Variables.LeftDownKeyDown = false;
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