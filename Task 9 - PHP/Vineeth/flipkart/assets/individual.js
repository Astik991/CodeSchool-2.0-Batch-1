var urlParams = new URLSearchParams(window.location.search);
$(document).ready(function(){
    var price = urlParams.get("price");
    var pname = urlParams.get("pname");
    var image_path = urlParams.get("image");
    var desc = urlParams.get("desc");
    var rate=urlParams.get('rate')
    
    $('#image').attr("src",image_path);
    $('#product-name').html("<h4>"+pname+"</h4>");
    $('#rating').html("<h6>"+rate+"</h6>")
    $('#price').html("<h2>"+price+"</h2>")
    $("#desc").text(desc)
});
var id=urlParams.get("id1")
var user_id=window.localStorage.getItem('id')

function cart(){
    var id=urlParams.get('id1');
    $.ajax({
        method:"POST",
        url:'./../api/cart.php',
        data:{
            id,
            user_id,
        },
        success:function(data){
            data=JSON.parse(data)
            if(data.data){
                window.location.href= './../Templates/cartitems.html?id='+id;
            }
        }
    });
    
}
