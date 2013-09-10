function gameCtrl($scope, stateService, imageResourceFactory, mapResourceFactory){
    // Get Resource Names
    $scope.imageResources = imageResourceFactory.images;
    $scope.mapResources = mapResourceFactory.maps;

    $scope.game = {
        init : function(){
            // Create Canvas
            me.video.init("screen", 960, 640);
            me.sys.gravity = 0;

            // Initialize the audio.
            //me.audio.init("ogg");



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
            for(var j = 0; j<$scope.mapResources.length; j++){
                value = $scope.mapResources[j].name;
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
            //me.state.set(me.state.MENU, new this.TitleScreen());
            me.state.set(me.state.PLAY, new this.PlayScreen());

            // add our player entity in the entity pool
            me.entityPool.add("mainPlayer", this.PlayerEntity);

            // enable the keyboard
            me.input.bindKey(me.input.KEY.LEFT, "left");
            me.input.bindKey(me.input.KEY.RIGHT, "right");
            me.input.bindKey(me.input.KEY.UP, "up");
            me.input.bindKey(me.input.KEY.UP, "down");

            // Start the game.
            me.state.change(me.state.PLAY);
        }
    };

    /* the in game stuff*/
    $scope.game.PlayScreen = me.ScreenObject.extend({

        onResetEvent: function() {
            // stuff to reset on state change
            // load a level
            me.levelDirector.loadLevel("woods");
        },

        /* ---

         action to perform when game is finished (state change)

         --- */
        onDestroyEvent: function() {
        }

    });

    $scope.game.TitleScreen = me.ScreenObject.extend({
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

    /*-------------------
     a player entity
     -------------------------------- */
    $scope.game.PlayerEntity = me.ObjectEntity.extend({

        init: function(x, y, settings) {
            // call the constructor
            this.parent(x, y, settings);

            // set the default horizontal & vertical speed (accel vector)
            this.setVelocity(3, 3);

            // set the display to follow our position on both axis
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        },

        /* -----

         update the player pos

         ------ */
        update: function() {

            if (me.input.isKeyPressed('left')) {
                // flip the sprite on horizontal axis
                this.flipX(true);
                // update the entity velocity
                this.vel.x -= this.accel.x * me.timer.tick;
            } else if (me.input.isKeyPressed('right')) {
                // unflip the sprite
                this.flipX(false);
                // update the entity velocity
                this.vel.x += this.accel.x * me.timer.tick;
            }
            else if (me.input.isKeyPressed('down')) {
                // unflip the sprite
                this.flipY(false);
                // update the entity velocity
                this.vel.y -= this.accel.y * me.timer.tick;
            }
            else if (me.input.isKeyPressed('up')) {
                // unflip the sprite
                this.flipY(true);
                // update the entity velocity
                this.vel.y += this.accel.y * me.timer.tick;
            }
            else {
                this.vel.x = 0;
            }


            // check & update player movement
            this.updateMovement();

            // update animation if necessary
            if (this.vel.x!=0 || this.vel.y!=0) {
                // update object animation
                this.parent();
                return true;
            }

            // else inform the engine we did not perform
            // any update (e.g. position, animation)
            return false;
        }

    });

}