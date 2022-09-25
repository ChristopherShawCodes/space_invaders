class Ship {
    // a constructor is a specialized method of the class used to make new objects of that class 
    constructor() {
        this.x = width/2;
        this.y = height -10;
        this.width = 60;
        this.height = 10;
        this.xdir = 0;
    }
        //  to display the ship on the screen we create a method called "show" 
    show() {
        fill(0,255,0);
        noStroke();
        rect(this.x, this.y, this.width , this.height);
        rect(this.x +20 , this.y -10, 20,10)
    }

    move(){
        this.x += this.xdir * 10;
    }

    setDir(dir) {
        this.xdir = dir;
    }
}