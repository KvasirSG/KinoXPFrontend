document.addEventListener("DOMContentLoaded", function () {
    const movieSelect = document.getElementById("movie");
    const showtimeSelect = document.getElementById("showtime");
    const seatContainer = document.getElementById("seat-selection");
    const confirmBookingButton = document.getElementById("confirm-booking");

    async function fetchMovies() {
        try {
            const response = await fetch("http://localhost:8080/api/movies");
            const movies = await response.json();
            movieSelect.innerHTML = "";
            movies.forEach(movie => {
                const option = document.createElement("option");
                option.value = movie.movieId;
                option.textContent = movie.title;
                movieSelect.appendChild(option);
            });
            fetchShowtimes();
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    async function fetchShowtimes() {
        const selectedMovieId = movieSelect.value;
        try {
            const response = await fetch(`http://localhost:8080/api/shows/movie/${selectedMovieId}`);
            const showtimes = await response.json();
            showtimeSelect.innerHTML = "";
            showtimes.forEach(show => {
                const option = document.createElement("option");
                option.value = show.showId;
                option.textContent = new Date(show.showTime).toLocaleString();
                option.dataset.seats = JSON.stringify(show.seats);
                showtimeSelect.appendChild(option);
            });
            fetchSeats();
        } catch (error) {
            console.error("Error fetching showtimes:", error);
        }
    }

    function fetchSeats() {
        const selectedOption = showtimeSelect.options[showtimeSelect.selectedIndex];
        const seats = JSON.parse(selectedOption.dataset.seats || "[]");
        seatContainer.innerHTML = "";

        const screen = document.createElement("div");
        screen.classList.add("screen");
        screen.textContent = "SCREEN";
        seatContainer.appendChild(screen);

        let lastRow = 0;
        let seatRow;

        seats.forEach(seat => {
            if (seat.rowIndex !== lastRow) {
                seatRow = document.createElement("div");
                seatRow.classList.add("seat-row");

                const rowNumber = document.createElement("div");
                rowNumber.classList.add("row-number");
                rowNumber.textContent = seat.rowIndex;
                seatRow.appendChild(rowNumber);

                seatContainer.appendChild(seatRow);
                lastRow = seat.rowIndex;
            }

            const seatDiv = document.createElement("div");
            seatDiv.classList.add("seat");
            seatDiv.textContent = seat.seatNumber;
            seatDiv.dataset.seatId = seat.seatId; // ✅ Store the actual seat ID in a data attribute

            if (seat.booked) {
                seatDiv.classList.add("booked");
                seatDiv.setAttribute("disabled", "true");
            } else {
                seatDiv.addEventListener("click", () => {
                    seatDiv.classList.toggle("selected");
                });
            }
            seatRow.appendChild(seatDiv);
        });
    }

    confirmBookingButton.addEventListener("click", async function () {
        const selectedSeats = Array.from(document.querySelectorAll(".seat.selected"))
            .map(seat => parseInt(seat.dataset.seatId)); // ✅ Use seatId instead of seatNumber

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        const bookingData = {
            show: { showId: parseInt(showtimeSelect.value) },
            customer: { customerId: 1 },
            seats: selectedSeats.map(seatId => ({ seatId: seatId })), // ✅ Send seatId
            totalPrice: selectedSeats.length * 10,
            status: "CONFIRMED"
        };

        console.log("Booking Data Sent:", JSON.stringify(bookingData, null, 2));

        try {
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });
            if (response.ok) {
                alert("Booking successful!");
                fetchShowtimes(); // Refresh showtimes to update booked seats
            } else {
                alert("Booking failed. Try again.");
                const errorData = await response.json();
                console.error("Booking failed:", errorData);
            }
        } catch (error) {
            console.error("Error making booking:", error);
        }
    });

    movieSelect.addEventListener("change", fetchShowtimes);
    showtimeSelect.addEventListener("change", fetchSeats);

    fetchMovies();
});
