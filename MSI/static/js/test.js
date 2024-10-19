$(document).ready(function() {
    const eventSource = new EventSource("/stream/meteo-live/saint-ismier");

    eventSource.onmessage = (event) => {
    alert("bite");
//        const data = JSON.parse(event.data);
//        $('testTemperature').text = data.current_weather_data.temperature;
    }
        // Gestion des erreurs
    eventSource.onerror = (error) => {
        console.error("EventSource failed: ", error);
        // Optionnel : afficher un message d'erreur à l'utilisateur ou tenter une reconnexion
    };
        // Fermer la connexion SSE lorsque l'utilisateur quitte la page
    $(window).on("beforeunload", function() {
        eventSource.close(); // Ferme la connexion SSE
    });
});