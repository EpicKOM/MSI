$(document).ready(function() {
    const eventSource = new EventSource("/stream/meteo-live/saint-ismier");

    // Écouter les messages par défaut
    eventSource.onmessage = (event) => {
        console.log(event.data);

    };

    eventSource.addEventListener("meteo", (event) => {
    console.log("Météo Event: ", event.data);
    });
    // Gestion des erreurs
    eventSource.onerror = (error) => {
        console.error("EventSource failed: ", error);
    };
});