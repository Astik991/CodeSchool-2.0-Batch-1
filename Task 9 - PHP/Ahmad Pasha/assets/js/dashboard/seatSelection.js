let selectedSeats = {};
let movieId = localStorage.getItem("movie_id");
let cinemaHallId = localStorage.getItem("cenimaHallId");
let showId = localStorage.getItem("selectedShowId");
let userId = localStorage.getItem("user_id");
var ticketPrice;

function viewFun() {
  if (Object.keys(selectedSeats).length == 0) {
    $("#errMsg").text("***Please select at least one seat to book ticket***");
    return;
  } else {
    $("#view").text("Confirm Tickets");
    $("#errMsg").text("");
    $("#view").attr("data-bs-toggle", "modal");
  }
}

function blockSeat(e, value) {
  $(`#${e}`).toggleClass("bg-success");
  if (!(e in selectedSeats)) {
    selectedSeats[e] = value;
  } else {
    delete selectedSeats[e];
  }

  $(".no_of_seats").text(Object.keys(selectedSeats).length);
  $(".total_price").text(ticketPrice * Object.keys(selectedSeats).length);
  let showSeats = "";
  for (let k of Object.values(selectedSeats)) {
    showSeats += " " + k;
  }
  $(".seat_numbers").text(showSeats);
}

function bookNow() {
  if (Object.keys(selectedSeats).length == 0) {
  } else {
    let showId = localStorage.getItem("selectedShowId");
    let cinemaHallId = localStorage.getItem("cenimaHallId");

    $.ajax({
      method: "POST",
      url: "../api/availableSeats.php",
      data: {
        selectedSeats,
        showId,
        cinemaHallId,
        movieId,
      },
      success: function (response) {},
      error: function (response) {},
    });

    $.ajax({
      method: "POST",
      url: "../api/bookings.php",
      data: {
        selectedSeats,
        showId,
        cinemaHallId,
        movieId,
        userId,
      },
      success: function (response) {},
      error: function (response) {},
    });

    alert("Successfully Booked");
    window.location.reload(true);
  }
}
$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: `../api/getHall.php?cinema_hall_id=${cinemaHallId}`,
    success: function (response) {
      let data = JSON.parse(response).data;
      ticketPrice = data[0].price;
      $(".price").text(data[0].price);
    },
    error: function (response) {},
  });

  $.ajax({
    method: "GET",
    url: `../api/availableSeats.php?movie_id=${movieId}&cinema_hall_id=${cinemaHallId}&show_id=${showId}`,
    success: function (response) {
      let data = JSON.parse(response);
      let num = 1;
      for (let i of data) {
        let isBooked = i.status == 1;
        let bgColor = isBooked ? "bg-danger" : "bg-secondary";
        let buttonDisable = isBooked ? "disabled" : "";

        let seat = `
            <button value="${i.seat_number}" id="${i.id}" onclick="blockSeat(${i.id},'${i.seat_number}')" class="${bgColor} col-2 m-0 p-0 py-2 rounded-3 shadow-lg mb-2 fw-medium border-4 border-secondary" ${buttonDisable}>
            ${num}
            </button>`;

        $(".seats").append(seat);

        num += 1;
      }
    },
    error: function (response) {},
  });
});
