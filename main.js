// $("#btn-search").on("click", function () {
//   let rsearch = $("#input-search").val();
//   console.log(rsearch);

//   $.ajax({
//     dataType: "json",
//     url: `//www.omdbapi.com/?apikey=8cc7be28&s=${rsearch}`,
//     // data: data,
//     success: function (response) {
//       console.log(response);

//       let cards = "";

//       if (response.Response === "False") {

//         cards = `<h1>Result : 0 Film </h1>`;
//         $(".movieList").html(cards);

//       } else {
//         const movies = response.Search;

//         movies.forEach((movie) => {
//           cards += cardsList(movie);
//         });

//         $(".movieList").html(cards);

//         $("[data-imdbID]").on("click", function () {
//           // const imdbId = this.getAttribute("data-imdbID");
//           // const imdbId = $(this).attr("data-imdbID");
//           // console.log(imdbId);
//           // ${$(this).attr("data-imdbID")}
//           $.ajax({
//             dataType: "json",
//             url: `//www.omdbapi.com/?apikey=8cc7be28&i=${$(this).data('imdbID')}`,
//             success: function (d) {
//               const detail = modalDetail(d);

//               $(".details").html(detail);
//             },
//           });
//         });
//       }
//     },
//     error: function (response) {
//       console.log("error");
//     },
//   });
// });

// // ganti dengan Fetch
// // promise
// // .then
// // method json()

// const btnSearch = document.getElementById("btn-search");
// btnSearch.addEventListener("click", () => {
  
//   const rsearch = document.getElementById("input-search");
//   fetch(`//www.omdbapi.com/?apikey=8cc7be28&s=${rsearch.value}`)
//     .then((response) => response.json())
//     .then((datas) => {
//       const movies = datas.Search;
//       let cards = "";

//       movies.forEach(movie => {
//         cards += cardsList(movie);
//       });

//       const movieList = document.querySelector('.movieList');
//       movieList.innerHTML = cards;
      
//       const btnDetails = document.querySelectorAll('[data-imdbID]');
//       btnDetails.forEach(btnDetail => {
//         btnDetail.addEventListener('click', function(){
//           const imdbID = this.getAttribute("data-imdbID");
          
//           let detail = "";
//           fetch(`//www.omdbapi.com/?apikey=8cc7be28&i=${imdbID}`)
//           .then(response => response.json())
//           .then(datas => {
  //             detail = modalDetail(datas);
//             // console.log(datas);

//             const modalDetails = document.querySelector('.details');
//             modalDetails.innerHTML = detail;

//           });

//         });
//       });
      

//     });

//   // console.log(btnSearch);
// });


// menambahkan async dan await
const btnSearch = document.getElementById('btn-search');
btnSearch.addEventListener('click', async function(){
  const inputKeyword  = document.getElementById('input-search');

  //ambil resources dari omdb Api berdasarkan search (s = inputkeyword)
  const movies = await getMovies(inputKeyword.value);
  
  // // nah ini masih menghasilkan promise pending --> harus nya ini mengahasilkan array dari get movies
  // // maka tambahkan async di callback click btn search
  // // kemudian tambahkan await di get movies supaya variabel movies assignment setelah resolved
  // console.log(movies);
  // // setelah ini pasti variable movies isinya array
  
  updateCards(movies);

  // ketika details di click
  const btnDetails = document.querySelectorAll('[data-imdbID]');
  btnDetails.forEach(btnDetail => {
    btnDetail.addEventListener('click', async function(){
      const imdbID = this.getAttribute("data-imdbID");

      const movieDetail = await getMovieDetail(imdbID);
      addModalDetail(movieDetail);

    });
  });

});

function getMovieDetail(imdbID){
  return fetch(`//www.omdbapi.com/?apikey=8cc7be28&i=${imdbID}`)
          .then(response => response.json())
}

function addModalDetail(movieDetail){

  const detail = modalDetail(movieDetail);
  const modalDetails = document.querySelector('.details');
  modalDetails.innerHTML = detail;

}

function getMovies(keyword){
  return fetch(`//www.omdbapi.com/?apikey=8cc7be28&s=${keyword}`)
  .then(response => response.json()) // masih promise
  .then(datas => datas.Search)
}

function updateCards(movies) {
  let cards = "";
  
  movies.forEach(movie => {
    cards += cardsList(movie);
  });

  const movieList = document.querySelector('.movieList');
  movieList.innerHTML = cards;

}

function cardsList(movie) {
  return `
  <div class="col col-3 my-3">
      <div class="card">
          <img src="${movie.Poster}" class="card-img-top" />
          <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <p class="card-text text-muted">${movie.Year}</p>
              <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetails" data-imdbID="${movie.imdbID}">Details</a>
          </div>
      </div>
  </div>`;
}

function modalDetail(d) {
  return `
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
}
