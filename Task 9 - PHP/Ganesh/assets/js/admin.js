// Validate product name.
function validateProductName(name, feedback) {
    // On Key Down Remove Invalid Class.
    name.on("keydown", function () {
        name.removeClass("is-invalid");
    });
    // Validating Conditions.
    if (name.val() == '') {
        name.removeClass("is-valid");
        name.addClass("is-invalid");
        feedback.text("Add the product name !");
        return false;
    }
    else if (((name.val()).length < 2 || (name.val()).length > 100)) {
        name.removeClass("is-valid");
        name.addClass("is-invalid");
        feedback.text("Product name should be valid length !");
        return false;
    }
    else {
        name.removeClass("is-invalid");
        return true;
    }
}

// Validate price.
function validateProductPrice(price, feedback) {
    // On Key Down Remove Invalid Class.
    price.on("keydown", function () {
        price.removeClass("is-invalid");
    });
    // Validating Conditions.
    if (price.val() == '') {
        price.removeClass("is-valid");
        price.addClass("is-invalid");
        feedback.text("Add the product price !");
        return false;
    }
    else if (!((price.val()).match(/[0-9.]/))) {
        price.removeClass("is-valid");
        price.addClass("is-invalid");
        feedback.text("Only numbers and . is allowed !");
        return false;
    }
    else {
        price.removeClass("is-invalid");
        return true;
    }
}

// Validate Discount
function validateProductDiscount(discount, feedback) {
    // On Key Down Remove Invalid Class.
    discount.on("keydown", function () {
        discount.removeClass("is-invalid");
    });
    // Validating Conditions.
    if (discount.val() == '') {
        discount.removeClass("is-valid");
        discount.addClass("is-invalid");
        feedback.text("Add the product  !");
        return false;
    }
    else if (!((discount.val()).match(/[0-9.]/))) {
        discount.removeClass("is-valid");
        discount.addClass("is-invalid");
        feedback.text("Only numbers and . is allowed !");
        return false;
    }
    else if (((discount.val()) < 0 || (discount.val()) > 100)) {
        discount.removeClass("is-valid");
        discount.addClass("is-invalid");
        feedback.text("Discount should be in percentage 1 - 100 !");
        return false;
    }
    else {
        discount.removeClass("is-invalid");
        return true;
    }
}

// Validate Category
function validateSelectInput(option, feedback) {
    // On Change Remove Invalid Class.
    option.on("change", function () {
        option.removeClass("is-invalid");
    });
    // Validating Conditions.
    if (option.val() == null) {
        option.removeClass("is-valid");
        option.addClass("is-invalid");
        feedback.text("Select the Category !");
        return false;
    } else {
        option.removeClass("is-invalid");
        return true;
    }
}

// Validate Product Image.
function validateFile(img, feedback) {
    // On Change Remove Invalid Class.
    img.on("change", function () {
        img.removeClass("is-invalid");
    });
    // Validation Condition.
    if (!(img[0].files[0])) {
        img.removeClass("is-valid");
        img.addClass("is-invalid");
        feedback.text("Add an image !");
        return false;
    } else {
        img.removeClass("is-invalid");
        return true;
    }
}

// On Submit validate the product.
$('#addProduct').on("submit", function (event) {

    event.preventDefault();

    let name = validateProductName($("#productName"), $("#productNameFeedback"));
    let price = validateProductPrice($("#productPrice"), $("#productPriceFeedback"));
    let discount = validateProductDiscount($("#productDiscount"), $("#productDiscountFeedback"));
    let category = validateSelectInput($("#productCategory"), $("#productCategoryFeedback"));
    let image = validateFile($("#productImage"), $("#productImageFeedback"));

    if (name && price && discount && category && image) {

        let productData = new FormData();

        productData.append('product_name', $("#productName").val());
        productData.append('image', $('#productImage')[0].files[0]);
        productData.append('price', $("#productPrice").val());
        productData.append('discount', $("#productDiscount").val())
        productData.append('category', $("#productCategory").val())

        $.ajax({
            method: "POST",
            url: "./api/admin.php",
            data: productData,
            contentType: false,
            processData: false,
            success: function (data) {
                // console.log(data);
                // setTimeout(()=>{
                //     location.reload();
                // }, 3000);
                let jsonData = JSON.parse(data);
                if(jsonData["status"]){
                    $("#serverMessage").removeClass("d-none bg-success border-success text-success");
                    $("#serverMessage").addClass("bg-danger border-danger text-danger");
                    $("#serverMessage").text(jsonData["message"]);
                    setTimeout(()=>{
                        location.reload();
                    }, 2000);
                } else {
                    $("#serverMessage").removeClass("d-none bg-success border-success text-success");
                    $("#serverMessage").addClass("bg-danger border-danger text-danger");
                    $("#serverMessage").text(jsonData["message"]);
                    setTimeout(()=>{
                        location.reload();
                    }, 2000);
                }
            },
            error: function (error) {
                console.log(error);
            },
            
            
        });

    }
});

$(document).ready(function () {  
    let userToken = window.localStorage.getItem("token");
    let user = window.localStorage.getItem("name");
    if (userToken) {
        $("#userProfileView").html(user);
    } 
});

// On User Logout.
$("#removeCredentials").click( function () {

    let userToken = window.localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "./api/logout.php",
        data: {userToken},
        success: function (data){
            let jsonData = JSON.parse(data);
            if(jsonData['status']){
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("name");
                window.localStorage.removeItem("user");
                if(window.localStorage.getItem("token")){
                    console.log("Unable to logout. Please try again.");
                }
                $("#removeCredentials").attr("href", "./login.html");
                window.location.replace("./login.html");
            } else {
                console.log("Unable to logout!");
            }
        },
        error: function (error){
            console.log(error);
        }
    });

   
});