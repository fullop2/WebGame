<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/font.css">
    <link rel="stylesheet" type="text/css" href="css/common.css">
    <link rel="stylesheet" type="text/css" href="css/game.css">
    <title>Open Web Game</title>
  </head>
  <body>
    <header>
      <p></p>
      <h1 class="text-center">Web Open Game</h1>
      <p></p>
    </header>

    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">WOG</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="./main.html">Home</a></li>
          <li class="active"><a href="./game.html">Tower Defense Game</a></li>
          <li><a href="#">Page 2</a></li>
          <li><a href="#">Page 3</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>

        </ul>
      </div>
    </nav>

    <div class="container main-article">
      <div class="row">
        <div class="col-md-2 aside">
            <div id="div-gamedesc" class = "text-center" >
              <img src="./img/thumbnail.gif" class ="img-thumbnail" alt="game picture">
              <p>Tower Defense Game</p>
              <p>Rating : 4.0</p>
              <button id="btn-goforum" class="btn">Go to Forum</button>
            </div>
            <div id="div-gametable">
              <table>
                <tr>
                  <th>Hot Game</th>
                </tr>
                <tr>
                  <th><a href="#">test</a></th>
                </tr>
                <tr>
                  <th><a href="#">hello</a></th>
                </tr>
                <tr>
                  <th><a href="#">world</a></th>
                </tr>
                <tr>
                  <th><a href="#">new</a></th>
                </tr>
                <tr>
                  <th><a href="#">game</a></th>
                </tr>
              </table>
            </div>
        </div>
        <div class="section col-md-5">
          <div class="div-game">
            <h3 id="game-title">Tower Defense Game</h3>
            <div id="game">
            </div>
          </div>
          <div class="posts">
            <table id="this-game-board" class="table table-hover" >
              <tr>
                <th>Title</th>
                <th>Count</th>
                <th>Vote</th>
              </tr>
              <tr>
                <td><a href="#">easy way to clear</a></td>
                <td>52</td>
                <td>3</td>
              </tr>
              <tr>
                <td><a href="#">try it</a></td>
                <td>30</td>
                <td>10</td>
              </tr>
              <tr>
                <td><a href="#">anyway I clear</a></td>
                <td>26</td>
                <td>15</td>
              </tr>
              <tr>
                <td><a href="#">have fun with this guide</a></td>
                <td>65</td>
                <td>1</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <footer class="container-fluid text-center">
      <address>
        please contact us : <a href="mailto:parkth32@gmail.com?subject=feedback">email me</a>
      </address>
    </footer>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="./js/three.js"></script>
    <script src="./js/loaders/GLTFLoader.js"></script>
    <script src="./js/Game.js"></script>
    <script src="./js/RotateCameraScene.js"></script>
    <script>
    loadResources();
    </script>
  </body>
</html>
