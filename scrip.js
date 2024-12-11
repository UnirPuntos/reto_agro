const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");
const events = JSON.parse(localStorage.getItem("events")) || {}; // Carga eventos desde localStorage
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

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
            events[date].forEach((event, index) => {
                eventsList.insertAdjacentHTML("beforeend", `<li>${event} <button data-date="${date}" data-index="${index}" class="delete-event">Eliminar</button></li>`);
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
    const unidad = document.getElementById("unidad-area").value;
    const estado = document.getElementById("estado").value;
    const fertilizado = document.getElementById("fertilizado").checked ? "Fertilizado" : "No Fertilizado";
    const regado = document.getElementById("regado").checked ? "Regado" : "No Regado";
    const danado = document.getElementById("danado").checked ? "Dañado" : "Sin daños";
    const abono = document.getElementById("abono").checked ? "Necesita abono" : "No necesita abono";
    const tratamiento = document.getElementById("tratamiento").checked ? "Tratamiento aplicado" : "Sin tratamiento";
    const fecha = document.getElementById("fecha").value;

    const areaTexto = unidad === "m2" ? `${area} m²` : `${area} ha`;

    if (!events[fecha]) {
        events[fecha] = [];
    }
    events[fecha].push(`${cultivo} - Área: ${areaTexto} - Estado: ${estado} - ${fertilizado}, ${regado}, ${danado}, ${abono}, ${tratamiento}`);
    saveEvents();
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

function handleClearEvents(e) {
    const date = e.target.dataset.date;
    if (date) {
        delete events[date];
        saveEvents();
        renderCalendar(currentMonth, currentYear);
        document.getElementById("event-details").classList.add("hidden");
        alert("Eventos eliminados");
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
document.getElementById("clear-events").addEventListener("click", handleClearEvents);

renderCalendar(currentMonth, currentYear);