function gameCtrl($scope, stateService, imageResourceFactory, mapResourceFactory){
    // Get Resource Names
    $scope.imageResources = imageResourceFactory.images;
    $scope.mapResources = mapResourceFactory.maps;

    $scope.game = {
        init : function(){
            // Create Canvas
            me.video.init("screen", window.innerWidth, window.innerHeight);
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
            this.setVelocity(2, 2);
            console.log(this);

            this.setFriction(0.01,0.01);                     //*
            this.animationspeed = 10;
            me.video.getScreenCanvas().addEventListener("touchstart", this.touchstart, false);

            // stand animation
            this.renderable.addAnimation("still", [0]);
            // walking animation
            this.renderable.addAnimation ("walkLeft", [1,5,9,13]);
            this.renderable.addAnimation ("walkRight", [3,7,11,15]); //2
            this.renderable.addAnimation ("walkUp", [2,6,10,14]); //2
            this.renderable.addAnimation ("walkDown", [0,4,8,12]); //2

            this.renderable.setCurrentAnimation("still");

            this.updateColRect(4, 20, 10, 38); //*

            $scope.x_coord = 0;
            $scope.y_coord = 0;
            $scope.playerX_coord = this.pos.x;
            $scope.playerY_coord = this.pos.y;
            $scope.move = false;
            // set the display to follow our position on both axis
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

            var grid = new PF.Grid(960, 640);
            var finder = new PF.AStarFinder();
            var path = finder.findPath(290, 244, 1, 244, grid);
            $scope.path = path;
            var mouse = this;
            //console.log(mouse.parent());
            $scope.stateService=stateService;
            $scope.stateService.functions.setCurrentContext(this);
            console.log("yo");
            console.log($scope.stateService.functions.getCurrentContext());

            me.input.registerPointerEvent("mousedown", me.game.viewport, function (event) {
                me.event.publish("mousedown", [ event ]);
            });
            this.mouseDown = me.event.subscribe("mousedown", function (event) {
                //console.log(event.pointerId+", ", event.gameX+", ",event.gameY);   //main player default is X:290 Y:244
                for (var i=0;i<path.length-1;i++) {

                }

            });
            //me.event.unsubscribe(thiss.mouseDown);      //When you are ready to destroy the object which has an open subscription, you must unsubscribe:
            //me.input.releasePointerEvent("mousedown", me.game.viewport);  //And you can safely destroy the event delegator when you no longer need to handle any mouse/touch events:
        },
        /* -----

         update the player pos

         ------ */
        update: function() {
            console.log(me.video.getHeight());
            console.log("yo2");
            console.log($scope.stateService.functions.getCurrentContext()/20);
            var source=$scope.path[0];
            $scope.path.splice(0,1);
            var sourceX=source[0];
            var sourceY=source[1];
            var dest="";
            var destX="";
            var destY="";
            if ($scope.path>1) {
                dest = $scope.path[1];
                destX=dest[0];
                destY=dest[1];
            }
            //console.log(source);
            var currentWalkingDir=walkFromAtoB(sourceX,sourceY,destX,destY);
            //console.log(currentWalkingDir);
            if (currentWalkingDir=="left") {             // 2 6 10 14
                mouse.renderable.addAnimation("still",[1]);
                mouse.vel.x -= mouse.accel.x * me.timer.tick;
                mouse.vel.y = 0;
            } else if (currentWalkingDir=="right") {
                mouse.renderable.addAnimation("still",[3]);
                mouse.vel.y = 0;
                mouse.vel.x += mouse.accel.x * me.timer.tick;
            }
            else if (currentWalkingDir=="up") {          // 3 7 11 15
                mouse.renderable.addAnimation("still",[2]);
                mouse.vel.y -= mouse.accel.y * me.timer.tick;
                mouse.vel.x = 0;
            }
            else if (currentWalkingDir=="down") {        // 1 5 9 13
                mouse.renderable.addAnimation("still",[0]);
                mouse.vel.y += mouse.accel.y * me.timer.tick;
                mouse.vel.x = 0;
            }
            else {
                mouse.vel.x = 0;
                mouse.vel.y = 0;
            }


            // check & update player movement
            mouse.updateMovement();

            // update animation if necessary
            if (mouse.vel.x>0 && mouse.vel.y==0) {
                mouse.renderable.setCurrentAnimation("walkRight");
                //mouse.parent();
                //return true;
            }
            else if (mouse.vel.x<0 && mouse.vel.y==0) {
                mouse.renderable.setCurrentAnimation("walkLeft");
                //mouse.parent();
                //return true;
            }
            else if (mouse.vel.x==0 && mouse.vel.y>0) {
                mouse.renderable.setCurrentAnimation("walkDown");
                //mouse.parent();
                //return true;
            }
            else if (mouse.vel.x==0 && mouse.vel.y<0) {
                mouse.renderable.setCurrentAnimation("walkUp");
                //mouse.parent();
                console.log("ass");
                //return true;
            }
            else {
                mouse.renderable.setCurrentAnimation("still");
                //mouse.parent();
                //return true;
            }
             //if no updates are needed
             return false;
        }

    });

    //$scope.game.NPC = game.Sprite.extend({

}