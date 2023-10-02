function selectShow(e, cinemaHallId) {
  localStorage.setItem("selectedShowId", e);
  localStorage.setItem("cenimaHallId", cinemaHallId);
  window.location.assign("../dashboard/seatSelection.html");
}

$(document).ready(function () {
  let movie_id = localStorage.getItem("movie_id");

  $.ajax({
    method: "GET",
    url: "../api/availableTheaters.php?movie_id=" + movie_id,
    success: function (response) {
      let data = JSON.parse(response).data;

      for (let i of data) {
        let times = i.show_times.split(",");
        let showIds = i.ids.split(",");
        let cinemaHallId = i.cenima_hall_id;
        let item = `
                    <div class="border p-3">
                    <p class="fw-medium fs-4"> ${i.name}</p>
                    <div class="d-flex" id="shows${i.name}"></div>
                    <p>Address: ${i.address}</p>     
                    </div>`;
        $("#theatersContainer").append(item);
        let r = 1;
        for (let k in times) {
          let xr = `
                        <button onclick="selectShow(${r},${cinemaHallId})" class="m-3 p-2">${times[k]}</button>
                        `;
          $(`#shows${i.name}`).append(xr);
          r += 1;
        }
      }
    },
    error: function (response) {},
  });
});
