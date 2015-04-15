var TrapezeOnline = TrapezeOnline || {};
TrapezeOnline.Items = (function () {
    "use strict";

    return {
        Pistol_22: {
            //Current level of ammunition
            MagazineLevel: 15,
            //Maximum level of ammunition
            MagazineCapacity: 15,
            //Action
            Action: TrapezeOnline.Settings.Actions.SemiAutomatic,
            //Current ammunition
            Ammunition: TrapezeOnline.Settings.Ammunition.Pistol_22_Standard,
            //Reload time (ms)
            ReloadTime: 2000,
            //MOA
            Accuracy: 1
        },

        Reload: function (weapon) {
            try {
                setTimeout(function () {
                    try {
                        weapon.MagazineLevel = weapon.MagazineCapacity;

                    } catch (e) {
                        throw "reload.timeout(): " + e;
                    }
                }, weapon.ReloadTime);

            } catch (e) {
                TrapezeOnline.Log.Error("TrapezeOnline.Items.Reload(): " + e);
            }
        }

    };
} ());