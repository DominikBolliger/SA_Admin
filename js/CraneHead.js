class CraneHead {
    constructor(imagePath, posX, posY, size, ctx, ) {
        this.startX = posX;
        this.startY = posY
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = imagePath;
    }

    resetCraneHeadToStart(){
        this.posX = this.startX;
        this.posY = this.startY;
    }

    drawCraneHead(){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.size, this.size);
    }

    moveCraneHead(xChange, yChange){
        this.posX += xChange;
        this.posY += yChange;
    }

}