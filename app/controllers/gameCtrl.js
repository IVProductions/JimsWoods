function gameCtrl($scope, stateService, imageResourceFactory, mapResourceFactory){
    // Get Resource Names
    $scope.imageResources = imageResourceFactory.images;
    $scope.mapResources = mapResourceFactory.maps;

    $scope.showMenu = function(){
        me.state.change(me.state.MENU);
    }

    $scope.showMap = function(){
        me.state.change(me.state.PLAY);
    }
    $scope.game = {
        init : function(){
            // Create Canvas
            var thing= me.video.init("screen", window.innerWidth, window.innerHeight);
            $scope.thing=thing;
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
            // set the default horizontal & vertical speed (accel vector)
            this.setVelocity(2, 2);

            this.setFriction(0.01,0.01);                     //*
            this.animationspeed = 10;
            //me.video.getScreenCanvas().addEventListener("touchstart", this.touchstart, false);

            // stand animation
            this.renderable.addAnimation("still", [0]);
            // walking animation
            this.renderable.addAnimation ("walkLeft", [1,5,9,13]);
            this.renderable.addAnimation ("walkRight", [3,7,11,15]); //2
            this.renderable.addAnimation ("walkUp", [2,6,10,14]); //2
            this.renderable.addAnimation ("walkDown", [0,4,8,12]); //2
            this.renderable.addAnimation ("walkRightDown", [0,4,8,12]); //2

            this.renderable.setCurrentAnimation("still");

            this.updateColRect(4, 20, 10, 38); //*

            $scope.x_coord = 0;
            $scope.y_coord = 0;
            $scope.playerX_coord = this.pos.x;
            $scope.playerY_coord = this.pos.y;
            $scope.move = false;
            // set the display to follow our position on both axis
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            //var grid = new PF.Grid(me.video.getWidth(), me.video.getHeight);

            //var path = finder.findPath(this.pos.x, this.pos.y, 520, 320, grid);
            var path=[];
            $scope.myList=[];
            $scope.path = path;
            var mouse = this;
            var mouseEvent = me.input.registerPointerEvent('mousedown', me.game.viewport, function (event) {
                me.event.publish("mousedown", [ event ]);
            });
            this.mouseDown = me.event.subscribe("mousedown", function (event) {

                //alert(event.gameY);
                var xSource=""+mouse.pos.x;
                var ySource=""+mouse.pos.y;

                var sourceTileX=""+xSource/53;
                var sourceTileY=""+ySource/53;
                if (sourceTileX.indexOf(".")!=-1) {
                    sourceTileX=sourceTileX.split('.')[0];
                    var numX=parseInt(sourceTileX);
                    sourceTileX=numX+1;
                }
                if (sourceTileY.indexOf(".")!=-1) {
                    sourceTileY=sourceTileY.split('.')[0];
                    var numY=parseInt(sourceTileY);
                    sourceTileY=numY+1;
                }
                console.log("info");
                console.log(mouse.pos.x+", "+sourceTileX);
                console.log(mouse.pos.y+", "+sourceTileY);
                console.log("infoEnd");


                var xTarget=event.gameX;
                var yTarget=event.gameY;
                var targetTileX=""+xTarget/53;
                var targetTileY=""+yTarget/53;
                if (targetTileX.indexOf(".")!=-1) {
                    targetTileX=targetTileX.split('.')[0];
                    var nummX=parseInt(targetTileX);
                    targetTileX=nummX+1;
                }
                if (targetTileY.indexOf(".")!=-1) {
                    targetTileY=targetTileY.split('.')[0];
                    var nummY=parseInt(targetTileY);
                    targetTileY=nummY+1;
                }
                //alert(yTarget-ySource);
                //right dir
                console.log("info2");
                console.log(event.gameX+", "+targetTileX);
                console.log(event.gameY+", "+targetTileY);
                console.log("infoEnd2");
                var grid = new PF.Grid(150,150);
                var finder = new PF.IDAStarFinder();

                $scope.path = finder.findPath(sourceTileX, sourceTileY, targetTileX, targetTileY, grid);
                for (var i=0;i<$scope.path.length-1;i++) {
                    var source=$scope.path[i];
                    var sourceX=source[0];
                    var sourceY=source[1];
                    var dest = $scope.path[i+1];
                    var destX=dest[0];
                    var destY=dest[1];
                    $scope.myList.push(walkFromAtoB(sourceX,sourceY,destX,destY));
                    //$scope.myList.push(currentWalkingDir);
                }
                $scope.walkNumber=0;
                console.log("mongo");
                for (var j=0;j<$scope.myList.length;j++){
                    console.log($scope.myList[j]);
                }

            });

        },
        /* -----

         update the player pos

         ------ */
        update: function() {
            $scope.walkNumber++;
            //console.log(me.video.getHeight());
            //if ($scope.path.length>0) {            //if path exists
            //    var source=$scope.path[0];
            //    var sourceX=source[0];
            //    var sourceY=source[1];
            //}
            //if ($scope.path.length>1) {            //if not last coordinate
            //    var dest = $scope.path[1];
            //    var destX=dest[0];
            //    var destY=dest[1];
            //}
            //$scope.path.splice(0,1);
            if ($scope.walkNumber>24) {
                $scope.walkNumber=0;
                $scope.myList.splice(0,1);
            }
            //var currentWalkingDir=walkFromAtoB(sourceX,sourceY,destX,destY);
            var currentWalkingDir=$scope.myList[0];
            //if (currentWalkingDir=="left" || currentWalkingDir=="right" || currentWalkingDir=="up" || currentWalkingDir=="down"){
            //for (var i=0;i<53;i++){
            if (currentWalkingDir=="left") {             // 2 6 10 14
                    this.renderable.addAnimation("still",[1]);
                    this.vel.x -= this.accel.x * me.timer.tick;
                    this.vel.y = 0;
                } else if (currentWalkingDir=="right") {
                    this.renderable.addAnimation("still",[3]);
                    this.vel.y = 0;
                    this.vel.x += this.accel.x * me.timer.tick;
                }
                else if (currentWalkingDir=="up") {          // 3 7 11 15
                    this.renderable.addAnimation("still",[2]);
                    this.vel.y -= this.accel.y * me.timer.tick;
                    this.vel.x = 0;
                }
                else if (currentWalkingDir=="down") {        // 1 5 9 13
                    this.renderable.addAnimation("still",[0]);
                    this.vel.y += this.accel.y * me.timer.tick;
                    this.vel.x = 0;
                }
                else {
                    this.vel.x = 0;
                    this.vel.y = 0;
                }


                // check & update player movement
                this.updateMovement();
                // update animation if necessary
                if (this.vel.x>0 && this.vel.y==0) {
                    this.renderable.setCurrentAnimation("walkRight");
                    this.parent();
                    return true;
                }
                else if (this.vel.x<0 && this.vel.y==0) {
                    this.renderable.setCurrentAnimation("walkLeft");
                    this.parent();
                    return true;
                }
                else if (this.vel.x==0 && this.vel.y>0) {
                    this.renderable.setCurrentAnimation("walkDown");
                    this.parent();
                    return true;
                }
                else if (this.vel.x==0 && this.vel.y<0) {
                    this.renderable.setCurrentAnimation("walkUp");
                    this.parent();
                    return true;
                }
                else {
                    this.renderable.setCurrentAnimation("still");
                    this.parent();
                    return true;
                }
                //if no updates are needed
                return false;
            //}}

        }

    });

}