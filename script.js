
document.addEventListener('DOMContentLoaded', function() {
    var editProfileButton = document.getElementById('edit-profile');
    var changePasswordButton = document.getElementById('change-password');
    var profileForm = document.getElementById('profile-form');
    var passwordForm = document.getElementById('password-form');

    // Fonction pour enregistrer les paramètres

    {
        // Exemple d'affichage d'un message de succès
        alert("Parametres enregistres avec succes !");
    }

    editProfileButton.addEventListener('click', function() {
        profileForm.style.display = 'block';
        passwordForm.style.display = 'none';
    });

    changePasswordButton.addEventListener('click', function() {
        profileForm.style.display = 'none';
        passwordForm.style.display = 'block';
    });

    var saveProfileButton = document.getElementById('save-profile');
    saveProfileButton.addEventListener('click', function() {
        var newName = document.getElementById('new-name').value;
        var newImage = document.getElementById('new-image').value;
        // Code pour enregistrer les modifications du profil
        console.log('Nouveau nom :', newName);
        console.log('Nouvelle image :', newImage);
    });

    var savePasswordButton = document.getElementById('save-password');
    savePasswordButton.addEventListener('click', function() {
        var currentPassword = document.getElementById('current-password').value;
        var newPassword = document.getElementById('new-password').value;
        var confirmPassword = document.getElementById('confirm-password').value;
        // Code pour changer le mot de passe
        console.log('Mot de passe actuel :', currentPassword);
        console.log('Nouveau mot de passe :', newPassword);
        console.log('Confirmation du nouveau mot de passe :', confirmPassword);
    });
});