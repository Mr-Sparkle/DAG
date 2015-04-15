var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.NPC = (function () {
    "use strict";

    var id = 0;

    function getNextId() {
        try {
            return id += 1;

        } catch (e) {
            TrapezeOnline.Log.Error("getNextId(): " + e);
        }
    }

    return {
        Create: function (position) {
            try {
                var health = Math.floor(Math.random() * 100) + 1;
                
                var NPC = {
                    faction: TrapezeOnline.Factions.Get(),
                    hitBox: TrapezeOnline.Settings.HitBox,
                    position: {
                        x: position.x,
                        y: position.y
                    },
                    health: health,
                    id: getNextId(),
                    sprite: null,
                    speedModifier: health / 100 * 0.5 + 0.25
                };

                return NPC;

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.NPC.Create(): " + e);
            }
        }

    };
} ());