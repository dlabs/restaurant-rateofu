<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags-->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Title Page-->
  <title>Apartmaji Martin</title>
  <!-- Jquery JS-->
  <script src="<?= base_url(); ?>/assets/vendor/jquery-3.2.1.min.js"></script>
  <!-- Fontfaces CSS-->
  <link href="<?= base_url(); ?>assets/css/font-face.css" rel="stylesheet" media="all">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet"
    media="all">
  <link href="<?= base_url(); ?>assets/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet"
    media="all">
  <link href="<?= base_url(); ?>assets/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">
  <!-- Vendor CSS-->
  <link href="<?= base_url(); ?>assets/vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
  <link href="<?= base_url(); ?>assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css"
    rel="stylesheet" media="all">
  <link href="<?= base_url(); ?>assets/vendor/wow/animate.css" rel="stylesheet" media="all">
  <link href="<?= base_url(); ?>assets/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
  <link href="<?= base_url(); ?>assets/vendor/slick/slick.css" rel="stylesheet" media="all">
  <link href="<?= base_url(); ?>assets/vendor/select2/select2.min.css" rel="stylesheet" media="all">
  <link href="<?= base_url(); ?>assets/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">
  <link href="<?= base_url(); ?>assets/vendor/vector-map/jqvmap.min.css" rel="stylesheet" media="all">

  <link href="<?= base_url(); ?>assets/css/pell.min.css" rel="stylesheet" media="all">
  <!-- Main CSS-->
  <link href="<?= base_url(); ?>assets/css/theme.css" rel="stylesheet" media="all">
  <!-- Custom CSS-->
  <link href="<?= base_url(); ?>assets/css/custom.css" rel="stylesheet" media="all">
  <script type="text/javascript"
    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css" />
</head>

<body class="animsition">
  <div class="page-wrapper">
    <!-- MENU SIDEBAR-->
    <aside class="menu-sidebar2">
      <div class="logo">
        <a href="#">
          <img src="<?= base_url(); ?>assets/hotel/images/logo.svg" alt="Cool Admin" />
        </a>
      </div>
      <div class="menu-sidebar2__content js-scrollbar1">
        <div class="account2">
          <div class="image img-cir img-120">
            <img src="<?= base_url(); ?>assets/images/icon/avatar-big-01.jpg" alt="John Doe" />
          </div>
          <h4 class="name">Admin</h4>
          <a href="logout">Sign out</a>
        </div>
        <nav class="navbar-sidebar2">
          <ul class="list-unstyled navbar__list">
            <li>
              <a href="<?= base_url(); ?>admin">
                <i class="fa fa-home"></i>Home</a>
            </li>
            <!--<li>
                            <a href="users/apartman/add_apartman">
                                <i class="fas fa-envelope"></i>Dodaj apartman</a>
                        </li>-->
            <li>
              <a href="<?= base_url(); ?>users/apartman">
                <i class="fa fa-building"></i>Uredi apartman</a>
            </li>
            <li>
              <a href="<?= base_url(); ?>users/apartman/promotion">
                <i class="fa fa-users"></i>Uredi promocijo</a>
            </li>
            <li>
              <a href="<?= base_url(); ?>users/translation">
                <i class="fa fa-language"></i>Uredi prevode</a>
            </li>
            <li>
              <a href="<?= base_url(); ?>users/doplacila">
                <i class="fa fa-money"></i>Uredi doplačila</a>
            </li>
            <li>
              <a href="<?= base_url(); ?>users/podjetje">
                <i class="fa fa-clipboard"></i>Uredi podatke podjetja</a>
            </li>
            <li>
              <a href="<?= base_url(); ?>users/terms">
                <i class="fa fa-address-book"></i>Uredi pogoje</a>
            </li>
            <li>
              <a href="<?= base_url(); ?>users/images">
                <i class="fa fa-picture-o"></i>Uredi fotografije</a>
            </li>
            <li>
              <a href="<?= base_url(); ?>users/icons">
                <i class="fa fa-font-awesome"></i>Uredi ikone</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <!-- END MENU SIDEBAR-->

    <!-- PAGE CONTAINER-->
    <div class="page-container2">
      <!-- HEADER DESKTOP-->
      <header class="header-desktop2">
      </header>
      <aside class="menu-sidebar2 js-right-sidebar d-block d-lg-none">
        <div class="logo">
          <a href="#">
            <img src="<?= base_url(); ?>assets/images/icon/logo-white.png" alt="Apartma Martin logo" />
          </a>
        </div>
        <div class="menu-sidebar2__content js-scrollbar2">
          <div class="account2">
            <div class="image img-cir img-120">
              <img src="<?= base_url(); ?>assets/images/icon/avatar-big-01.jpg" alt="John Doe" />
            </div>
            <h4 class="name">john doe</h4>
            <a href="logout">Sign out</a>
          </div>
        </div>
      </aside>
      <!-- END HEADER DESKTOP-->

      <!-- BREADCRUMB-->
      <section class="au-breadcrumb m-t-75">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="au-breadcrumb-content">
                  <div class="au-breadcrumb-left">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- END BREADCRUMB-->
      <!-- 
				Main Content Goes Here
			-->
      <div id="wrap">
        <!-- Begin page content -->
        <div class="container white">
          <?php

          ?>
          <?php $this->load->view($main); ?>
          <div id="push"></div>
        </div>
      </div>
      <!-- 
				Main Content Goes Here
			-->
      <section id="footer">
        <div class="container">
          <p>Copyright © <?= date("Y"); ?> Apartmaji Martin.</p>
        </div>
      </section>
      <!-- END PAGE CONTAINER-->
    </div>

  </div>
  <!-- Bootstrap JS-->
  <script src="<?= base_url(); ?>assets/vendor/bootstrap-4.1/popper.min.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/bootstrap-4.1/bootstrap.min.js"></script>
  <!-- Vendor JS       -->
  <script src="<?= base_url(); ?>assets/vendor/slick/slick.min.js">
  </script>
  <script src="<?= base_url(); ?>assets/vendor/wow/wow.min.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/animsition/animsition.min.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js">
  </script>
  <script src="<?= base_url(); ?>assets/vendor/counter-up/jquery.waypoints.min.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/counter-up/jquery.counterup.min.js">
  </script>
  <script src="<?= base_url(); ?>assets/vendor/circle-progress/circle-progress.min.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/chartjs/Chart.bundle.min.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/select2/select2.min.js">
  </script>
  <script src="<?= base_url(); ?>assets/vendor/vector-map/jquery.vmap.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/vector-map/jquery.vmap.min.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/vector-map/jquery.vmap.sampledata.js"></script>
  <script src="<?= base_url(); ?>assets/vendor/vector-map/jquery.vmap.world.js"></script>

  <!-- Main JS-->
  <script src="<?= base_url(); ?>assets/js/main.js"></script>
  <script src="<?= base_url(); ?>assets/js/custom.js"></script>

</body>

</html>
<!-- end document-->