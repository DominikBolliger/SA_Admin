window.onload = function () {
    drawCoordSystem();
}

function drawCoordSystem(){
    let request = new XMLHttpRequest();
    let boxList = [];
    let pos = [];

    let canv1 = document.getElementById("canvas1");
    let divCanv1 = document.getElementById("canvas1Div")
    let contextCanv1 = canv1.getContext("2d");
    let coordCanv1 = new xyCoordinateSystem(canv1, contextCanv1, divCanv1);

    let canv2 = document.getElementById("canvas2");
    let divCanv2 = document.getElementById("canvas2Div")
    let contextCanv2 = canv2.getContext("2d");
    let coordCanv2 = new xyCoordinateSystem(canv2, contextCanv2, divCanv2);


    coordCanv1.drawGrid();

    coordCanv2.drawGrid();


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
        let box = new Box(object.box_id, object.box_pos_x, object.box_pos_y, object.box_pos_z, object.fk_box_type_id)
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
}


