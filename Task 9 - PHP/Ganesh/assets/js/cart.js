// On click remove from cart.
function removeProductCart(prodID){

    let token = window.localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "./api/cart.php",
        data: {
            prodID, 
            token
        },
        success: function(data){
            let jsonData = JSON.parse(data);
            
            if(jsonData['status']){

                window.localStorage.setItem("cart", jsonData['count']['0']['count']);

                if(!jsonData['data'].length){
                    $("#cartBody").html('');
                    $("#cartBody").html(`
                        <div class="d-flex justify-content-center align-items-center" id="emptyCart">
                            <img src="./assets/images/empty_cart.png" width="580" height="480" alt="">
                        </div>
                    `);
                } else {
                    loadCart(jsonData['data']);
                }
                
            } else {
                console.log(jsonData['message']);
            }

        },
        error: function(error){
            console.log(error);
        }
    })
}

// Load the price details.
function loadPrice(cartPrice){
    
    let quantity = 0;
    let productPrice = 0;
    let productDiscount = 0;
    let finalAmount = 0;
        
    for(let item in cartPrice){

        // quantity = cartPrice[item]['quantity'];

        let discountAmount = Math.round(
            (
                ( cartPrice[item]['quantity'] * cartPrice[item]['price'] ) * 
                ( ( cartPrice[item]['quantity'] * cartPrice[item]['discount'] )  /
                ( cartPrice[item]['quantity'] * 100 ) )
            ));
        let saleprice = Math.round(( cartPrice[item]['quantity'] * cartPrice[item]['price']) - discountAmount);

        productPrice += (cartPrice[item]['quantity'] * cartPrice[item]['price']);
        productDiscount += discountAmount
        finalAmount += saleprice;

        if(cartPrice[item]['quantity'] > 1){ 
            let count = 1;
            quantity += count * cartPrice[item]['quantity'];
        } else {
            quantity++;
        }

    }

    $("#itemQuantity").html(quantity);
    $("#itemQuantity").val(quantity);

    $("#productsPrice").html(`${(productPrice).toLocaleString('en-IN')}`);
    $("#productsPrice").val(productPrice);

    $("#productsDiscount").html((productDiscount).toLocaleString('en-IN'));
    $("#productsDiscount").val(productDiscount);

    $("#productsFinalAmount").html(`${(finalAmount).toLocaleString('en-IN')}`);
    $("#productsFinalAmount").val(finalAmount);

    $("#saveAmount").html(`${(productDiscount).toLocaleString('en-IN')}`);

}

// function to update cart.
function updateCart(prodID, quantity){

    let token = window.localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "./api/updateCart.php",
        data: {
            token,
            prodID,
            quantity
        },
        success: function(data){
            let jsonData = JSON.parse(data);
            if(jsonData['status']){
                getCartDetails();
            }
        },
        error: function(error){
            console.log(error);
        }
    });

}


// Function to increase product quantity.
function increaseQuantity(prodID){
    let quantity = $(`#productQuantity${prodID}`).val();
    if(quantity > 0 && quantity < 10){
        quantity++;
    }
    $(`#productQuantity${prodID}`).val(quantity);
    updateCart(prodID, quantity);
    
}
// Function to decrease product quantity.
function decreaseQuantity(prodID){
    let quantity = $(`#productQuantity${prodID}`).val();
    if(quantity > 1 && quantity < 11){
        quantity--;
    } 
    $(`#productQuantity${prodID}`).val(quantity);
    updateCart(prodID, quantity);
}

// Function to load the cart details.
function loadCart(cartDetails){

    $("#cartList").html(''); 

    for(let item in cartDetails){

        let discountAmount = Math.round(
        (
            ( cartDetails[item]['quantity'] * cartDetails[item]['price'] ) * 
            ( ( cartDetails[item]['quantity'] * cartDetails[item]['discount'] )  /
            ( cartDetails[item]['quantity'] * 100 ) )
        ));
        let saleprice = Math.round(( cartDetails[item]['quantity'] * cartDetails[item]['price']) - discountAmount);

        let cartProducts = `
        <div class="card text-start p-2 pe-3 mb-3 mx-4 rounded border">
            <div class="row">
                <div class="col-4 p-0 ps-2">
                    <img class="card-img-top text-center m-auto "
                        src="${(cartDetails[item]['product_image']).slice(1)}" />
                </div>
                <div class="card-body col-4">
                    <p class="title mb-1 fs-5">${cartDetails[item]['name']}</p>
                    <p class="text-danger original-price m-0 fs-5">&#8377;${saleprice.toLocaleString('en-IN')}</p>
                    <p class="text-secondary mb-4">
                        <small> M.R.P &#8377;<s>${(cartDetails[item]['quantity'] * cartDetails[item]['price']).toLocaleString('en-IN')}</s> (${cartDetails[item]['discount']}% OFF)</small>
                    </p>
                    <div class="d-inline-flex">
                        <button type="button" class="quantity-toggle" onclick="decreaseQuantity(${cartDetails[item]['product_id']})">-</button>
                        <input type="number" class="form-control form-control-sm" min="1" max="10" value="${cartDetails[item]['quantity']}" id="productQuantity${cartDetails[item]['product_id']}" style="width:30px;
                        height:20px;">
                        <button type="button" class="quantity-toggle" onclick="increaseQuantity(${cartDetails[item]['product_id']})">+</button>
                    </div>
                    <button class="btn credential-navigation-btn float-end" onclick="removeProductCart(${cartDetails[item]['product_id']})" value="${cartDetails[item]['product_id']}">Remove</button>
                </div>
            </div>
        </div>
        `;
        
        $("#cartList").append(cartProducts);  

    }

    loadPrice(cartDetails);
    
}

// Function to place order.
function placeOrder(){

    let token = window.localStorage.getItem("token");
    
    $.ajax({
        method: "POST",
        url: "./api/placeOrder.php",
        data: {
            'token': token, 
            'price': $("#productsPrice").val(),
            'discount': $("#productsDiscount").val(),
            'final_amount': $("#productsFinalAmount").val()
        },
        success: function(data){
            let jsonData = JSON.parse(data);
            
            if(jsonData['status']){
                $("#cartBody").html("");
                $("#cartBody").html(`
                <div class="bg-body-secondary d-flex align-item-center justify-content-center">
                    <div class="toast-container p-3">
                        <div class="toast fade bg-white show" style="width:400px;">
                            <div class="toast-header">
                                <strong class="me-auto">Order ID: <span id="orderNum">${jsonData['data']}</span></strong>
                            </div>
                            <div class="toast-body">
                                <div class="d-flex justify-content-center">
                                    <img src="./assets/images/order_success.png" class="rounded m-4 " alt="...">  
                                </div>
                                <h5 class="text-center">${window.localStorage.getItem("name")}</h5>
                                <h4 class="text-center">Your Order is Confirmed.</h4> 
                                <div class=" d-flex justify-content-center">
                                    <a class="btn btn-warning m-4" href="./index.html">Continue Shopping</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `);
                window.localStorage.setItem("cart", jsonData['count']);
            } else {
                console.log(jsonData['message']);
            }
        },
        error: function(error){
            console.log(error);
        }
    });
    
}


// Function to get the cart details.
function getCartDetails(){

    let token = window.localStorage.getItem("token");

    // Get the cart details.
    $.ajax({
        method: "GET",
        url: "./api/cart.php",
        data: {token},
        success: function (data) {
                
            let htmlTemplate = `
            <div class="row">
                <!-- Shopping Cart -->
                <div class="col-8 bg-white py-3 mx-2 ms-5">
                    <h3>Shopping Cart</h3>
                    <hr class="mb-4">
                    <!-- Cart Contents -->
                    <div class="text-start p-2 pe-3 mb-3 mx-4" id="cartList">

                    </div>
                    <!-- Place Order -->
                    <hr class="mt-4">
                    <button class="btn credential-navigation-btn float-end px-3 me-4" onclick="placeOrder()" type="submit">PLACE ORDER</button>
                </div>
                <!-- Order Details -->
                <div class="col-3 bg-white border-start me-4 ms-2 py-3">
                    <h5 class="text-secondary">PRICE DETAILS</h5>
                    <hr>
                    <h6 class="mb-3 text-secondary">Price ( <span id="itemQuantity">1</span> item ) <p class="d-inline float-end me-2 mb-0" id="productsPrice">40,000</p></h6>
                    <h6 class="mb-3 text-secondary">Discount <p class="d-inline float-end me-2 mb-0 text-success">-<span id="productsDiscount">7,600</span></p></h6>
                    <h5 class="mb-3 fs-5 border-top border-bottom py-3">Final Amount <p class="d-inline float-end me-2 mb-0" id="productsFinalAmount">32,400</p></h5>
                    <p class="d-inline me-2 mb-0 text-success fs-5">You will save <span id="saveAmount">7,600</span> on this order</p>
                </div>
            </div>
            `;

            let jsonData = JSON.parse(data);
            
            if(jsonData['status']){
                $("#cartBody").html(htmlTemplate);
                loadCart(jsonData['data']);
            } else {
                $("#cartBody").html('');
                $("#cartBody").html(`
                    <div class="d-flex justify-content-center align-items-center" id="emptyCart">
                        <img src="./assets/images/empty_cart.png" width="580" height="480" alt="">
                    </div>
                `);
                window.localStorage.removeItem("cart");
            }
  
        },
        error: function (error) {
            console.log("Server Connection Error!" + error);
        }
    });
}

// LOAD SERVER ON DOCUMENT READY.
$(document).ready(function () {

    getCartDetails();

});