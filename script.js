const botaoBuscar = document.getElementById("button-buscar");
const overlay = document.getElementById("modal-overlay"); // Use aspas para envolver o ID
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const movieListContainer = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];
async function searchButtonClickHAndler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNAmeParametreGenerator()
      .split(" ")
      .join("+")}${movieYearParameterGenerator()}
        `;
    const response = await fetch(url);
    const data = await response.json();
    if (data.Error) {
      throw new Error("Filme não encontrado");
    }
    creatModal(data);
    overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}
function movieNAmeParametreGenerator() {
  if (movieName.value === ``) {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (movieYear.value === ``) {
    return ``;
  }
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme inválido");
  }
  return `&y=${movieYear.value}`;
}

function addToList(data) {
  overlay.classList.remove("open");
  if (isFilmAlreadyOnTheList(data.imdbID)) {
    notie.alert({ type: "error", text: "Filme ja existe na lista" });
    return " ";
  }
  movieList.push(data);
  updataLocalStorage();
  updataUi(data);
}
function updataUi(data) {
  movieListContainer.innerHTML += `<article id='movie-card-${data.imdbID}'>
  <img src="${data.Poster}" alt="poster do ${data.Title}.">
  <button id="button-remover" onclick='removeFilmFromList("${data.imdbID}")'><i class="bi bi-trash"></i>Remover</button>
</article>`;
}

function isFilmAlreadyOnTheList(imdbId) {
  function isThisIdFromThisMovie(movie) {
    return movie.imdbID === imdbId;
  }
  return movieList.find(isThisIdFromThisMovie);
}
function removeFilmFromList(imdbId) {
  movieList = movieList.filter((movie) => movie.imdbID !== imdbId);
  document.getElementById(`movie-card-${imdbId}`).remove();
  updataLocalStorage();
}
function updataLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}
movieList.forEach(updataUi);

botaoBuscar.addEventListener("click", searchButtonClickHAndler);
