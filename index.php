<!doctype html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Titre de la page</title>
        <link rel="stylesheet" href="home.css">
       
    </head>
    <body class="back">

        <div> <?php require_once("navbarL.php") ?></div>

        <div class="y">            
            <img src="fond.jpg" alt="img" class="background">

            <header>
                <div class="BDE"> 
                    <h1> BDE SHOP</h1>
                </div>
            </header>

            <main >
                <div class="Add">
                    <h2> ADD ARTICLES HERE</h2>

                </div>
            
                <div class="x">
                    <input type="text" placeholder="Name:" name="Name" id="Name" class="nom">               
                    <div class="drop-zone">
                    <div class="tr"></div>
                        <span class="drop-zone__prompt m-3 ">ADD IMAGE:</span>        
                        <input type="file" name="" class="drop-zone__input">
                    </div>
                    <div class="input_container">
                        <textarea placeholder="Description" name="Description" id="" cols="30" rows="10" class="desc"></textarea>
                        <input type="text" placeholder="Price:" name="Price" id="Price" class="prix">
                        
                        <button placeholder="SEND" name="SEND" id="SEND" class="envoyez"> SEND</button>

                    </div>
                </div>

        
    
            </main>
        </div>
        <script src="shop.js"></script>
        
        <div> <?php require_once("footer.php") ?></div>
        
    </body>
</html>