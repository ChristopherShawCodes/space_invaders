class Laser {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.r = 5; // this is the radius of the laser
        this.diam = this.r * 2; //radius X2 is the diameter
        this.toDelete = false; // a boolean flag based on the state of the object
    }

    show() {
        noStroke();
        fill (255,0,255);
        ellipse(this.x, this.y, this.diam , this.diam);
    }

    move() {
        this.y = this.y - 20; // moves laser up on the Y axis
    }
    hits(alien) {
        //distance function measures the distance between 2 points , as in x & y
        var d = dist(this.x, this.y, alien.x, alien.y);
        if (d < this.r + alien.radius) {
            return true;
        }
        else {
            return false;
        }
    }
    remove() {
        this.toDelete = true;
    }
}