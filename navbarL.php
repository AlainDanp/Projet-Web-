<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <meta name="viewport" content="width=device-width , initial-scale=1.0">
    <link href="navabarsite.css" rel="stylesheet">
    <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</head>
<body>
    <nav class="sidebar close">
        <header>
            <div class="image-text">
                    <span class="image">
                      <img src="assest/cesi.svg" alt="cesi">
                    </span>
                <div class="text header-text">
                    <span class="name">Cesi</span>
                    <span class="profession"> Ecole d'ingégnieur</span>
                </div>
            </div>

            <i class="bx bx-chevron-right toggle"></i>
        </header>
        <div class="menu-bar">
            <div class="menu">
                <li class="search-box">
                    <i class="bx bx-search icon"></i>
                    <input type="search" placeholder=" Recherche...">
                </li>
                <ul class="menu-links">
                    <li class="nav-links">
                        <a href="#">
                            <i class="bx bx-home-alt icon"></i>
                            <span class="text nav-text">Acceuil</span>
                        </a>
                    </li>
                    <li class="nav-links">
                        <a href="#">
                            <i class='bx bxl-shopify icon'></i>
                            <span class="text nav-text">BDE SHOP</span>
                        </a>
                    </li>
                    <li class="nav-links">
                        <a href="#">
                            <i class='bx bxs-group icon'></i>
                            <span class="text nav-text">BDE </span>
                        </a>
                    </li>
                    <li class="nav-links">
                        <a href="#">
                            <i class='bx bxs-wrench icon'></i>
                            <span class="text nav-text">Option</span>
                        </a>
                    </li>
                    <li class="nav-links">
                        <a href="#">
                            <i class='bx bxs-bell icon'></i>
                            <span class="text nav-text">Notification</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="bottom-content">
                <li class="nav-links">
                    <a href="#">
                        <i class='bx bx-log-out icon'></i>
                        <span class="text nav-text">Déconnexion</span>
                    </a>
                </li>
                <li class="mode">
                    <div class="moon-sun">
                        <i class='bx bx-moon icon moon'></i>
                        <i class='bx bx-sun icon sun'></i>
                    </div>
                    <span class="mode-text text"> Mode Nuit</span>
                    <div class="toggle-switch">
                        <span class="switch"></span>
                    </div>
                </li>
            </div>
        </div>
    </nav>

    <section class="home">
        <div class="text"> Navbar</div>
    </section>
    <section class="home">
        <?php include "hh.php" ?>
    </section>

    <script src="navarbar.js"></script>
</body>
</html>