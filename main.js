$.ajax({
  dataType: "json",
  url: "//www.omdbapi.com/?apikey=8cc7be28&s=iron man",
  // data: data,
  success: function (response) {
    const movies = response.Search;
    let cards = "";
    movies.forEach((movie) => {
      cards += `
            <div class="col-4 my-3">
                <div class="card" style="width: 18rem">
                    <img src="${movie.Poster}" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text text-muted">${movie.Year}</p>
                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetails" data-imdbID="${movie.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
    });

    $(".movieList").html(cards);

    $("[data-imdbID]").on("click", function () {
      // const imdbId = this.getAttribute("data-imdbID");
      // const imdbId = $(this).attr("data-imdbID");
      // console.log(imdbId);
      $.ajax({
        dataType: "json",
        url: `//www.omdbapi.com/?apikey=8cc7be28&i=${$(this).attr(
          "data-imdbID"
        )}`,
        success: function (d) {
          const modalDetail = `
                <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="modalDetailsLabel">${d.Genre}</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${d.Poster}" class="img-fluid rounded-start" />
                      </div>
                      <div class="col-md">
                        <div class="card-body">
                          <h5 class="card-title">${d.Title} - Released : ${d.Released}</h5>                           
                            <p class="card-text">Director : ${d.Director}</p>
                            <p class="card-text">Actors : ${d.Actors}</p>
                            <p class="card-text">Plot : Awards : ${d.Awards}</p>
                            <p class="card-text">Plot : ${d.Plot}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>`;

          $(".details").html(modalDetail);
        },
      });
    });

    // console.log(cards);
  },
  error: function (response) {
    console.log("error");
  },
});
