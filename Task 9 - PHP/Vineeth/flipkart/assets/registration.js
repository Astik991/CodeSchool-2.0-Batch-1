function Name() {
    const Name = $('#name').val();
    if (Name === '') {
      $('#name-error').html('Please enter the  name');
      return false;
    } else if (Name.length < 3 || Name.length > 50) {
      $('#name-error').html(' Name must be between 2 and 50 characters.');
      return false;
    } else if (!/^[A-Z][a-z]{1,49}$/.test(Name)) {
      $('#name-error').html('First letter must should be capital only.');
      return false;
    } else {
      $('#name-error').hide();
      return true;
    }
  }
  
  function isValidEmail() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const email = $('#email').val();
      if (email === '') {
        $('#emailHelp').html('Please enter the email address');
        return false;
      } else if (!emailRegex.test(email)) {
        $('#emailHelp').html('Please enter a valid email');
        return false;
      } else {
        $('#emailHelp').hide();
        return true;
      }
  }
  
  function validatePhone() {
      const phone = $('#phone').val();
      const phoneError = $('#Phone-error');
      if (phone === '') {
        phoneError.text('Please enter the number');
        return false;
      } else if (phone.length != 10 ) {
        phoneError.text('Phone number must be a 10-digit number.');
        return false;
      } else if (/\s/.test(phone)) {
        phoneError.text('Phone number cannot contain spaces.');
        return false;
      } else {
        phoneError.hide();
        return true;
      }
  }
  
  function validatePassword() {
      const password = $('#password').val();
      const passwordError = $('#password-error');
  
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,25}$/;
      if (password === '') {
        passwordError.text('Please enter password');
        return false;
      } else if (password.length < 5 || password.length > 25) {
        passwordError.text('Password must be between 5 and 25 characters.');
        return false;
      } else if (!passwordRegex.test(password)) {
        passwordError.text('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return false;
      } else if (/\s/.test(password)) {
        passwordError.text('Password cannot contain spaces.');
        return false;
      } else {
        passwordError.hide();
        return true;
      }
    }
  
    function validateConfirmedPassword() {
      const confirmedPassword = $('#password2').val();
      const confirmedPasswordError = $('#confirm-error');
      const password = $('#password').val();
  
      if (confirmedPassword == '') {
        confirmedPasswordError.text('Please enter the confirm password');
        return false;
      } else if (confirmedPassword !== password) {
        confirmedPasswordError.text('Passwords do not match.');
        return false;
      } else {
        confirmedPasswordError.hide();
        return true;
      }
    }
  
  function Signup(){
      event.preventDefault();
      Name();
      isValidEmail();
      validatePhone();
      validatePassword();
      validateConfirmedPassword();
      if(Name() && isValidEmail() &&  validatePhone() && validatePassword() && validateConfirmedPassword()){
          $.ajax({
                method:"POST",
                url:"./../api/registration.php",
                data:{
                  name:$('#name').val(),
                  email:$('#email').val(),
                  phone:$('#phone').val(),
                  password:$('#password').val(),
                },
                success:function(data){
                    if(data.status){
                      window.location.replace("./../Templates/login.html");
                    }
                },
              error:function(error){
              },
          });
      }
  }