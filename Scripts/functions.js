function walkFromAtoB(Ax,Ay, Bx,By) {
    var direction ="";
    if (Ax==Bx) {
        //opp eller ned
        if (By>Ay) {
            //walk down a tile
            direction = "down";
        }
        else if (By<Ay) {
            //walk up a tile
            direction="up";
        }
    }
    else if (Ay==By) {
        //venstre eller høyre
        if (Bx>Ax) {
            //høyre
            direction = "right";
        }
        else if (Bx<Ax) {
            //venstre
            direction="left";
        }
    }
    return direction;
}

function movePlayer(dir) {
    if (dir=="left") {             // 2 6 10 14
        this.renderable.addAnimation("still",[1]);
        this.vel.x -= this.accel.x * me.timer.tick;
        this.vel.y = 0;
    } else if (dir=="right") {
        this.renderable.addAnimation("still",[3]);
        this.vel.y = 0;
        this.vel.x += this.accel.x * me.timer.tick;
    }
    else if (dir=="up") {          // 3 7 11 15
        this.renderable.addAnimation("still",[2]);
        this.vel.y -= this.accel.y * me.timer.tick;
        this.vel.x = 0;
    }
    else if (dir=="down") {        // 1 5 9 13
        this.renderable.addAnimation("still",[0]);
        this.vel.y += this.accel.y * me.timer.tick;
        this.vel.x = 0;
    }
    else {
        this.vel.x = 0;
        this.vel.y = 0;
    }
}