const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const display = document.querySelector(".display");
const days = document.querySelector(".days");
const previous = document.querySelector(".left");
const next = document.querySelector(".right");
const selected = document.querySelector(".selected");

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

function renderCalendar() {

    days.innerHTML = "";

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    display.textContent = new Date(year, month).toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    });

    // Empty cells before the first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        const empty = document.createElement("div");
        days.appendChild(empty);
    }

    // Days
    for (let i = 1; i <= lastDay.getDate(); i++) {

        const cell = document.createElement("div");
        const current = new Date(year, month, i);

        cell.innerHTML = i;
        cell.dataset.date = current.toDateString();

        // Highlight today's date
        if (
            current.getDate() === new Date().getDate() &&
            current.getMonth() === new Date().getMonth() &&
            current.getFullYear() === new Date().getFullYear()
        ) {
            cell.classList.add("current-date");
        }

        // Click Event
        cell.addEventListener("click", function () {

            // Remove previous selection
            document.querySelectorAll(".days div").forEach(item => {
                item.classList.remove("selected-date");
            });

            // Highlight selected day
            this.classList.add("selected-date");

            // Show selected date under calendar
            selected.innerHTML = "Selected Date: " + this.dataset.date;

            // Set selected date in modal input
            document.getElementById("selectedDate").value = this.dataset.date;

            // Open Bootstrap Modal
            const modal = new bootstrap.Modal(
                document.getElementById("appointmentModal")
            );

            modal.show();

        });

        days.appendChild(cell);
    }
}

// Previous Month
previous.addEventListener("click", function () {

    month--;

    if (month < 0) {
        month = 11;
        year--;
    }

    renderCalendar();
});

// Next Month
next.addEventListener("click", function () {

    month++;

    if (month > 11) {
        month = 0;
        year++;
    }

    renderCalendar();
});

// Initial Load
renderCalendar();