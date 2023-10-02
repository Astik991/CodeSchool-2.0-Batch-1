function check(){
    var name=$("#name").val()
    var password=$("#password").val()
    $.ajax({
        method:"POST",
        url:"./../api/login.php",
        data:{
            name,
            password
        },
        dataType: 'json',
        success:function(data){
            try{
                data.forEach(function(x){
                    if(x.id){
                        window.localStorage.setItem('id',x.id)
                        window.location.replace('./../Templates/main.html?userid='+x.id)
                    }
                    else
                    {
                        
                    }
                })
            }
            catch (e){
                console.log(data)
                $("#error").text(data.message)

            }

        },
    });
}