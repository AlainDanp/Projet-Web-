document.getElementById('addRegistrant').addEventListener('click', function() {
    var newRegistrantName = document.getElementById('newRegistrant').value;

    if (newRegistrantName !== '') {
        var registrantsList = document.getElementById('registrantsList');
        var newRegistrantItem = document.createElement('li');
        newRegistrantItem.textContent = newRegistrantName;
        registrantsList.appendChild(newRegistrantItem);

        document.getElementById('newRegistrant').value = '';
    }
});
