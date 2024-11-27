$(document).ready(function() {
    const eventSource = new EventSource("/stream/meteo-live/lans-en-vercors");

    // Écouter les messages par défaut
    eventSource.onmessage = (event) => {
        console.log(event.data);

    };

    // Gestion des erreurs
    eventSource.onerror = (error) => {
        console.error("EventSource failed: ", error);
    };
});