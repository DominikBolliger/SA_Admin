let fps;
let canv1;
let divCanv1;
let contextCanv1;
let coordCanv1;
let craneHead;
let craneHeadTop;
let canv2;
let divCanv2;
let contextCanv2;
let coordCanv2;
let request;
let boxList;
let orderList;
let boxes;
let orders;
let isRunning;
let orderNumber;
let boxesToDeliver;

window.onload = function () {
    init()
    drawCoordSystem();
    orders = getRestData("http://rest.sa/getOrders.php");
    Order.createOrders(orders);
}

function init() {

    canv1 = document.getElementById("canvas1");
    canv2 = document.getElementById("canvas2");
    divCanv1 = document.getElementById("canvas1Div")
    divCanv2 = document.getElementById("canvas2Div")
    contextCanv1 = canv1.getContext("2d");
    contextCanv2 = canv2.getContext("2d");
    coordCanv1 = new CoordinateSystem(canv1, contextCanv1, divCanv1);
    coordCanv2 = new CoordinateSystem(canv2, contextCanv2, divCanv2);
    craneHeadTop = new CraneHead('./images/crane_head_top.png', coordCanv1.margin, coordCanv1.margin + coordCanv1.strokeLenght - coordCanv1.tileSize, coordCanv1.tileSize, contextCanv1);
    craneHead = new CraneHead('./images/crane_head.png', coordCanv2.margin, coordCanv2.margin + coordCanv2.strokeLenght - coordCanv2.tileSize, coordCanv2.tileSize, contextCanv2)

    fps = 20;
    request = new XMLHttpRequest();
    boxes = [];
    orders = []
    boxList = [];
    orderList = [];
    boxesToDeliver = [];
}

function drawCoordSystem() {
    coordCanv1.drawFrame();
    coordCanv2.drawFrame();
    coordCanv1.drawGrid(true);
    coordCanv2.drawGrid(true);
}

function getRestData(url) {
    let pos = [];
    request.open("GET", url, false);
    request.send();
    if (request.status === 200) {
        try {
            pos = JSON.parse(request.responseText);
        } catch (e) {
            console.log('Error happened here!')
            console.error(e)
        }
    }
    return pos;
}

function draw() {
    coordCanv1.clearCanv();
    coordCanv2.clearCanv();
    boxList.forEach((box) => {
        box.drawBox(box.posX, box.posY, coordCanv1.gridRectList, contextCanv1)
        box.drawBox(box.posX, box.posZ, coordCanv2.gridRectList, contextCanv2)
    });
    coordCanv1.drawFrame();
    coordCanv2.drawFrame();
    coordCanv1.drawGrid(false);
    coordCanv2.drawGrid(false);
    craneHead.drawCraneHead();
    craneHeadTop.drawCraneHead()
}

function update() {
    craneHead.moveCraneHead(1,-1)
    craneHeadTop.moveCraneHead(1,-1)
    // boxesToDeliver.every((box) => {
    //     if (!box.isDelivered){
    //         if (craneHead.posY < box.posZ){
    //             craneHead.moveCraneHead(0, 1);
    //         } else if (craneHead.posX < box.posX){
    //             craneHead.moveCraneHead(1, 0);
    //         }
    //         return false;
    //     }
    // });
}

function run() {
    isRunning = true;
    update();
    draw();
    setTimeout(function () {
        requestAnimationFrame(run);
    }, 1000 / fps);
}