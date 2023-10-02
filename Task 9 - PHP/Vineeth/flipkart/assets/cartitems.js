amount=0
var id=window.localStorage.getItem('id');
$("document").ready(function(){
    $.ajax({
        method:'POST',
        url:"./../api/cartitems.php",
        data:{
            id,
        },
        success:function(data){
            data=JSON.parse(data)
            result=""
            data.forEach(function(a){
                amount=amount+parseFloat(a.total)
                result +=
                `
                  <div class="col-12 p-2 mb-2 d-flex border">
                        <div class="image col-lg-2" style="height:120px;width:100px" >
                          <img src="${a.image}" style="object-fit: cover;" class="col-10">
                        </div>
                        <div class="col-lg-8">
                            <div><h6>${a.productname}</h6></div>
                            <div><h4><i class="bi bi-currency-rupee"></i><span>${a.price}</span></h4></div>
                            <div class="input-group mb-3" style="max-width: 120px;">
                            <div class="input-group-prepend">
                              <button class="btn btn-outline-secondary" type="button" id="decrementBtn">-</button>
                            </div>
                            <input type="text" class="form-control text-center" value="${a.quantity}"  aria-label="Quantity" aria-describedby="basic-addon1" id="quantityInput">
                            <div class="input-group-append">
                              <button class="btn btn-outline-secondary" type="button" id="incrementBtn">+</button>
                            </div>
                            </div>
                            <div type="button" onclick="remove(${a.id})"><b>REMOVE</b></div>
                        </div>
                  </div>
                `
            })
            $('.cartitem').html(result)
            $('#amount').text(amount.toFixed(2))
        }
    })
})
function order(){
    $.ajax({
        method:"POST",
        url:"./../api/Placed_order.php",
        data:{
           amount,
        },
        success:function(data){
            data=JSON.parse(data);
            if(data.status==true){
              window.location.href = './../Templates/order_details.html';
            }
        },

    });
}
function remove(id) {
    $.ajax({
        method: "POST",
        url: './../api/changes_in_cart.php',
        data: {
            id: id
        },
        success: function (data) {
            data=JSON.parse(data)
        }
    });
    window.location.replace ('./../Templates/cartitems.html');

}
