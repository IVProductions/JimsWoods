function gameCtrl($scope, stateService){
    $scope.game = {
        init : function(){
            // Create Canvas
            me.video.init("screen", 960, 640);

            // Initialize the audio.
            //me.audio.init("ogg");

            // Key bindings.
            me.input.bindKey(me.input.KEY.UP,       "up");
            me.input.bindKey(me.input.KEY.LEFT,     "left");
            me.input.bindKey(me.input.KEY.DOWN,     "down");
            me.input.bindKey(me.input.KEY.RIGHT,    "right");

            // Set a callback to run when loading is complete.
            me.loader.onload = this.loaded.bind(this);
            this.loadResources();

            // Initialize melonJS and display a loading screen.
            me.state.change(me.state.LOADING);

        },

        loadResources : function () {
            // Set all resources to be loaded.
            var resources = [];

            // Graphics.
            this.resources["img"].forEach(function forEach(value) {
                resources.push({
                    "name"  : value,
                    "type"  : "image",
                    "src"   : "Content/img/" + value + ".png"
                })
            });

            // Maps.
            this.resources["map"].forEach(function forEach(value) {
                resources.push({
                    "name"  : value,
                    "type"  : "tmx",
                    "src"   : "Content/map/" + value + ".tmx"
                })
            });

            // Load the resources.
            me.loader.preload(resources);
        },
        "loaded" : function loaded() {

        }
    };

    $scope.game.resources = {
        "img" : [
            // UI
            "dialog",
            "heart_empty",
            "heart_half",
            "heart_full",
            "logo",

            // Characters
            "rachel",
            "rachel_eyes",
            "abi",
            "abi_eyes",
            "george",
            "george_eyes",
            "jessica",
            "jessica_eyes",
            "whitey",
            "whitey_eyes",
            "char_shadow",

            // Baddies
            "snake",

            // Collectibles
            "coin_gold",
            "coin_silver",
            "coin_shadow",
            "hammer",

            // Interactive objects
            "chests",

            // Tile maps
            /* island */
            "animwater",
            "grass",
            "sandwater",
            "treetop",
            "trunk",

            /* rachels_room */
            "accessories",
            "cabinets",
            "country",
            "floor",
            "house",
            "inside",
            "stairs",
            "victoria",

            /* rachels_house */
            "kitchen",

            /* earth */
            "barrel",
            "bridges",
            "buckets",
            "dirt",
            "dirt2",
            "doors",
            "farming_fishing",
            "fence",
            "fence_alt",
            "flowers_2",
            "grassalt_flowers",
            "housey",
            "misc",
            "mountains",
            "shadow",
            "signs",
            "stonepattern",
            "town_buildings",
            "tree_stump",
            "victorian_house",
            "windmill"
        ],

        /* Maps from Tiled. */
        "map" : [
            "island",
            "earth",
            "general_store",
            "rachels_room",
            "rachels_house",
            "shed"
        ]
    }
}