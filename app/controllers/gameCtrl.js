function gameCtrl($scope, stateService, imageResourceFactory, mapResourceFactory){
    // Get Resource Names
    $scope.imageResources = imageResourceFactory.images;
    $scope.mapResources = mapResourceFactory.maps;

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

        "loadResources" : function () {
            // Set all resources to be loaded.
            var resources = [];
            var value;

            // Graphics.
            for(var i = 0; i<$scope.imageResources.length; i++){
                value = $scope.imageResources[i].name;
                resources.push({
                    "name" : value,
                    "type"  : "image",
                    "src"   : "Content/img/" + value + ".png"
                })
            }

            // Maps.
            for(var i = 0; i<$scope.mapResources.length; i++){
                value = $scope.mapResources[i].name;
                resources.push({
                    "name" : value,
                    "type"  : "tmx",
                    "src"   : "Content/map/" + value + ".tmx"
                })
            }
            // Load the resources.
            me.loader.preload(resources);
        },
        "loaded" : function loaded() {
            me.state.set(me.state.MENU, new game.TitleScreen());
            me.state.set(me.state.PLAY, new game.PlayScreen());

            // Start the game.
            me.state.change(me.state.PLAY);
        }
    };

    /* the in game stuff*/
    game.PlayScreen = me.ScreenObject.extend({

        onResetEvent: function() {
            // stuff to reset on state change
            // load a level
            me.levelDirector.loadLevel("island");
        },

        /* ---

         action to perform when game is finished (state change)

         --- */
        onDestroyEvent: function() {
        }

    });

    game.TitleScreen = me.ScreenObject.extend({
        /**
         *  action to perform on state change
         */
        onResetEvent: function() {
        },


        /**
         *  action to perform when leaving this screen (state change)
         */
        onDestroyEvent: function() {
        }
    });





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