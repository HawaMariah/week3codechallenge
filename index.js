const film = document.querySelector(".film");

const renderPosts = async () => {
  let url = "http://localhost:3000/films";

  const res = await fetch(url);
  const films = await res.json();

  let template = "";
  films.forEach((film) => {
    let ticketsLeft = film.capacity - film.tickets_sold;

    template += `
      <div class="movies">
        <h2 class="movie-title">${film.title}</h2>
        <div class="movie-details" style="display: none;">
          <p>Starts: ${film.showtime}</p>
          <p>Duration: ${film.runtime} minutes</p>
          <p>Seats: ${film.capacity}</p>
          <p>Tickets sold: ${film.tickets_sold}</p>
          <p>Tickets left: <span class="tickets-left">${ticketsLeft}</span></p>
          <p>Description: ${film.description}</p>
          <button class="btn">Buy Ticket</button>
          <img src="${film.poster}">
        </div>
      </div>
    `;
  });
  film.innerHTML = template;

  function hideMovieTitlesAndDetails() {
    const movieTitles = document.querySelectorAll(".movie-title");
    movieTitles.forEach((title) => {
      title.style.display = "none";
      const movieDetails = title.nextElementSibling;
      movieDetails.style.display = "none";
    });
    const filmSection = document.querySelector(".film");
    filmSection.style.display = "none";
  }
  const homeMenuItem = document.getElementById("home");
homeMenuItem.addEventListener("click", hideMovieTitlesAndDetails);

  
function showAvailableMovies() {
  const movieTitles = document.querySelectorAll(".movie-title");
  movieTitles.forEach((title) => {
    title.style.display = "block";
    const movieDetails = title.nextElementSibling;
    movieDetails.style.display = "none";
  });
  const filmSection = document.querySelector(".film");
  filmSection.style.display = "block";
}
const availableMoviesMenuItem = document.getElementById("available-movies");
availableMoviesMenuItem.addEventListener("click", showAvailableMovies);



function toggleMovieDetails() {
  const movieTitles = document.querySelectorAll(".movie-title");

  movieTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const movieDetails = title.nextElementSibling;
      movieDetails.style.display = movieDetails.style.display === "none" ? "block" : "none";
    });
  });
}
toggleMovieDetails();



function handleTicketButtonClick(films) {
  const ticketBtn = document.querySelectorAll(".btn");

  ticketBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const ticketsLeftElement = document.querySelectorAll(".tickets-left")[index];
      let ticketsLeft = parseInt(ticketsLeftElement.textContent);

      if (ticketsLeft > 0) {
        ticketsLeft--;
        ticketsLeftElement.textContent = ticketsLeft;

        const filmData = films[index];
        filmData.tickets_sold++;
      } else {
        alert("SOLD OUT!!");
      }
    });
  });
}
handleTicketButtonClick(films);


film.style.display = "none";
}
window.addEventListener("DOMContentLoaded", () => renderPosts());
