//movie api
const api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=96d02017571e08961a0f88fe9a7641c0&append_to_response=videos";
const image_path = "https://image.tmdb.org/t/p/w1280";

const querySearch =
  'https://api.themoviedb.org/3/search/movie?api_key=96d02017571e08961a0f88fe9a7641c0&query="';
const videos =
  "https://api.themoviedb.org/3/movie/438695/videos?api_key=96d02017571e08961a0f88fe9a7641c0&language=en-US";

// console.log(apiUrl)

//getting items with the query selector and assigning a variable to them
const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

// const movieEl = ''
//calling a function(HOISTING)
getMovies(api_url);

//declaring an asynchronous function to fetch the api
async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();


    if(data.results.length == 0){
        
        console.log('movie does not exist')

        window.location.reload();

        // const error = document.createElement("div");
        // error.classList.add('error')
        // error.textContent = `
        // <div>
        // <p> Movie is not available</p>
        // </div>
        // `
        
        // main.appendChild(error)
        // console.log(error);
        // console.log(main);
        // showMovies('Movie does not exist')
    }
  console.log(data);
  showMovies(data.results);
}

//declaring a function to display the movies using .forEach method
//since the query data is an array, also adding html to align the items
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

   const movieEl = document.createElement("div");
    movieEl.classList.add("card");

    movieEl.innerHTML = `
        
        <div id="card">
        
        <img src="${image_path + poster_path}" alt="${title}">

        <div class = "text">
            <h3>${title}</h3>

            <span>${vote_average}</span>
            
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}

        </div>


        </div>`;

    main.appendChild(movieEl);
  });
}

//adding event listener to the form to allow it listen to an event which is submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(querySearch + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
    console.log(window)
  }
});
