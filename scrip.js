const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const events = {}; // Almacenará eventos
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month, year) {
    calendar.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendar.insertAdjacentHTML("beforeend", `<div></div>`);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${month + 1}-${day}`;
        const highlightClass = events[dateKey] ? "highlight" : "";
        calendar.insertAdjacentHTML("beforeend", `<div class="${highlightClass}" data-date="${dateKey}">${day}</div>`);
    }
    monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;
}

function handleDateClick(e) {
    if (e.target.dataset.date) {
        const date = e.target.dataset.date;
        const eventDetails = document.getElementById("event-details");
        const eventsList = document.getElementById("events-list");

        eventsList.innerHTML = "";
        if (events[date]) {
            events[date].forEach(event => {
                eventsList.insertAdjacentHTML("beforeend", `<li>${event}</li>`);
            });
        } else {
            eventsList.innerHTML = "<li>No hay eventos</li>";
        }
        eventDetails.classList.remove("hidden");
    }
}

function handleAddEvent(e) {
    e.preventDefault();
    const cultivo = document.getElementById("cultivo").value;
    const area = document.getElementById("area").value;
    const fecha = document.getElementById("fecha").value;

    if (!events[fecha]) {
        events[fecha] = [];
    }
    events[fecha].push(`${cultivo} - Área: ${area}`);
    renderCalendar(currentMonth, currentYear);
    alert("Evento añadido");
}

function handleAddCultivo() {
    const nuevoCultivo = document.getElementById("nuevo-cultivo").value;
    if (nuevoCultivo) {
        const cultivosList = document.getElementById("cultivos-list");
        cultivosList.insertAdjacentHTML("beforeend", `<li>${nuevoCultivo}</li>`);
        const cultivoSelect = document.getElementById("cultivo");
        cultivoSelect.insertAdjacentHTML("beforeend", `<option>${nuevoCultivo}</option>`);
        document.getElementById("nuevo-cultivo").value = "";
    }
}

prevMonth.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

calendar.addEventListener("click", handleDateClick);
document.getElementById("siembra-form").addEventListener("submit", handleAddEvent);
document.getElementById("agregar-cultivo").addEventListener("click", handleAddCultivo);

renderCalendar(currentMonth, currentYear);