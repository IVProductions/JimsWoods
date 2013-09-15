function gameCtrl($scope, stateService, imageResourceFactory, mapResourceFactory){
    // Get Resource Names
    $scope.imageResources = imageResourceFactory.images;
    $scope.mapResources = mapResourceFactory.maps;

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
            console.log("Fag");
            console.log(me.video.getWidth());
            console.log(me.video.getHeight());
            console.log(this.pos.x);
            console.log(this.pos.y);
            console.log("fagEND");
            //var grid = new PF.Grid(me.video.getWidth(), me.video.getHeight);

            //var path = finder.findPath(this.pos.x, this.pos.y, 520, 320, grid);
            var path=[];
            $scope.path = path;
            //console.log(mouse.parent());
            //$scope.stateService=stateService;
            //$scope.stateService.functions.setCurrentContext(this);
            var mouse = this;
            var mouseEvent = me.input.registerPointerEvent('mousedown', me.game.viewport, function (event) {
                me.event.publish("mousedown", [ event ]);
            });
            this.mouseDown = me.event.subscribe("mousedown", function (event) {
                //alert(event.gameX+" , y "+event.gameY);
                var xSource=""+mouse.pos.x;
                var ySource=""+mouse.pos.y;
                if (xSource.indexOf(".") !=-1) {
                    xSource=xSource.split('.')[0];
                }
                if (ySource.indexOf(".") !=-1) {
                    ySource=ySource.split('.')[0];
                }
                var xTarget=event.gameX;
                var yTarget=event.gameY;
                var oldx="";
                var oldy="";
                var yeahX="";
                var yeahY="";
                alert(yTarget-ySource);
                oldx=xTarget;
                //right dir
                if (xTarget-xSource>0 && xTarget-xSource<50) {
                    xTarget=xTarget-0;
                }
                else if (xTarget-xSource>50 && xTarget-xSource<100) {
                    xTarget=xTarget-50;
                }
                else if (xTarget-xSource>100 && xTarget-xSource<150) {
                    xTarget=xTarget-87;
                }
                else if (xTarget-xSource>150 && xTarget-xSource<200) {
                    xTarget=xTarget-97;
                }
                else if (xTarget-xSource>200 && xTarget-xSource<250) {
                    xTarget=xTarget-107
                }
                else if (xTarget-xSource>250 && xTarget-xSource<300) {
                    xTarget=xTarget-157;
                }
                else if (xTarget-xSource>300 && xTarget-xSource<350) {
                    xTarget=xTarget-180;
                }
                else if (xTarget-xSource>350) {
                    xTarget=xTarget-300;
                }
                //left dir
                if (xTarget-xSource<0 && xTarget-xSource>-50) {
                    xTarget=xTarget;
                }
                else if (xTarget-xSource<-50 && xTarget-xSource>-100) {
                    xTarget=xTarget+30;
                }
                else if (xTarget-xSource<-100 && xTarget-xSource>-150) {
                    xTarget=xTarget+50;
                }
                else if (xTarget-xSource<-150 && xTarget-xSource>-200) {
                    xTarget=xTarget+70;
                }
                else if (xTarget-xSource<-200 && xTarget-xSource>-250) {
                    xTarget=xTarget+90;
                }
                else if (xTarget-xSource<-250 && xTarget-xSource>-300) {
                    xTarget=xTarget+110;
                }
                else if (xTarget-xSource<-300 && xTarget-xSource>-350) {
                    xTarget=xTarget+120;
                }
                else if (xTarget-xSource<-350) {
                    xTarget=xTarget+250;
                }
                //down dir
                if (yTarget-ySource>0 && yTarget-ySource<50) {
                    yTarget=yTarget-35;
                }
                else if (yTarget-ySource>50 && yTarget-ySource<100) {
                    yTarget=yTarget-50;
                }
                else if (yTarget-ySource>100 && yTarget-ySource<150) {
                    yTarget=yTarget-75;
                }
                else if (yTarget-ySource>150 && yTarget-ySource<200) {
                    yTarget=yTarget-100;
                }
                else if (yTarget-ySource>200 && yTarget-ySource<250) {
                    yTarget=yTarget-130;
                }
                else if (yTarget-ySource>250 && yTarget-ySource<300) {
                    yTarget=yTarget-130;
                }
                else if (yTarget-ySource>300 && yTarget-ySource<350) {
                    yTarget=yTarget-180;
                }
                else if (yTarget-ySource>350){
                    yTarget=yTarget-250;
                }
                //up dir
                if (yTarget-ySource<0 && yTarget-ySource>-50) {
                    yTarget=yTarget;
                }
                else if (yTarget-ySource<-50 && yTarget-ySource>-100) {
                    yTarget=yTarget+30;
                }
                else if (yTarget-ySource<-100 && yTarget-ySource>-150) {
                    yTarget=yTarget+50;
                }
                else if (yTarget-ySource<-150 && yTarget-ySource>-200) {
                    yTarget=yTarget+70;
                }
                else if (yTarget-ySource<-200 && yTarget-ySource>-250) {
                    yTarget=yTarget+90;
                }
                else if (yTarget-ySource<-250 && yTarget-ySource>-300) {
                    yTarget=yTarget+110;
                }
                else if (yTarget-ySource<-300 && yTarget-ySource>-350) {
                    yTarget=yTarget+120;
                }
                else if (yTarget-ySource<-350) {
                    yTarget=yTarget+250;
                }
                var grid = new PF.Grid(me.video.getWidth(),me.video.getHeight());
                var finder = new PF.IDAStarFinder();
                $scope.path = finder.findPath(xSource, ySource, xTarget, yTarget, grid);
                console.log("cock");
                console.log(mouse.pos.x);
                console.log(mouse.pos.y);
                console.log(event.gameX);
                console.log(event.gameY);
                console.log($scope.path[0]);
            });

        },
        /* -----

         update the player pos

         ------ */
        update: function() {
            //  console.log(me.video.getHeight());
            console.log("yo2");
            console.log(this);
            console.log($scope.path[0]);
            if ($scope.path.length>0) {            //if path exists
                var source=$scope.path[0];
                var sourceX=source[0];
                var sourceY=source[1];
            }
            if ($scope.path.length>1) {            //if not last coordinate
                var dest = $scope.path[1];
                var destX=dest[0];
                var destY=dest[1];
            }
            $scope.path.splice(0,1);
            //console.log(source);
            console.log("yo3");
            console.log(sourceX);
            console.log(sourceY);
            console.log(destX);
            console.log(destY);
            var currentWalkingDir=walkFromAtoB(sourceX,sourceY,destX,destY);
            //if (currentWalkingDir!=$scope.lastDir) {
                if (currentWalkingDir=="left") {             // 2 6 10 14
                    $scope.lastDir="left";
                    this.renderable.addAnimation("still",[1]);
                    this.vel.x -= this.accel.x * me.timer.tick;
                    this.vel.y = 0;
                } else if (currentWalkingDir=="right") {
                    $scope.lastDir="right";
                    this.renderable.addAnimation("still",[3]);
                    this.vel.y = 0;
                    this.vel.x += this.accel.x * me.timer.tick;
                }
                else if (currentWalkingDir=="up") {          // 3 7 11 15
                    $scope.lastDir="up";
                    this.renderable.addAnimation("still",[2]);
                    this.vel.y -= this.accel.y * me.timer.tick;
                    this.vel.x = 0;
                }
                else if (currentWalkingDir=="down") {        // 1 5 9 13
                    $scope.lastDir="down";
                    this.renderable.addAnimation("still",[0]);
                    this.vel.y += this.accel.y * me.timer.tick;
                    this.vel.x = 0;
                }
                else if (currentWalkingDir=="rightdown") {        // 1 5 9 13
                    $scope.lastDir="down";
                    this.renderable.addAnimation("still",[0]);
                    this.vel.y += this.accel.y * me.timer.tick;
                    this.vel.x += this.accel.x * me.timer.tick;
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
                else if (this.vel.x>0 && this.vel.y>0) {
                    this.renderable.setCurrentAnimation("walkRightDown");
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
            //}
            //else {
                //if ($scope.secondTime) {
                //    if($scope.thirdTime) {
                //        $scope.lastDir="";
                //        $scope.secondTime=false;
                //        $scope.thirdTime=false;
                //    }
                //    else {
                //         $scope.thirdTime=true;
                //    }
                //}
                //else {
                //    $scope.secondTime=true;
                //}
            //}
        }

    });

}