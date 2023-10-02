$(document).ready(function() {
    $("#login-button").click(function() {
        var name = $('#name').val();
        var password = $('#password').val();

        $.ajax({
            method: 'POST',
            url: './api/login.php',
            data: {
                name: name,
                password: password,
            },
            dataType: 'json',
            success: function(data) {
                if (data.status) {
                    window.location.replace("./main_page.html");
                } else {
                    $("#name-error").text(data.message);
                }
            },
            error: function(error) {
                console.error(error);
            },
        });
    });
});
