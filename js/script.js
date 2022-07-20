window.onload = function () {
    drawCoordSystem();
    createOrders();
    run();
}

let fps = 10;

function run(){
    drawCoordSystem();
    setTimeout(function(){
        requestAnimationFrame(run)
    }, 1000 /fps )
}

function drawCoordSystem(){
    let request = new XMLHttpRequest();
    let boxList = [];
    let pos = [];

    let canv1 = document.getElementById("canvas1");
    let divCanv1 = document.getElementById("canvas1Div")
    let contextCanv1 = canv1.getContext("2d");
    let coordCanv1 = new CoordinateSystem(canv1, contextCanv1, divCanv1);
    let craneHead = new CraneHead('./images/crane_head_top.png');
    let craneHeadTop = new CraneHead('./images/crane_head.png')

    let canv2 = document.getElementById("canvas2");
    let divCanv2 = document.getElementById("canvas2Div")
    let contextCanv2 = canv2.getContext("2d");
    let coordCanv2 = new CoordinateSystem(canv2, contextCanv2, divCanv2);

    coordCanv1.drawGrid(true);
    coordCanv2.drawGrid(true);
    coordCanv1.drawCraneHead(craneHead.posX,craneHead.posY, craneHead.image);
    coordCanv2.drawCraneHead(craneHeadTop.posX,craneHeadTop.posY, craneHeadTop.image);

    request.open("GET", "http://rest.sa/getBoxes.php", false);
    request.send();
    if (request.status === 200 ) {
        try {
            pos = JSON.parse(request.responseText);
        } catch (e) {
            console.log('Error happened here!')
            console.error(e)
        }
    }
    pos.forEach ((object) => {
        let box = new Box(object.box_id, object.box_pos_x, object.box_pos_y, object.box_pos_z, object.article_id)
        boxList.push(box)
    });

    boxList.forEach((box) => {
        if (box.posZ == 1){
            coordCanv1.drawBox(box.posX, box.posY, box.color);
        }
        if (box.posY == 1){
            coordCanv2.drawBox(box.posX, box.posZ, box.color);
        }
    });

    coordCanv1.drawGrid(false);
    coordCanv1.drawFrame();
    coordCanv2.drawGrid(false);
    coordCanv2.drawFrame();
}

function createOrders() {
    let ordersToShow = 10;

    let div = document.getElementById('orders-div');
    for (let i = 0; i < ordersToShow ; i++) {

        let ordersDiv = document.createElement("div")
        ordersDiv.setAttribute("class", "orderDiv");
        div.appendChild(ordersDiv);
    }
}


