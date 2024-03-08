<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="widht=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <link href="style_formul.css" rel="stylesheet">
</head>
<body class="bodo">
    <div class="container">
        <div class="drop"></div>
        <div class="conent">
            <h2> Inscription </h2>
            <hr />
            <form action="" method="post">
                <div class="box">
                    <input type="text" placeholder="Nom d'utilisateur. EX: JOHSON" required name="pseudo">
                </div>
                <div class="box">
                    <input type="email" placeholder="Prénom d'util. EX: Alain" required name="email">
                </div>
                <div class="box">
                    <input type="text" placeholder="Localisation. Ex: Yaoundé" required name="localisation">
                </div>
                <div class="box">
                    <input type="password" placeholder="Mot de passe" required name="password">
                </div>
                <div>
                <a href="connexion.php" class="lien"> j'ai un compte</a>
                </div>
                <button type="submit" class="btn"> Inscription</button>
            </form>
        </div>
        <div class="text">
            <img src="assest/cesiog.jpeg">
            <h2> Bienvenue</h2>
            <p> sur notre page d'inscripition </p>
        </div>
    </div>
</body>
</html>
