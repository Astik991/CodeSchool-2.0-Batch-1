$("document").ready(function(){
   showproducts();
});
function individual_product(id, image, desc, pname, price,rating) {
   var queryParams = `?id1=${id}&image=${encodeURIComponent(image)}&desc=${encodeURIComponent(desc)}&pname=${encodeURIComponent(pname)}&price=${encodeURIComponent(price)}&rate=${rating}`;
   window.location.href = './../Templates/indivitual.html' + queryParams;
}
function search(){
   var input=$("#search-products").val();
   var products=$("#productList")
   products.text("")
   $.ajax({
      method:"GET",
      url:"./../api/main.php",
      success:function(response){
         var file=JSON.parse(response);
         var result=''
         var Product_not_found=$("#result")
         file.forEach(function(a){
            var check=a.productname
            check=check.toLowerCase()
            input=input.toLowerCase()
            if(check.includes(input)){
               result +=`             
               <div class="card"  onclick="individual_product('${a.id}','${a.image_url}','${a.description}','${a.productname}','${a.price}','${a.rating}')" style="width: 14rem; height:20rem;">
                  <div class="text-end pe-2"><i class="bi bi-heart"></i></div>
                     <img src="${a.image_url}" id="image" class="m-auto mt-4 mb-4 card-img-center" alt="..." style="width:50%;height:40%;background-color:#f1f1f1;">
                     <div class="card-body text-align-bottom" style="background-color:#f1f1f1">
                        <h6 class="card-title">${a.productname}</h6>
                        <div class='d-flex gap-4'>
                        <p>RS ${a.price}</p>
                        <p class='d-flex gap-1' ><i class="bi bi-star-fill" style='color:#FFD700;'></i><span id="rating">${a.rating}</span></p>
                     </div>
                  </div>
               </div>
             `
            }           
         });
         
         if(result==""){
            Product_not_found.html('<div class=" ">No results are found.....</div>')
            showproducts();
         }
         else{
            Product_not_found.html("");
            products.html(result);
         } 
      },
   });
}

function showproducts(){
   var products=$("#productList")
   $.ajax({
         method:"GET",
         url:"./../api/main.php",
         success:function(response){
            var file=JSON.parse(response);
            var result=''
            file.forEach(function(a){
               result +=`             
               <div class="card " onclick="individual_product('${a.id}','${a.image_url}','${a.description}','${a.productname}','${a.price}','${a.rating}')"  style="width: 14rem; height:20rem;">
                  <div class="text-end pe-2 mt-1"><i class="bi bi-heart"></i></div>
                     <img src="${a.image_url}" id="image" class="m-auto mt-4 mb-4 card-img-center" alt="..." style="width:50%;height:40%;background-color:#f1f1f1;">
                     <div class="card-body text-align-bottom" style="background-color:#f1f1f1">
                        <h6 class="card-title">${a.productname}</h6>
                        <div class='d-flex gap-4'>
                        <p>RS ${a.price}</p>
                        <p class='d-flex gap-1' ><i class="bi bi-star-fill" style='color:"#FFD700";'></i><span id="rating">${a.rating}</span></p>
                     </div>
                  </div>
               </div>
             `
            });
            products.html(result);
         },
   });
}
var categorys = [];

function category() {
    $.ajax({
        method: 'GET',
        url: "./../api/main.php",
        success: function (data) {
            var file = JSON.parse(data);
            var id=0
            var categoryDropdown = document.getElementById("categoryDropdown"); 
            file.forEach(function (a) {
                  if (!categorys.includes(a.category)) {
                        categorys.push(a.category);
                        var li = document.createElement("li");
                        var div = document.createElement("div");
                        div.setAttribute("class", "dropdown-item");
                        div.setAttribute("onclick", "categoryItems("+id+")"); 
                        div.textContent = a.category;
                        li.appendChild(div);
                        categoryDropdown.appendChild(li);
                        id+=1;
                  }
            });
        }
    });
}

function categoryItems(id) {
    var products=$("#productList")
    products.text("")
    $.ajax({
         method:"GET",
         url: "./../api/main.php",
         success:function(data){
            var file=JSON.parse(data);
            var result=''
            file.forEach(function(a){
               if(a.category==categorys[id]){
                  result +=`             
                  <div class="card" onclick="individual_product('${a.id}','${a.image_url}','${a.description}','${a.productname}','${a.price}','${a.rating}')"  style="width: 14rem; height:20rem;">
                     <div class="text-end pe-2 mt-1"><i class="bi bi-heart"></i></div>
                        <img src="${a.image_url}" id="image" class="m-auto mt-4 mb-4 card-img-center" alt="..." style="width:50%;height:40%;background-color:#f1f1f1;">
                        <div class="card-body text-align-bottom" style="background-color:#f1f1f1">
                           <h6 class="card-title">${a.productname}</h6>
                           <div class='d-flex gap-4'>
                           <p>RS ${a.price}</p>
                           <p class='d-flex gap-1' ><i class="bi bi-star-fill" style='color:"#FFD700";'></i><span id="rating">${a.rating}</span></p>
                        </div>
                     </div>
                  </div>
                `
               }
            });
            products.html(result);
         }
    });
}

function cart(){
      window.location.href='./../Templates/cartitems.html'
}

