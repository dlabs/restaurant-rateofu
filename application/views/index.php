<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>Hotel Martin</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href="icon.png">
  <!-- Place favicon.ico in the root directory -->
  <link href= 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/ui-lightness/jquery-ui.css'rel='stylesheet'> 
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js" ></script> 
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" ></script> 
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/media-desktop.css">
  <link rel="stylesheet" href="css/media-mobile.css">

  <meta name="theme-color" content="#fafafa">
</head>

<body>
  <!--[if IE]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->

  <!-- Add your site or application content here -->
  <main class="grid">
    <menu>
      <!-- MENU -->
      <nav>
        <ul class="menu">
          <li class="logo"><a href="#"><img src="images/logo-test.png" alt=""></a></li>
          <li class="item"><a href="index.php">DOMOV</a></li>
          <li class="item"><a href="apartman.php">APARTMAJI</a></li>
          <li class="item"><a href="ponudba.php">PONUDBA</a></li>
          <li class="item"><a href="#">KONTAKT</a></li>
          <li class="item flag"><a href="#"><img src="images/english_flag.png" class="menu-flag" alt=""></a></li>
          </li>
          <li class="toggle"><a href="#"><i class="fa fa-bars"></i></a></li>
        </ul>
      </nav>
      <!-- MENU -->
    </menu>
    <!-- CONTENT -->
    <!-- Vedno kaj za početi -->
    <section class="always-something-to-do-page">
      <div class="always-something-to-do-flex">
        <article>
          <div class="always-something-to-do-center">
            <h2>Aktivno <br/>novo leto</h2>
            <p>Pohorje nudi obilo kulinaričnih doživetij. Peš, s kolesom ali osebnim avtomobilom je moč obiskati turistične kmetije in gorske koče, kjer nudijo pristne pohorske jedi (Pohorska omleta, Pohorski pisker, Pohorska bunka, gobova juha…).</p>
            <br/>
            <p>rezervacije na: <b>+386 40 500 386</b> ali <b>info@penzionmartin.si</b></p>
          </div>
        </article>
        <article>
          <div class="always-something-to-do-button">
            <button>že od 75€/osebo</button>
          </div>
        </article>
      </div>
    </section>
    <!-- Vedno kaj za početi -->
    <!-- Vedno kaj za početi -->
    <section>
      <div class="always-something-to-do-page-content ponudba-width">
            <article>
                <div class="ponudba-img-text">
                    <img src="images/ponudba-1.png" id="ponudba-img" alt="">
                    <div class="ponudba-text-overlay">
                        <h2>Zimske <br/>počitnice</h2>
                    </div><!-- overlay-->
                </div><!-- container-->
                <p>V kolikor zimske počitnice 14.2. - 25.2. 2020 rezervirate še letos vam ob takojšnjem plačilo priznamo 15% popust. Paket velja za apartma za osem oseb. Veselimo se vašega obiska in obljubljamo vam zelo prijetno izkušnjo. Za posebno akcijo nas pokličite ali pišite in povejte kodo za popust: <b>Martinpočitnice2020</b></p>
            </article>
            <article>
            <div class="ponudba-img-text">
                    <img src="images/ponudba-2.png" id="ponudba-img" alt="">
                    <div class="ponudba-text-overlay">
                        <h2>Aktivno v <br/>poletje</h2>
                    </div><!-- overlay-->
                </div><!-- container-->
                <p>V kolikor zimske počitnice 14.2. - 25.2. 2020 rezervirate še letos vam ob takojšnjem plačilo priznamo 15% popust. Paket velja za apartma za osem oseb. Veselimo se vašega obiska in obljubljamo vam zelo prijetno izkušnjo. Za posebno akcijo nas pokličite ali pišite in povejte kodo za popust: Martinpočitnice2020</p>
            </article>
            <br/>
        </div>
        <p class="ponudba-reyervacija-middle">rezervacije na: <b>+386 40 500 386</b> ali <b>info@penzionmartin.si</b></p>
    </section>
    <!-- Vedno kaj za početi -->
    <section class="reservation-form">
      <div class="reservation-form-width">
        <form action="">
          <select  class="reservation-form-spacing" id="picker" name="" id="">
            <option value="">Velikost apartmaja</option>
          </select>
          <input class="reservation-form-spacing" type="text" placeholder="Od" id="datepicker-1" readonly="readonly">
          <input class="reservation-form-spacing" type="text" placeholder="Do" id="datepicker-2" readonly="readonly">
          <input class="reservation-form-spacing" type="text" placeholder="Vaš email naslov">
          <input class="reservation-form-spacing" id="submit-form" type="submit" value="pošlji povpraševanje">
        </form>
      </div><!-- Reservation form width-->
    </section><!-- Form for reservation-->
    <!-- Contact form -->
    <section class="contact-with-map">
    <footer>
      <div class="footer-about-company">
        <div class="footer-content">
          <img src="images/logo-test.png" class="footer-logo" alt=""><br/>
          <img src="images/3-stars.png" class="footer-stars" alt="">
          <h5>HOTEL MARTIN POHORJE d.o.o.</h5>
          <p><b>lokacija:</b></p>
          <p>Nekje na Pohorju 8</p>
          <br/>
          <p><b>pisarne:</b></p>
          <p>Glavni trg 17B, Maribor</p> 
          <p>2000 Maribor</p>
          <br/>
          <p><b>tel.:</b> +386 40 500 386</p>
          <p><b>email:</b> info@penzionmartin.si</p>
        </div>
        <div class="footer-legal">
          <p class="footer-legal-left">2019 © Vse pravice pridržane</p>
          <a href="#"><p class="footer-legal-right">Pogoji uporabe spletne strani</p></a>
        </div>
      </div>
      <div id="map"></div>
    </footer>

    </section>
    <!-- Contact form -->
</main>


<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlHcn8VT3VXES96cPWkjQzwQm_5rW8uLg&callback=initMap"></script>
<script src="js/script.js"></script>
</body>

</html>