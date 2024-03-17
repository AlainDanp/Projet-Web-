function acceptCookies() {
    // Enregistrer le consentement de l'utilisateur dans un cookie
    document.cookie = "cookies_accepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

    // Cacher la fenêtre modale
    document.getElementById("cookie-modal").style.display = "none";
}

// Afficher la fenêtre modale si l'utilisateur n'a pas encore donné son consentement
if (document.cookie.indexOf("cookies_accepted=true") < 0) {
    document.getElementById("cookie-modal").style.display = "block";
}

const acceptButton = document.getElementById('acceptButton');
const rejectButton = document.getElementById('rejectButton');

acceptButton.addEventListener('click', () => {
    // Logique pour le traitement de l'acceptation
    alert('La demande a été acceptée !');
});

rejectButton.addEventListener('click', () => {
    // Logique pour le traitement du refus
    alert('La demande a été refusée.');
});