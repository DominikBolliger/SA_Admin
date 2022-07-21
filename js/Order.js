class Order {
    constructor(id, date) {
        this.orderId = id;
        this.date = date;
    }

    static createOrders(orders) {
        orders.forEach((object) =>{
            let order = new Order(object.order_id, object.date);
            orderList.push(order);
        });
        let div = document.getElementById('orders-div');
        for (let i = 0; i < orderList.length ; i++) {
            let ordersDiv = document.createElement("div");
            ordersDiv.setAttribute("class", "orderDiv");
            ordersDiv.addEventListener('click', function (){
                if(!isRunning) {
                    boxes = getRestData("http://rest.sa/getBoxes.php?limit=" + orderList[i].orderId)
                    boxList = Box.createBoxes(boxes);
                    craneHead.resetCraneHeadToStart();
                    craneHeadTop.resetCraneHeadToStart();
                    run();
                }
            });
            div.appendChild(ordersDiv);
            ordersDiv.innerHTML += "Order Numer: " + orderList[i].orderId + "<br>" + orderList[i].date;
        }
    }
}