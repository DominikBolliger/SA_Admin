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
let ordersToShow;

window.onload = function () {
    init()
    drawCoordSystem();
    orders = getRestData("http://rest.sa/getOrders.php");
    createOrders();
    run();
}

function init(){
    fps = 10;
    canv1 = document.getElementById("canvas1");
    divCanv1 = document.getElementById("canvas1Div")
    contextCanv1 = canv1.getContext("2d");
    coordCanv1 = new CoordinateSystem(canv1, contextCanv1, divCanv1);
    craneHead = new CraneHead('./images/crane_head_top.png');
    craneHeadTop = new CraneHead('./images/crane_head.png')
    canv2 = document.getElementById("canvas2");
    divCanv2 = document.getElementById("canvas2Div")
    contextCanv2 = canv2.getContext("2d");
    coordCanv2 = new CoordinateSystem(canv2, contextCanv2, divCanv2);
    request = new XMLHttpRequest();
    ordersToShow = 10;
    boxes = [];
    orders = []
    boxList = [];
    orderList = []
}

function drawCoordSystem(){
    coordCanv1.drawFrame();
    coordCanv2.drawFrame();
    coordCanv1.drawGrid(true);
    coordCanv2.drawGrid(true);
}

function getRestData(url){
    let pos = [];
    request.open("GET", url, false);
    request.send();
    if (request.status === 200 ) {
        try {
            pos = JSON.parse(request.responseText);
        } catch (e) {
            console.log('Error happened here!')
            console.error(e)
        }
    }
    return pos;
}

function createBoxes(){
    boxList = [];
    boxes.forEach ((object) => {
        let box = new Box(object.box_id, object.box_pos_x, object.box_pos_y, object.box_pos_z, object.article_id, object.order_id);
        boxList.push(box);
    });
}

function createOrders() {
    orders.forEach((object) =>{
        let order = new Order(object.order_id, object.date);
        orderList.push(order);
    });
    let div = document.getElementById('orders-div');
    for (let i = 0; i < orderList.length ; i++) {
        let ordersDiv = document.createElement("div");
        ordersDiv.setAttribute("class", "orderDiv");
        ordersDiv.addEventListener('click', function (){
            boxes = getRestData("http://rest.sa/getBoxes.php?limit=" + orderList[i].orderId)
            createBoxes();
        });
        div.appendChild(ordersDiv);
        ordersDiv.innerHTML += "Order Numer: " + orderList[i].orderId + "<br>" + orderList[i].date;
    }
}

function draw(){
    coordCanv1.clearCanv();
    coordCanv2.clearCanv();
    boxList.forEach((box) => {
        if (box.posZ == 1){
            coordCanv1.drawBox(box.posX, box.posY, box.color);
        }
        if (box.posY == 1){
            coordCanv2.drawBox(box.posX, box.posZ, box.color);
        }
    });
    coordCanv1.drawCraneHead(craneHead.posX,craneHead.posY, craneHead.image);
    coordCanv2.drawCraneHead(craneHeadTop.posX,craneHeadTop.posY, craneHeadTop.image);
    coordCanv1.drawFrame();
    coordCanv2.drawFrame();
    coordCanv1.drawGrid(false);
    coordCanv2.drawGrid(false);
}

function run(){
    draw();
    setTimeout(function(){
        requestAnimationFrame(run);
    }, 1000 /fps );
}