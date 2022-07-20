class CraneHead {
    constructor(imagePath) {
        this.posX = 1;
        this.posY = 1;
        this.image = new Image();
        this.image.src = imagePath;
    }

    moveCraneHead(xChange, yChange){
        this.posX += xChange;
        this.posY += yChange;
    }

}