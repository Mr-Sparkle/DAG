var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Factions = (function () {
    "use strict";

    return {
        Get: function () {
            try {
                //TODO REMOVE
                return TrapezeOnline.Settings.Factions.Zombie;

                var random = Math.floor(Math.random() * 100);

                switch (true) {
                    case (random < 70):
                        return TrapezeOnline.Settings.Factions.Zombie;
                    case (random >= 70 && random < 85):
                        return TrapezeOnline.Settings.Factions.Bandit;
                    case (random >= 85 && random < 99):
                        return TrapezeOnline.Settings.Factions.Neutral;
                    case (random === 99):
                        return TrapezeOnline.Settings.Factions.Friend;
                    default:
                        throw "Invalid random.";
                }

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Factions.Get(): " + e);
            }
        }

    };
} ());