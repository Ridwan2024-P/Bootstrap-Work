const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// Appointment
 document.addEventListener("DOMContentLoaded", function () {

    setTimeout(() => {

        const calendar = document.getElementById("myCalendar");

        calendar.addEventListener("click", function (e) {

            const day = e.target.closest(".calendar-cell,.calendar-day");

            if (!day) return;

            console.log(day); 

        
            let date =
                day.dataset.date ||
                day.getAttribute("data-date") ||
                day.getAttribute("aria-label");

            if (!date) {
                const dayNumber = day.innerText.trim();
                date = `July ${dayNumber}, 2026`;
            }

            document.getElementById("selectedDate").value = date;

            new bootstrap.Modal(
                document.getElementById("appointmentModal")
            ).show();

        });

    }, 500);

});