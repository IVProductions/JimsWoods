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
    else if (Ax<Bx && Ay<By) {
        direction = "rightdown";
    }
    else if (Ax>Bx && Ay<By) {
        direction = "leftdown";
    }
    else if (Ax<Bx && Ay>By) {
        direction = "rightup";
    }
    else if (Ax>Bx && Ay>By) {
        direction = "leftup";
    }
    return direction;
}
