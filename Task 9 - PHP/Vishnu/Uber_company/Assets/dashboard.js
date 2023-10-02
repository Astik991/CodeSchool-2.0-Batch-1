$(document).ready(function () {
  function validatePincodeInput(element) {
    element.on("keypress", function (event) {
      const keyValue = event.key;
      if (
        !(
          keyValue.charCodeAt(0) >= 48 &&
          keyValue.charCodeAt(0) <= 57 &&
          keyValue !== undefined
        )
      ) {
        event.preventDefault();
      }
    });
  }

  validatePincodeInput($("#location-pincode"));
  validatePincodeInput($("#destination-pincode"));

  function pincodeValidation(element) {
    element.on("input", function (event) {
      const userAddressPincode = element.val();
      if (userAddressPincode.length === 0 || userAddressPincode.length < 6) {
        $("#trip-form-error").text("*Pincode length should be 6 digits");
        return false;
      } else {
        $("#trip-form-error").text("");
        return userphoneNumber;
      }
    });
  }

  pincodeValidation($("#location-pincode"));
  pincodeValidation($("#destination-pincode"));

  function validateAddressInput(element) {
    element.on("keypress", function (event) {
      const keyValue = event.key;
      if (!/^[a-zA-Z]*$/.test(keyValue) && keyValue !== "Enter") {
        event.preventDefault();
      }
    });
  }

  validateAddressInput($("#location-state"));
  validateAddressInput($("#destination-state"));
  validateAddressInput($("#location-city"));
  validateAddressInput($("#destination-city"));
  validateAddressInput($("#location-area"));
  validateAddressInput($("#destination-area"));

  function addressValidation(element) {
    element.on("input", function (event) {
      const address = element.val();
      if (address.length < 3 || address.length > 20) {
        $("#trip-form-error").text(
          "*Minimum length between 2 and 21 characters"
        );
        return false;
      } else if (address[0] !== address[0].toUpperCase()) {
        $("#trip-form-error").text("*First letter should be capital");
        return false;
      } else {
        $("#trip-form-error").text("");
        return address;
      }
    });
  }

  addressValidation($("#location-state"));
  addressValidation($("#destination-state"));
  addressValidation($("#location-city"));
  addressValidation($("#destination-city"));
  addressValidation($("#location-area"));
  addressValidation($("#destination-area"));

  function validateGeolocationInput(event, element) {
    const inputValue = element.val();
    if (!/^-?\d+(\.\d{0,6})?$/.test(inputValue)) {
      $("#trip-form-error").text("Invalid geolocation format");
      return false;
    } else {
      $("#trip-form-error").text("");
      return inputValue;
    }
  }

  $("#location-latitude").on("input", function (event) {
    validateGeolocationInput(event, $("#location-latitude"));
  });
  $("#location-longitude").on("input", function (event) {
    validateGeolocationInput(event, $("#location-longitude"));
  });
  $("#destination-latitude").on("input", function (event) {
    validateGeolocationInput(event, $("#destination-latitude"));
  });
  $("#destination-longitude").on("input", function (event) {
    validateGeolocationInput(event, $("#destination-longitude"));
  });

  $.ajax({
    method: "GET",
    url: "./../api/userInterface.php",
    success: function (data) {
      const response = JSON.parse(data);
      console.log(response);
      console.log(response.data);
      if (!response.status) {
        $("#login-form-error").text(response.message);
      } else {
        $("#dashboard-user-id span").text(response.data);
      }
    },
    error: function (error) {
      if (error.status === 500) {
        alert("Session expired. Kindly login again...");
        window.location.href = "./login.html";
      } else {
        $("#login-form-error").text(error.responseText);
      }
    },
  });

  function getUserTripsData(tripsData) {
    const $tbody = $("#data-table tbody");
    $tbody.empty();
    tripsData.forEach(function (each) {
      const $row = $("<tr>");
      $row.append(`<td>${each.id}</td>`);
      $row.append(`<td>${each.name}</td>`);
      $row.append(`<td>${each.driver}</td>`);
      $row.append(`<td>${each.location}</td>`);
      $row.append(`<td>${each.destination}</td>`);
      $row.append(`<td>${each.start_date}</td>`);
      $row.append(`<td>${each.end_date}</td>`);
      $row.append(`<td>${each.status}</td>`);
      $tbody.append($row);
    });
  }

  $("#dasboard-user-trip-id").click(function () {
    $.ajax({
      method: "GET",
      url: "./../api/userTrips.php",
      success: function (data) {
        const response = JSON.parse(data);
        if (!response.status) {
          $("#trip-form-error").text(response.message);
        } else {
          getUserTripsData(response.data);
        }
      },
      error: function (error) {
        if (error.status === 500) {
          alert("Session expired. Kindly login again...");
          window.location.href = "./login.html";
        } else {
          $("#trip-form-error").text(error.responseText);
        }
      },
    });
  });

  $("#trip-form-id").on("submit", function (event) {
    event.preventDefault();
    const location = {
      state: $("#location-state").val(),
      city: $("#location-city").val(),
      area: $("#location-area").val(),
      pincode: $("#location-pincode").val(),
      latitude: $("#location-latitude").val(),
      longitude: $("#location-longitude").val(),
    };
    const destination = {
      state: $("#destination-state").val(),
      city: $("#destination-city").val(),
      area: $("#destination-area").val(),
      pincode: $("#destination-pincode").val(),
      latitude: parseFloat($("#destination-latitude").val()),
      longitude: parseFloat($("#destination-longitude").val()),
    };
    const rideType = $("#user-trip-type-id").val();
    $.ajax({
      method: "POST",
      url: "./../api/addTrip.php",
      data: {
        location,
        destination,
        rideType,
      },
      success: function (data) {
        const response = JSON.parse(data);
        if (!response.status) {
          $("#trip-form-error").text(response.message);
        } else {
          $("#trip-form-error").text("");
          console.log(response);
        }
      },
      error: function (error) {
        if (error.status === 500) {
          alert("Session expired.Kindly login again...");
          window.location.href = "./login.html";
        } else {
          $("#trip-form-error").text(error.responseText);
        }
      },
    });
  });
});
