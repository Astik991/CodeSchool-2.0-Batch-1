$(document).ready(function () {
  let userId = window.localStorage.getItem("user_id");
  let userType = window.localStorage.getItem("user_type");

  if (!userId) {
    window.location.replace("./login.html");
  }
  if (userType == "admin") {
    window.location.replace("./dashboard/admin.html");
  }
});

let movies_container = $(".movies_container");

function ticketHistory() {
  window.location.assign("./dashboard/history.html");
}

function details(e) {
  localStorage.setItem("movie_id", e);
  window.location.assign("./dashboard/detailview.html");
}

$("#logout").click(function () {
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_type");
  localStorage.removeItem("movie_id");
  localStorage.removeItem("cenimaHallId");
  localStorage.removeItem("selectedShowId");
  window.location.replace("./login.html");
});

$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "api/movies.php",
    success: (response) => {
      let data = JSON.parse(response);
      for (let i of data.data) {
        let movie = `
       
           <div class="card border-0 p-3 p-lg-0 pb-5 col-lg-3 col-10 m-auto m-lg-0 rounded-3 shadow-lg m-lg-4 mb-5" style="min-height: 350px; max-height: 450px" onclick="details(${
             i.id
           })">
              <img src=${i.image_url.slice(
                1
              )} class="card-img-top object-fit-cover rounded-3" style="height: 350px" alt="...">
              <p class="fw-medium fst-italic fs-5 m-2 mb-0 pb-0">${i.name}</p>
              <p class="fw-medium m-2 mt-0 pt-0 mb-3">${i.genre}</p>
            </div>
           `;
        movies_container.append(movie);
      }
    },
    error: (response) => {},
  });
});
