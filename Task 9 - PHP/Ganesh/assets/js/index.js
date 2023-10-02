// On mouseover show cart.
function showCart(prodID){
    $(`#${prodID}`).addClass("show");
}
// On mouseoutt hide cart.
function hideCart(prodID){
    $(`#${prodID}`).removeClass("show");
}

// On Validating the user add to cart.
function addCart(token, product){
    $.ajax({
        method: "GET",
        url: "./api/addProductCart.php",
        data: {
            token,
            product
        },
        success: function(data){
            let jsonData = JSON.parse(data);
            if(jsonData['status']){
                window.localStorage.setItem("cart", jsonData['data'][0]['count']);
                $("#cartCount").text(window.localStorage.getItem("cart"));
            } else {
                window.localStorage.setItem("cart", 0);
                $("#cartCount").text(window.localStorage.getItem("cart"));
            }
        },
        error: function(error){
            // show error and try again.
            console.log(error)
        }
    });
}

// Validate the user right before adding to cart.
function addProductCart(prodID){
    let userToken = window.localStorage.getItem("token");
    if(!userToken){
        // No user log-in 
        window.location.replace("./login.html");
    }
    // If user logged in.
    // Validate User Credentials.
    $.ajax({
        method: "GET",
        url: "./api/auth.php",
        data: {
            userToken,
            prodID
        },
        success: function(data){
            let jsonData = JSON.parse(data);
            if(jsonData['status']){
                addCart(userToken, prodID);
            } else {
                // add alert that they are not allowed.
                alert(jsonData['message']);
                // if user is authenticated but the token is expired.
                // then end session and navigate to login page.
                if(jsonData['end_session']){
                    window.localStorage.removeItem("name");
                    window.localStorage.removeItem("user");
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("cart");
                    window.location.replace("./login.html");
                }
            }
        },
        error: function(error){
            // show error and try again.
            console.log(error);
        }
    });
    
}

// Function to load the feed for user.
function loadFeed(jsonData){
    
    $("#search-results").addClass("row-cols-2 row-cols-md-5");
    $("#search-results").html('');
    // List of feed.
    for (let index in jsonData) {

        let saleprice = Math.round((jsonData[index]['price']) - ((jsonData[index]['price'] * (jsonData[index]['discount']/100))));
        
        let htmlTemplate = `
            <div class="col">
                <div class="card rounded-0 border-0">
                    <img src="${(jsonData[index]['product_image']).slice(1)}" class="card-img-top text-center m-auto p-2" onmouseover="showCart(${jsonData[index]['id']})" onmouseout="hideCart(${jsonData[index]['id']})" alt="..." >       
                    <div class="card-footer border-0 bg-white bg-body-tertiary">
                        <p class="title mb-1 fs-5">${jsonData[index]['name']}</p>
                        <p class="text-danger original-price m-0 fs-5" >&#8377;${saleprice.toLocaleString('en-IN')}</p>
                        <p class="text-secondary m-0"><small> M.R.P &#8377;<s>${jsonData[index]['price'].toLocaleString('en-IN')}</s> (${jsonData[index]['discount']}% OFF)</small></p>
                    </div>
                    <div class="toast-container top-50 start-50 translate-middle" onmouseover="showCart(${jsonData[index]['id']})" onmouseout="hideCart(${jsonData[index]['id']})">
                        <div class="toast border-0 shadow-0" id="${jsonData[index]['id']}">
                            <div class="toast-body">
                                <button class="btn btn-warning movetoCart" id="liveToastBtn" onclick="addProductCart(${jsonData[index]['id']})">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $("#search-results").append(htmlTemplate);
    }

}

// Function to load the categories for user.
function loadCategories(jsonData){

    $("#categoryFilter").html('');
    $("#categoryFilter").html(`<option value="-1">All</option>`);

    // List of categories.
    for (let index in jsonData) {
        
        let htmlTemplate = `
        <option value="${jsonData[index]['id']}">${jsonData[index]['category']}</option>`;

        $("#categoryFilter").append(htmlTemplate);
    }

}

// On no search results.
function displayWarningMessage(message){
    $("#search-results").removeClass("row-cols-2 row-cols-md-5");
    $("#search-results").html('');
    $("#search-results").html(message);
}

// LOAD SERVER ON DOCUMENT READY.
$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "./api/index.php?type=getfeed",
        success: function (data) {
            let jsonData = JSON.parse(data);
            loadCategories(jsonData['data'][1]);
            setTimeout(()=>{    
                loadFeed(jsonData['data'][0]);
            }, 1000);    
        },
        error: function (error) {
            console.log("Server Connection Error!" + error);
        }
    });
    
    let userToken = window.localStorage.getItem("token");
    let username = window.localStorage.getItem("name");
    let userID = window.localStorage.getItem("user");
    if (userToken) {
        $("#showProfile").removeClass("d-none");
        $("#showLogin").addClass("d-none");
        $("#userProfileView").html(username);

        if(userID == 1){
            $("#userOperation").attr("href", "./admin.html");
            $("#userOperation").text('Add Products');
            $("#showCart").addClass("d-none");
        } else {
            $("#userOperation").attr("href", "./orders.html");
            $("#showCart").attr("href", "./cart.html");
        } 
    } 

    if(window.localStorage.getItem("cart")){
        $("#cartCount").text(window.localStorage.getItem("cart"));
    } else {
        window.localStorage.setItem("cart", 0);
        $("#cartCount").text(window.localStorage.getItem("cart"));
    }
});

// On applying the filters and search. 
$("#applySearchFilter").on("submit", ()=>{
    event.preventDefault(); 
    let category =  $("#categoryFilter").val();
    let search = $("#searchInput").val();
    $.ajax({
        method: "POST",
        url: "./api/index.php",
        data: {
            "filter_option": category,
            "search_keyword": search
        },
        success: function (data) {
            let jsonData = JSON.parse(data);
            if(jsonData['status']){
                setTimeout(()=>{
                    loadFeed(jsonData['data'][0]);
                }, 1000); 
            } else {
                displayWarningMessage(jsonData['message']);
            }
               
        },
        error: function (error) {
            console.log("Server Connection Error!" + error);
        }
    });
});

// On User Logout.
$("#removeCredentials").click( function () {

    let userToken = window.localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "./api/logout.php",
        data: {userToken},
        success: function (data){
            // console.log(data)
            let jsonData = JSON.parse(data);
            if(jsonData['status']){
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("name");
                window.localStorage.removeItem("user");
                if(window.localStorage.getItem("token")){
                    console.log("Unable to logout. Please try again.");
                }
                $("#removeCredentials").attr("href", "./login.html");
                $("#showProfile").addClass("d-none");
                $("#showLogin").removeClass("d-none");
                $("#showCart").attr("href", "./login.html")
            } else {
                console.log("Unable to logout!");
            }
        },
        error: function (error){
            console.log(error);
        }
    });

   
});