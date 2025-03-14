document.addEventListener("DOMContentLoaded", function () {
    const moviesList = document.getElementById("movies-list");

    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:8080/api/movies");
            const movies = await response.json();
            moviesList.innerHTML = "";

            movies.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <h3>${movie.title}</h3>
                    <p><strong>Genre:</strong> ${movie.genre}</p>
                    <p><strong>Duration:</strong> ${movie.duration} min</p>
                    <p><strong>Age Restriction:</strong> ${movie.ageRestriction}+</p>
                    <button class="book-btn" data-movie-id="${movie.movieId}">Book Now</button>
                `;
                moviesList.appendChild(movieCard);
            });
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    moviesList.addEventListener("click", function(event) {
        if (event.target.classList.contains("book-btn")) {
            const movieId = event.target.getAttribute("data-movie-id");
            window.location.href = `booking.html?movieId=${movieId}`;
        }
    });

    fetchMovies();
});
