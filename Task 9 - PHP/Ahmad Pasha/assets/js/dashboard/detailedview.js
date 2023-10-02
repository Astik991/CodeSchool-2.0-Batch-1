let movie_id = localStorage.getItem("movie_id");

function getTheatersList() {
  window.location.assign("../dashboard/availabel_theaters.html");
}

$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "../api/movieDetails.php?id=" + movie_id,
    success: (response) => {
      let data = JSON.parse(response);
      let details = data.data;
      let movieItem = `
            <div class="p-5 row m-0 p-0 " style=" background-image: url(${details.image_url}); max-height: 70vh;  background-repeat: no-repeat; background-size: cover;">
            <div class="col-8 row m-auto gap-5">
            <div class="col-lg-7 col-12">
            <img src=${details.image_url} class="w-75 h-75 rounded-4">
            </div>
            <div class="col-lg-4 col-12 text-white shadow-lg bg-dark h-75 p-5 rounded-5">
            <h1 class="fw-bold">${details.name}</h1>
            <p class="fw-medium">${details.duration}</p>
            <p class="fw-medium">${details.language}</p>
            <p class="fw-medium">${details.release_date}</p>
            <button onclick="getTheatersList()" class="book_button">Book Ticket</button>
            </div>
        
            </div>
            </div>
            <div class="col-10 m-auto">
            <p class="fw-bold fs-3">About Movie</p>
            <p>${details.description}</p>
            <hr>
        </div>`;
      $("#detailedViewContainer").html(movieItem);
    },
  });
});
