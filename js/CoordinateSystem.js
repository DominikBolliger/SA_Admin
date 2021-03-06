class CoordinateSystem{

    constructor(canvas, ctx, div) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.margin = 45;
        this.frameLineWidth = 3;
        this.tiles = 6;
        this.height = this.canvas.height = div.clientWidth - 100;
        this.width = this.canvas.width = div.clientWidth - 100;
        this.strokeLenght = this.height - this.margin * 2;
        this.tileSize = this.strokeLenght / this.tiles;
        this.ctx.font = "45px Arial";
        this.gridRectList = [];
    }

    drawFrame(){
        this.ctx.strokeStyle = '#000000'
        this.ctx.lineWidth = this.frameLineWidth;
        this.ctx.beginPath();
        this.ctx.rect(this.margin, this.margin, this.strokeLenght, this.strokeLenght);
        this.ctx.stroke();
    }

    drawGrid(createObject){
        this.ctx.strokeStyle = '#121212';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        for (let i = 0; i < this.tiles; i++) {
            for (let j = 0; j < this.tiles; j++) {
                let posX = this.margin + this.tileSize * i;
                let posY = this.margin + this.tileSize * j;
                let gridX = i+1;
                let gridY = this.tiles - j;
                let size = this.tileSize;
                if (createObject){
                    let gridRect = new GridRect(posX, posY, gridX, gridY, size);
                    this.gridRectList.push(gridRect);
                }
                this.ctx.rect(posX, posY, size, size);
            }
        }
        this.ctx.stroke();
    }

    clearCanv(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}