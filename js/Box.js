class Box{

    constructor(boxId, posX, posY, posZ, colorId) {
        this.boxId = boxId
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.colorId = colorId;
        this.color = "";
        this.setcolor();
    }

    setcolor(){
        switch (this.colorId){
            case 1:
                this.color = '#FF0000';
                break;
            case 2:
                this.color = '#27a12f';
                break;
            case 3:
                this.color = '#1e14db';
                break;
            case 4:
                this.color = '#000000';
                break;
            case 5:
                this.color = '#fcdb03';
                break;
        }
    }
}