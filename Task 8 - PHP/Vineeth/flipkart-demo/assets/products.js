$(document).ready(function() {
  $.ajax({
    url: "https://fakestoreapi.com/products/",
    method: "GET",
    success: function(products) {
      var productListDiv = $("#productList");
      var productHTML = '';
      for (var i = 0; i < products.length; i++) {
        var product = products[i];
        productHTML += `
          <div class="mt-4"> 
            <div class="card" style="width: 14rem; height:23rem;">
              <div class="text-end mt-2 pe-2"><i class="bi bi-heart"></i></div>
              <img src="${product.image}"  class="m-auto mt-4 mb-4 card-img-center" alt="..." style="width:50%;height:40%;background-color:#f1f1f1;">
              <div class="card-body text-align-bottom" style="background-color:#f1f1f1">
                <div><h6 class="card-title" >${product.title.slice(0,40)+"...."}</h6></div>
                <div class='d-flex gap-5'>
                  <p>RS ${product.price}</p>
                  <p class='d-flex gap-1'><i class="bi bi-star-fill" style='color:#FFD700;'></i>${product.rating.rate}</p>
                </div>
                <div><button class=" pt-1 pb-1 bg-primary border-0 rounded" onclick="addToCart('${product.image}', '${product.title}', ${product.price}, ${product.rating.rate})" style="color:white"> <i class="bi bi-cart"></i> ADD </button></div>
              </div>
            </div>
          </div>`;
      }
      var offcanvasContent = `
          <div class="offcanvas-body">
            <div id="cartItems">
              <!-- Cart items will be added here -->
            </div>
            <hr>
            <div id="cartTotal">Total: RS 0</div>
          </div>
        `;

      $("#offcanvasScrolling .offcanvas-body").html(offcanvasContent);
      productListDiv.html(productHTML);
    },
    error:function(error) {
      console.log("Error:", error);
    },
  });
});

var totalAmount = 0;

function addToCart(image, title, price, rating) {
  totalAmount += price;
  
  var cartContent = `
    <div class="d-flex align-items-center mt-2">
      <img src="${image}" alt="Product Image" style="width: 50px; height: 50px;">
      <div class="ms-2">
        <p class="mb-0">${title}</p>
        <p class="mb-0">RS ${price}</p>
      </div>
      <button class="btn btn-sm btn-danger ms-auto" onclick="removeFromCart(${price})">Delete</button>
    </div>
  `;

  $("#cartItems").append(cartContent);
  
  updateCartTotal();
}

function updateCartTotal() {
  var roundedTotal = totalAmount.toFixed(2);
  $("#cartTotal").text(`Total: RS ${roundedTotal}`);
}

function removeFromCart(price) {
  totalAmount -= price;
  updateCartTotal();
  $(event.target).closest(".d-flex.align-items-center").remove();
}
