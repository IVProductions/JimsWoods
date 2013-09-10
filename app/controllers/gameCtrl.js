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
        loaded : function loaded() {
            // Create a notifier.
            //game.notify = new game.Notify();

            // Set the "Play" ScreenObject.
            game.play = new game.PlayScreen(20);
            me.state.set(me.state.PLAY, game.play);
        }
    };


}