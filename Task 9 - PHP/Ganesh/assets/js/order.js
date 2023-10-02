// Load number of products for each order.
function loadProducts(order_id){

    let token = window.localStorage.getItem("token");

    let htmlTemplate;
     
    $.ajax({
        method: "GET",
        url: "./api/order.php",
        data: {
            order_id,
            token
        },
        success: function(data){

            let jsonData = JSON.parse(data);
            
            if(jsonData['status']){

                let products = jsonData['data'];

                for(let item in products){

                    let saleprice = Math.round((products[item]['product_price']) - ((products[item]['product_price'] * (products[item]['product_discount']/100))));

                    htmlTemplate = `
                    <div class="row mx-3 mb-3">
                        <div class="col-4 p-0 ps-2">
                            <img class="card-img-top text-center m-auto "
                                src="${(products[item]['product_image']).slice(1)}">
                        </div>
                        <div class="col-8">
                            <p class="title mb-1 fs-5" id="productName">${products[item]['product_name']}</p>
                            <p class="text-danger original-price m-0 fs-5" id="productSalePrice">&#8377;${saleprice.toLocaleString('en-IN')}</p>
                            <p class="text-secondary">
                                <small> M.R.P &#8377;<s id="productPrice">${(products[item]['product_price']).toLocaleString('en-IN')}</s> (<span id="productDiscount">${products[item]['product_discount']}</span>% OFF)</small>
                            </p>
                            <p class="text-secondary mb-4">
                                Quantity: <span id="productQuantity">${products[item]['product_quantity']}</span>
                            </p>
                        </div>
                    </div>
                    `;

                    $(`#productList${products[item]['order_id']}`).append(htmlTemplate);
                }

            } else { 
                console.log(jsonData['data']);
            } 
        },
        error: function(error){
            console.log(error);
        }
    });
}

// Load number of orders.
function loadOrders(orders){

    $("#ordersContainer").append("")

    let date;
    let monthNames;
    let day;
    let monthIndex;
    let year;
    let formattedDate;
    let htmlTemplate;

    for(let item in orders){

        date = new Date(orders[item]['order_date']);

        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        day = date.getDate();
        monthIndex = date.getMonth();
        year = date.getFullYear();

        formattedDate = day + " " + monthNames[monthIndex] + " " + year;

        htmlTemplate = `
            <div class="card mx-5 mb-5">
                <div class="card-header">
                    <small>
                        <ul class="nav">
                            <li class="nav-item me-3 text-center">
                                <p class="m-0">ORDER PLACED</p>
                                <p class="m-0" id="orderDate">${formattedDate}</p>
                            </li>
                            <li class="nav-item me-3 text-center">
                                <p class="m-0">TOTAL</p>
                                <p class="m-0" id="totalPrice">&#8377;${(orders[item]['total_price']).toLocaleString('en-IN')}</p>
                            </li>
                            <li class="nav-item text-center">
                                <p class="m-0">SHIP TO</p>
                                <p class="m-0" id="orderBy">${orders[item]['user_name']}</p>
                            </li>
                        </ul>
                    </small>
                </div>
                <div class="card-body p-0">
                    <div class="p-2">
                        <h5 class="card-title ms-2 mt-2 text-success">Successful Order</h5>
                        <p class="card-text ms-2">
                            Order ID: <span id="orderID">${orders[item]['order_id']}</span>
                        </p>
                        <hr>
                        <div id="productList${orders[item]['order_id']}">

                        </div>
                    </div>
                </div>
            </div>
        `;

        $("#ordersContainer").append(htmlTemplate);
        loadProducts(orders[item]['order_id']);

    }

}

// LOAD SERVER ON DOCUMENT READY.
$(document).ready(function () {

    let token = window.localStorage.getItem("token");

    // Get the cart details.
    $.ajax({
        method: "GET",
        url: "./api/order.php",
        data: {token},
        success: function (data) {

            let jsonData = JSON.parse(data);
            
            if(jsonData['status']){
                loadOrders(jsonData['data']);
            } else {
                $("#ordersContainer").html('');
                $("#ordersContainer").html(`
                <div class="bg-body-secondary d-flex align-item-center justify-content-center">
                    <div class="toast-container p-3">
                        <div class="toast fade bg-white show" style="width:400px;">
                            <div class="toast-body">
                                <div class="d-flex justify-content-center">
                                    <img src="./assets/images/no_order.jpg" class="rounded m-4 " alt="...">  
                                </div>
                                <h5 class="text-center">${window.localStorage.getItem("name")}</h5>
                                <h4 class="text-center">No Orders yet.</h4> 
                                <div class=" d-flex justify-content-center">
                                    <a class="btn btn-warning m-4" href="./index.html">Start Shopping</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
               
            }
  
        },
        error: function (error) {
            console.log("Server Connection Error!" + error);
        }
    });

});