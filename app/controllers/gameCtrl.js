function gameCtrl($scope, stateService, imageResourceFactory, mapResourceFactory, woodAnimalFactory, stateService, desertAnimalFactory, seaAnimalFactory, jungleAnimalFactory, arcticAnimalFactory, fableAnimalFactory, mountainAnimalFactory, lostworldAnimalFactory){


    $(function() {
        $('#a1').draggable({ revert: "invalid" }); $('#a2').draggable({ revert: "invalid" }); $('#a3').draggable({ revert: "invalid" }); $('#a4').draggable({ revert: "invalid" });

        $('#fightanimal').droppable({
            activeClass: "ui-state-hover",
            hoverClass: "ui-state-active",
            drop: function(event, ui ) {
                $(this)
                    .html('Animate!');
            }
        });
    });


    // Get Resource Names
    $scope.imageResources = imageResourceFactory.images;
    $scope.mapResources = mapResourceFactory.maps;

    $scope.showMenu = function(){
    };

    $scope.showMap = function(){
        me.state.change(me.state.PLAY);
    };

    $scope.getWindowWidth = function (){
        return window.innerWidth;
    };

    $scope.getWindowHeight = function (){
        return window.innerHeight;
    };

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
            me.entityPool.add("animal", this.TrackEntity,true);
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
            this.renderable.addAnimation ("walkLeft", [1,9,17,25]);
            this.renderable.addAnimation ("walkRight", [3,11,19,27]); //2
            this.renderable.addAnimation ("walkUp", [2,10,18,26]); //2
            this.renderable.addAnimation ("walkDown", [0,8,16,24]); //2
            this.renderable.addAnimation ("walkRightDown", [5,13,21,29]); //2
            this.renderable.addAnimation ("walkLeftDown", [4,12,20,28]); //2
            this.renderable.addAnimation ("walkRightUp", [7,15,23,31]); //2
            this.renderable.addAnimation ("walkLeftUp", [6,14,22,30]); //2

            this.renderable.setCurrentAnimation("still");

            this.updateColRect(4, 20, 10, 38); //*
            // set the display to follow our position on both axis
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            //initialize list of unwalkable tiles
            var grid = new PF.Grid(150,150);
            var layer = me.game.currentLevel.getLayerByName("backTrees");  //get layer from 'Tiled'
            //layer.getTile(event.gameX, event.gameY);
            $scope.unwalkableTiles=[];
            for (var i=0;i<150;i++) {
                for (var j=0;j<150;j++) {
                    var tile=layer.layerData[~~(i)][~~(j)];
                    //if (tile.tileId=='1' || tile.tileId=='2') {
                    if (tile != null){
                        $scope.unwalkableTiles.push("["+i+","+j+"]");
                        grid.setWalkableAt(i,j,false);
                    }
                }
            }

            // set the player position if in local storage
            if(isPositionSet()){
                this.pos.x = parseInt(window.localStorage.getItem("pos_x"));
                this.pos.y = parseInt(window.localStorage.getItem("pos_y"));
                console.log("X: "+x);
                console.log("Y: "+y);
            }

            var finder = new PF.AStarFinder({heuristic: PF.Heuristic.euclidean,allowDiagonal: true,dontCrossCorners: true});
            $scope.listOfWalkingDir=[];
            var path=[];
            var gridBackup;
            var mouse = this;
            var mouseEvent = me.input.registerPointerEvent('mousedown', me.game.viewport, function (event) {
                me.event.publish("mousedown", [ event ]);
            });
            this.mouseDown = me.event.subscribe("mousedown", function (event) {
                $scope.listOfWalkingDir=[];
                var sourceTileX=""+((mouse.pos.x+26)/52);               //fiks slik at det blir 0-indeksert
                var sourceTileY=""+((mouse.pos.y+26)/52);
                if (sourceTileX.indexOf(".")!=-1) {
                    sourceTileX=parseInt(sourceTileX);
                }
                if (sourceTileY.indexOf(".")!=-1) {
                    sourceTileY=parseInt(sourceTileY);
                }
                console.log("info");
                console.log(mouse.pos.x+", "+sourceTileX);
                console.log(mouse.pos.y+", "+sourceTileY);
                console.log(mouse.pos.x);
                console.log(mouse.pos.y);
                console.log("infoEnd");

                var xTarget=event.gameX;
                var yTarget=event.gameY;
                var targetTileX=""+xTarget/52;
                var targetTileY=""+yTarget/52;
                if (targetTileX.indexOf(".")!=-1) {
                    targetTileX=parseInt(targetTileX);
                }
                if (targetTileY.indexOf(".")!=-1) {
                    targetTileY=parseInt(targetTileY);
                }
                console.log("info2");
                console.log(event.gameX+", "+targetTileX);
                console.log(event.gameY+", "+targetTileY);
                console.log("infoEnd2");

                gridBackup = grid.clone();
                if ($scope.unwalkableTiles.indexOf("["+targetTileX+","+targetTileY+"]")==-1) {
                console.log("sofa");
                path = finder.findPath(sourceTileX, sourceTileY, targetTileX, targetTileY, gridBackup);
                for (var i=0;i<path.length-1;i++) {
                    var source=path[i];
                    var sourceX=source[0];
                    var sourceY=source[1];
                    var dest = path[i+1];
                    var destX=dest[0];
                    var destY=dest[1];
                    $scope.listOfWalkingDir.push(walkFromAtoB(sourceX,sourceY,destX,destY));
                }
                    var x= parseInt(mouse.pos.x+26);
                    var y= parseInt(mouse.pos.y+26);
                    var xPixelsInTile=x-(sourceTileX*52);
                    var yPixelsInTile=y-(sourceTileY*52);
                    var dir=$scope.listOfWalkingDir[0];
                    if (dir=="left") {
                        $scope.walkIncrement=parseInt((26-(xPixelsInTile/2))-14);
                    }
                    else if (dir=="right") {
                        $scope.walkIncrement=parseInt((26-((52-xPixelsInTile)/2))-14);
                    }
                    else if (dir=="up") {
                        $scope.walkIncrement=parseInt((26-(yPixelsInTile/2))-14);
                    }
                    else if (dir=="down") {
                        $scope.walkIncrement=parseInt((26-((52-yPixelsInTile)/2))-14);
                    }
                    else if (dir="rightdown") {
                        var xValue=parseInt((26-((52-xPixelsInTile)/2)));
                        var yValue=parseInt((26-((52-yPixelsInTile)/2)));
                        $scope.walkIncrement=parseInt(((xValue+yValue)/2)-14);
                    }
                    else if (dir="leftdown") {
                        var xValue=parseInt((26-(xPixelsInTile/2)));
                        var yValue=parseInt((26-((52-yPixelsInTile)/2)));
                        $scope.walkIncrement=parseInt(((xValue+yValue)/2)-14);
                    }
                    else if (dir="rightup") {
                        var xValue=parseInt((26-((52-xPixelsInTile)/2)));
                        var yValue=parseInt((26-(yPixelsInTile/2)));
                        $scope.walkIncrement=parseInt(((xValue+yValue)/2)-14);
                    }
                    else if (dir="leftup") {
                        var xValue=parseInt((26-(xPixelsInTile/2)));
                        var yValue=parseInt((26-(yPixelsInTile/2)));
                        $scope.walkIncrement=parseInt(((xValue+yValue)/2)-14);
                    }
                    console.log("xpos: "+x+" , ypos:"+y+" , xpixel: "+xPixelsInTile+" , ypixel: "+yPixelsInTile+" , dir: " +dir+ " , walkInc: "+$scope.walkIncrement);
                }
                else {console.log("homse1");alert("clicked in woods!"+targetTileX+" , "+targetTileY);}
                console.log("homse2");
            });

        },
        /* -----

         update the player pos

         ------ */
        update: function() {

            savePosition(this.pos);

            $scope.walkIncrement++;
            if ($scope.walkIncrement>25) {
                $scope.walkIncrement=0;
                $scope.listOfWalkingDir.splice(0,1);
            }
            var currentWalkingDir=$scope.listOfWalkingDir[0];
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
                else if (currentWalkingDir=="rightdown") {        // 1 5 9 13
                    this.renderable.addAnimation("still",[0]);
                    this.vel.y += this.accel.y * me.timer.tick;
                    this.vel.x += this.accel.x * me.timer.tick;
                }
                else if (currentWalkingDir=="leftdown") {        // 1 5 9 13
                    this.renderable.addAnimation("still",[0]);
                    this.vel.y += this.accel.y * me.timer.tick;
                    this.vel.x -= this.accel.x * me.timer.tick;
                }
                else if (currentWalkingDir=="rightup") {        // 1 5 9 13
                    this.renderable.addAnimation("still",[0]);
                    this.vel.y -= this.accel.y * me.timer.tick;
                    this.vel.x += this.accel.x * me.timer.tick;
                }
                else if (currentWalkingDir=="leftup") {        // 1 5 9 13
                    this.renderable.addAnimation("still",[0]);
                    this.vel.y -= this.accel.y * me.timer.tick;
                    this.vel.x -= this.accel.x * me.timer.tick;
                }
                else {
                    this.vel.x = 0;
                    this.vel.y = 0;
                }

                // check & update player movement
                this.updateMovement();

                // check for collision with other objects
                 var res = this.collide();
                // check if we collide with another entity :
                if (res) {
                    var x = 57;
                    var ran=Math.floor((Math.random()*100)+1);
                    if (ran==x) {
                        $scope.setFSTrue();
                    }
                }
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
                else if (this.vel.x<0 && this.vel.y>0) {
                    this.renderable.setCurrentAnimation("walkLeftDown");
                    this.parent();
                    return true;
                }
                else if (this.vel.x>0 && this.vel.y<0) {
                    this.renderable.setCurrentAnimation("walkRightUp");
                    this.parent();
                    return true;
                }
                else if (this.vel.x<0 && this.vel.y<0) {
                    this.renderable.setCurrentAnimation("walkLeftUp");
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
        }

    });

    /**
     * save current pos to local storage
     * @type pos
     * @param pos
     */
    function savePosition(pos){
        window.localStorage.setItem("pos_x", pos.x);
        window.localStorage.setItem("pos_y", pos.y);
    }

    /**
     * check if position is set in local storage
     * @return true|false
     */
    function isPositionSet(){
        var x = window.localStorage.getItem("pos_x");
        var y = window.localStorage.getItem("pos_y");
        if(x !== null && y !== null){
            return true;
        } else {
            return false;
        }
    }

    $scope.game.TrackEntity = me.ObjectEntity.extend({
        init: function(x, y, settings) {
            // call the constructor
            this.parent(x, y, settings);
            // set the default horizontal & vertical speed (accel vector)
            this.setVelocity(0.8, 0.8);

            this.setFriction(0.01,0.01);                     //*
            this.animationspeed = 1;
            //me.video.getScreenCanvas().addEventListener("touchstart", this.touchstart, false);

            // stand animation
            this.renderable.addAnimation("still", [3]);
            // walking animation
            this.renderable.addAnimation ("walkLeft", [1]);
            this.renderable.addAnimation ("walkRight", [2]); //2
            this.renderable.addAnimation ("walkUp", [0]); //2
            this.renderable.addAnimation ("walkDown", [3]); //2
            this.renderable.addAnimation("walkInvisible", [4])

            this.renderable.setCurrentAnimation("still");
            $scope.trackList=[];
            $scope.right = (settings.right-1)*2;
            $scope.left = (settings.left-1)*2;
            $scope.down = (settings.down-1)*2;
            $scope.up = (settings.up-1)*2;
            for (var i=0; i<$scope.down;i++) {
                $scope.trackList.push("down");
            }
            for (var i=0; i<$scope.right;i++) {
                $scope.trackList.push("right");
            }
            for (var i=0; i<$scope.up;i++) {
                $scope.trackList.push("up");
            }
            for (var i=0; i<$scope.left;i++) {
                $scope.trackList.push("left");
            }

            $scope.walkNumber=0;
            $scope.first = true;
        },

        update: function() {
            var isInWoods=false;
            var currentTileX=""+((this.pos.x+26)/52);
            var currentTileY=""+((this.pos.y+26)/52);
            if (currentTileX.indexOf(".")!=-1) {
                currentTileX=parseInt(currentTileX);
            }
            if (currentTileY.indexOf(".")!=-1) {
                currentTileY=parseInt(currentTileY);
            }
            if ($scope.unwalkableTiles.indexOf("["+currentTileX+","+currentTileY+"]")>-1) {
                isInWoods=true;
            }
            $scope.walkNumber++;
            if ($scope.walkNumber>95) {
                $scope.walkNumber=0;
                $scope.trackList.splice(0,1);
                if ($scope.first) {
                    $scope.first=false;
                }
                else {$scope.first=true;}

                if ($scope.trackList.length<1) {
                    for (var i=0; i<$scope.down;i++) {
                        $scope.trackList.push("down");
                    }
                    for (var i=0; i<$scope.right;i++) {
                        $scope.trackList.push("right");
                    }
                    for (var i=0; i<$scope.up;i++) {
                        $scope.trackList.push("up");
                    }
                    for (var i=0; i<$scope.left;i++) {
                        $scope.trackList.push("left");
                    }
                }
            }
            var currentWalkingDir=$scope.trackList[0];
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
            if ($scope.walkNumber<45) {
                this.updateMovement();
            }
            // update animation if necessary

            if (this.vel.x>0 && this.vel.y==0) {
                if ($scope.first==false) {
                    this.renderable.addAnimation ("walkRight", [7]);
                }
                else {this.renderable.addAnimation ("walkRight", [2]);}
                if (isInWoods) {
                    this.renderable.setCurrentAnimation("walkInvisible");
                }
                else {
                    if ($scope.walkNumber>45) {
                        this.renderable.setCurrentAnimation("walkRight");
                    }
                    else {this.renderable.setCurrentAnimation("walkInvisible");}
                }
                this.parent();
                return true;
            }
            else if (this.vel.x<0 && this.vel.y==0) {
                if ($scope.first==false) {
                    this.renderable.addAnimation ("walkLeft", [6]);
                }
                else {this.renderable.addAnimation ("walkLeft", [1]);}
                if (isInWoods) {
                    this.renderable.setCurrentAnimation("walkInvisible");
                }
                else {
                    if ($scope.walkNumber>45) {
                        this.renderable.setCurrentAnimation("walkLeft");
                    }
                    else {this.renderable.setCurrentAnimation("walkInvisible");}
                }
                this.parent();
                return true;
            }
            else if (this.vel.x==0 && this.vel.y>0) {
                if ($scope.first==false) {
                    this.renderable.addAnimation ("walkDown", [8]);
                }
                else {this.renderable.addAnimation ("walkDown", [3]);}
                if (isInWoods) {
                    this.renderable.setCurrentAnimation("walkInvisible");
                }
                else {
                    if ($scope.walkNumber>45) {
                        this.renderable.setCurrentAnimation("walkDown");
                    }
                    else {this.renderable.setCurrentAnimation("walkInvisible");}
                }
                this.parent();
                return true;
            }
            else if (this.vel.x==0 && this.vel.y<0) {
                if ($scope.first==false) {
                    this.renderable.addAnimation ("walkUp", [5]);
                }
                else {this.renderable.addAnimation ("walkUp", [0]);}
                if (isInWoods) {
                    this.renderable.setCurrentAnimation("walkInvisible");
                }
                else {
                    if ($scope.walkNumber>45) {
                        this.renderable.setCurrentAnimation("walkUp");
                    }
                    else {this.renderable.setCurrentAnimation("walkInvisible");}
                }
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
        }
    });

    // Animal List //
    $scope.stateService = stateService;
    $scope.animal = $scope.stateService.functions.getCurrentAnimal();
    $scope.chooseWorldList=function(world){
        if (world=="woods") {
            $scope.woodAnimalFactory = woodAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.woodAnimalFactory);
        }
        else if (world=="desert") {
            $scope.desertAnimalFactory = desertAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.desertAnimalFactory);
        }
        else if (world=="sea") {
            $scope.seaAnimalFactory = seaAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.seaAnimalFactory);
        }
        else if (world=="jungle") {
            $scope.jungleAnimalFactory = jungleAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.jungleAnimalFactory);
        }
        else if (world=="arctic") {
            $scope.arcticAnimalFactory = arcticAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.arcticAnimalFactory);
        }
        else if (world=="fable") {
            $scope.fableAnimalFactory = fableAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.fableAnimalFactory);
        }
        else if (world=="mountain") {
            $scope.mountainAnimalFactory = mountainAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.mountainAnimalFactory);
        }
        else if (world=="lostworld") {
            $scope.lostWorldAnimalFactory = lostworldAnimalFactory;
            $scope.stateService.functions.setCurrentAnimalFactory($scope.lostWorldAnimalFactory);
        }
        $scope.animals = $scope.stateService.functions.getCurrentAnimalFactory();
    }
    $scope.getAnimalDetails=function(animal){
        console.log(animal);
        //alert(animal.name);
        $scope.stateService.functions.setCurrentAnimal(animal);
        $scope.animal = $scope.stateService.functions.getCurrentAnimal();
    }
    $scope.pauseGame=function(){
        me.state.pause(true);
    }
    $scope.resumeGame=function(){
        me.state.resume(true);
    }
    $scope.setFSTrue=function() {
        //me.entityPool.newInstanceOf("animal",30, 30, "left");
        //me.game.remove(me.game.TrackEntity);
        document.getElementById("showFS").click();

    }

}
