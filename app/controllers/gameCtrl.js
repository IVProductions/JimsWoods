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
            me.input.bindKey(me.input.KEY.DOWN, "down");

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
            console.log(this.parent);
            console.log(settings);
            console.log(x);
            console.log(y);
            // set the default horizontal & vertical speed (accel vector)
            this.setVelocity(3, 3);
            console.log(this);

            //this.addAnimation("walk");
            // stand animation
            //this.addAnimation ("still", [0]);
            // walking animation
            //this.addAnimation ("walk", [3,4]);
            // jump animation
            //this.addAnimation ("jump", [1]); //2
            //set
            // set the display to follow our position on both axis
            this.setFriction(0.01,0.01);                     //*
            this.animationspeed = 10;

            // stand animation
            this.addAnimation ("still", [0]);
            // walking animation
            this.addAnimation ("walk", [4,5]);
            // jump animation
            this.addAnimation ("jump", [1]); //2
            //set
            this.setCurrentAnimation("still");

            this.updateColRect(4, 20, 10, 38); //*
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);


            //this.addAnimation("still",0);
            //this.addAnimation("walk_down",   [ 0, 4,  8, 12 ]);
            //this.addAnimation("walk_left",   [ 1, 5,  9, 13 ]);
            //this.addAnimation("walk_up",     [ 2, 6, 10, 14 ]);
            //this.addAnimation("walk_right",  [ 3, 7, 11, 15 ]);


        },



        /* -----

         update the player pos

         ------ */
        update: function() {
           // me.input.registerPointerEvent('mousemove', this, this);

            if (me.input.isKeyPressed('left')) {             // 2 6 10 14
                // update the entity velocity
                //var direction = 'left';
                this.vel.x -= this.accel.x * me.timer.tick;
            } else if (me.input.isKeyPressed('right')) {
                //var direction = 'right';// 4 8 12 16
                // update the entity velocity
                this.vel.x += this.accel.x * me.timer.tick;
            }
            else if (me.input.isKeyPressed('up')) {          // 3 7 11 15
                //var direction = 'up';
                // update the entity velocity
                this.vel.y -= this.accel.y * me.timer.tick;
            }
            else if (me.input.isKeyPressed('down')) {        // 1 5 9 13
                //var direction = 'down';
                // update the entity velocity
                this.vel.y += this.accel.y * me.timer.tick;
            }
            else {
                this.vel.x = 0;
                this.vel.y = 0;
            }


            // check & update player movement
            this.updateMovement();

            // update animation if necessary
            if (this.vel.x>0 && this.vel.y==0) {
                // update object animation
                //this.setCurrentAnimation("walk_" + direction);   //denne oppdaterer spriteanimasjonen
                this.setCurrentAnimation("walkLeft");
                this.parent();
                return true;
            }
            else if (this.vel.x<0 && this.vel.y==0) {
                this.setCurrentAnimation("walkRight");
                this.parent();
            // else inform the engine we did not perform
            // any update (e.g. position, animation)
                return true;
            }
            else if (this.vel.x==0 && this.vel.y>0) {
                this.setCurrentAnimation("walkDown");
                this.parent();
                return true;
            }
            else if (this.vel.x==0 && this.vel.y<0) {
                this.setCurrentAnimation("walkUp");
                this.parent();
                return true;
            }
            else {
                this.setCurrentAnimation("still");
                this.parent();
                return true;
            }

            return false;
        }

    });

    //$scope.game.NPC = game.Sprite.extend({

}