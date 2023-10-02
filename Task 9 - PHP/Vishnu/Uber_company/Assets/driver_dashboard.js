$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "./../api/userInterface.php",
    success: function (data) {
      const response = JSON.parse(data);
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
      $row.append(`<td>${each.location}</td>`);
      $row.append(`<td>${each.destination}</td>`);
      $row.append(`<td>${each.start_date}</td>`);
      $row.append(`<td>${each.end_date}</td>`);
      $row.append(`<td>${each.status}</td>`);
      $tbody.append($row);
    });
  }

  $.ajax({
    method: "GET",
    url: "./../api/driverInterface.php",
    success: function (data) {
      const response = JSON.parse(data);
      if (!response.status) {
        $("#trip-form-error").text(response.message);
      } else {
        getUserTripsData(response.data);
      }
    },
    error: function (error) {
      $("#login-form-error").text(error.responseText);
    },
  });

  $("#ride-accept-id").on("click", function () {
    $.ajax({
      method: "POST",
      url: "./../api/driverInterface.php",
      data: {
        tripStatusId: 2,
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

  $("#ride-decline-id").on("click", function () {
    $.ajax({
      method: "POST",
      url: "./../api/driverInterface.php",
      data: {
        tripStatusId: 3,
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

  $("#ride-completed-id").on("click", function () {
    $.ajax({
      method: "POST",
      url: "./../api/driverInterface.php",
      data: {
        tripStatusId: 4,
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
