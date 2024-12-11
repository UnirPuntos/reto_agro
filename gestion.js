// Referencias a elementos HTML
const tableBody = document.querySelector("#gestion-table tbody");
const clearButton = document.getElementById("clear-all");

// Función para cargar datos desde localStorage
function loadCultivos() {
    const events = JSON.parse(localStorage.getItem("events")) || {};

    // Limpia la tabla antes de rellenarla
    tableBody.innerHTML = "";

    // Iterar sobre los eventos almacenados
    for (const [date, eventList] of Object.entries(events)) {
        eventList.forEach(event => {
            const row = document.createElement("tr");

            // Crear columnas de la tabla
            row.innerHTML = `
                <td>${date}</td>
                <td>${event.split(" - ")[0]}</td> <!-- Cultivo -->
                <td>${event.match(/Área: ([^ -]+)/)?.[1]}</td> <!-- Área -->
                <td>${event.match(/Estado: ([^ -]+)/)?.[1]}</td> <!-- Estado -->
                <td>${event.split(" - ").slice(2).join(", ")}</td> <!-- Detalles -->
            `;

            tableBody.appendChild(row);
        });
    }
}

// Función para limpiar todos los registros
clearButton.addEventListener("click", () => {
    if (confirm("¿Estás seguro de eliminar todos los registros?")) {
        localStorage.removeItem("events");
        loadCultivos(); // Recargar la tabla
        alert("Todos los registros han sido eliminados.");
    }
});

// Cargar los cultivos al cargar la página
loadCultivos();
