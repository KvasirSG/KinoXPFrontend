document.addEventListener("DOMContentLoaded", function () {
    const moviesList = document.getElementById("movies-list");

    // Sample movie data (this can be replaced with API calls later)
    const movies = [
        { title: "Inception", genre: "Sci-Fi", duration: "148 min", age: "13+" },
        { title: "Titanic", genre: "Romance", duration: "195 min", age: "12+" },
        { title: "The Dark Knight", genre: "Action", duration: "152 min", age: "13+" },
        { title: "Interstellar", genre: "Sci-Fi", duration: "169 min", age: "10+" }
    ];

    function loadMovies() {
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <h3>${movie.title}</h3>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Duration:</strong> ${movie.duration}</p>
                <p><strong>Age Restriction:</strong> ${movie.age}</p>
                <button class="book-btn">Book Now</button>
            `;
            moviesList.appendChild(movieCard);
        });
    }

    loadMovies();
});
