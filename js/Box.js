class Box{

    constructor(boxId, posX, posY, posZ, colorId, orderId) {
        this.boxId = boxId
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.colorId = colorId;
        this.orderId = orderId;
        this.color = "";
        this.setcolor();
        this.isDelivered = false;
    }

    drawBox(boxCoord1, boxCoord2, gridList, ctx){
        ctx.fillStyle = this.color;
        gridList.forEach((rect) =>{
            if (rect.gridX === boxCoord1 && rect.gridY === boxCoord2){
                ctx.fillRect(rect.posX, rect.posY, rect.size, rect.size);
            }
        });
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
                this.color = '#FC6A03';
                break;
            case 5:
                this.color = '#fcdb03';
                break;
        }
    }

    static createBoxes(boxes){
        boxList = [];
        boxes.forEach ((object) => {
            let box = new Box(object.box_id, object.box_pos_x, object.box_pos_y, object.box_pos_z, object.article_id, object.order_id);
            boxList.push(box);
        });
        return boxList
    }

    static getBoxesToDeliver(){
        let deliverList = []
        boxList.forEach((box) => {
            if (box.orderId === orderNumber){
                deliverList.push(box);
            }
        });
        deliverList.forEach((box) => {
            console.log(box.boxId + " " + box.orderId)
        });
        return deliverList;
    }

}