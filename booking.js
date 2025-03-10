document.addEventListener("DOMContentLoaded", function () {
    const movieSelect = document.getElementById("movie");
    const showtimeSelect = document.getElementById("showtime");
    const seatContainer = document.getElementById("seat-selection");
    const bookingForm = document.getElementById("booking-form");

    // Sample data (Replace with API calls later)
    const movies = [
        { id: 1, title: "Inception" },
        { id: 2, title: "Titanic" },
        { id: 3, title: "The Dark Knight" },
        { id: 4, title: "Interstellar" }
    ];

    const showtimes = {
        1: ["10:00 AM", "2:00 PM", "6:00 PM"],
        2: ["11:00 AM", "3:00 PM", "7:00 PM"],
        3: ["12:00 PM", "4:00 PM", "8:00 PM"],
        4: ["1:00 PM", "5:00 PM", "9:00 PM"]
    };

    const seats = 5 * 10; // Example 5 rows, 10 seats each

    function populateMovies() {
        movies.forEach(movie => {
            const option = document.createElement("option");
            option.value = movie.id;
            option.textContent = movie.title;
            movieSelect.appendChild(option);
        });
    }

    function populateShowtimes() {
        showtimeSelect.innerHTML = ""; // Clear previous options
        const selectedMovie = movieSelect.value;

        showtimes[selectedMovie].forEach(time => {
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            showtimeSelect.appendChild(option);
        });
    }

    function generateSeats() {
        seatContainer.innerHTML = ""; // Clear previous seats
        for (let i = 0; i < seats; i++) {
            const seat = document.createElement("div");
            seat.classList.add("seat");
            seat.textContent = i + 1;
            seat.addEventListener("click", () => {
                seat.classList.toggle("selected");
            });
            seatContainer.appendChild(seat);
        }
    }

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const selectedSeats = Array.from(document.querySelectorAll(".seat.selected")).map(seat => seat.textContent);

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        alert(`Booking confirmed for ${movieSelect.options[movieSelect.selectedIndex].text}, Showtime: ${showtimeSelect.value}, Seats: ${selectedSeats.join(", ")}`);
    });

    movieSelect.addEventListener("change", populateShowtimes);
    populateMovies();
    populateShowtimes();
    generateSeats();
});