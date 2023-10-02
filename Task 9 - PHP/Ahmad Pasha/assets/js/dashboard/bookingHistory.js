let userId = localStorage.getItem("user_id");

$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "../api/bookings.php?user_id=" + userId,
    success: function (response) {
      let data = JSON.parse(response).data;
      for (let i of data) {
        let ticket = `
                <div class="col-12 col-lg-4 flex-grow-1 m-auto shadow-lg p-2 row align-items-center">
                    <div class="col-lg-6 col-12">
                        <img src=${i.img} class="object-fit-fill h-75 w-100">
                    </div>
                    <div class="col-lg-6 col-12">
                        <p class="fw-bold fs-5 ticket_heading">${i.mname}</p>
                        <p class="mb-0 p-0"> <span class="ticket_subHeadings fw-medium">Seat Numbers: </span> ${i.seats}</p>
                        <p class="mb-0 p-0"><span class="ticket_subHeadings fw-medium">Show Time:</span>  ${i.start_time}</p>
                        <p class="mb-0 p-0"><span class="ticket_subHeadings fw-medium">Theater Name:</span>  ${i.cname}</p>
                        <p class="mb-0 p-0"><span class="ticket_subHeadings fw-medium">Address: </span> ${i.address}</p>
                    </div>
                </div>`;
        $("#bookingHistory").append(ticket);
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
});
