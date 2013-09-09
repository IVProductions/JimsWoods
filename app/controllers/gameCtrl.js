function gameCtrl($scope, stateService){
    var game = function () {
        // Init Canvas
        me.video.init("screen", 960, 640, true);

        // Initialize the audio.
        //me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        //me.loader.onload = this.loaded.bind(this);
        // Set a callback to run when loading is complete.
        // Load the resources.
        me.loader.preload(game.resources);
        // Initialize melonJS and display a loading screen.
        //me.state.change(me.state.LOADING);
        console.log("preloaddone");
        me.state.change(me.state.LOADING);

        loaded();

    };

    var loaded = function(){
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // Start the game.
        me.state.change(me.state.PLAY);
    }

    game.resources = [
    /**
     * Graphics.
     */
        // our level tileset
        {
            name: "area01_level_tiles",  type:"image", src: "Content/tiles/area01_level_tiles.png"
        },

        /*
         * Maps.
         */
        {
            name: "area01", type: "tmx", src: "Content/map/area01.tmx"
        }

    ];

    game.PlayScreen = me.ScreenObject.extend({

        onResetEvent: function() {
            // stuff to reset on state change
            // load a level
            me.levelDirector.loadLevel("area01");
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


    game();
}