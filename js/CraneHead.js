class CraneHead {
    constructor(imagePath) {
        this.posX = 1;
        this.posY = 1;
        this.image = new Image();
        this.image.src = imagePath;
    }
}