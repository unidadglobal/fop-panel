<?php include "./class_lib/sesionSecurity.php"; ?>
<!DOCTYPE html>
<html>

<head>
    <title>Transmitir en Vivo</title>
    <?php include "./class_lib/links.php"; ?>
    <?php include "./class_lib/scripts.php"; ?>
    <link rel="stylesheet" href="webcam.css" />
    <script src="js/MediaStreamRecorder.js"></script>
    <script src="dist/js/transmitir.js"></script>

</head>

<body>

    <div class="wrapper">
        <!-- Main Header -->
        <header class="main-header">
            <!-- Logo -->
            <?php
            include('class_lib/nav_header.php');
            ?>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <?php
            include('class_lib/sidebar.php');
            ?>
            <!-- /.sidebar -->
        </aside>
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <?php
            include('loader.php');
            ?>
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1>Transmitir en Vivo</h1>
                <ol class="breadcrumb">
                    <li><a href="inicio.php"> Inicio</a></li>
                    <li class="active"> Transmitir en Vivo</li>
                </ol>
            </section>
            <!-- Main content -->
            <section class="content">
                <!-- Your Page Content Here -->
                <div class="row">
                    <div class='col-md-6'>
                        <div class="webcam">
                            <div class="video-outer d-none">
                                <video id="video" height="100%" width="100%" autoplay></video>
                            </div>
                            <div class="no-video-container d-block">
                                <div class="bg-dark no-video w-100 h-100 d-flex justify-content-center align-items-center" style="min-height:380px">
                                    <span class="text-light">NO ESTÁS TRANSMITIENDO</span>
                                </div>
                            </div>


                            <div class="webcam-start-stop">
                                <button class="btn btn-success btn-start d-flex" onclick="start()">VER CÁMARA</button>
                                <button class="btn btn-danger btn-transmitir d-none">TRANSMITIR</button>
                                <button class="btn btn-secondary btn-stop" onclick="StopWebCam()">DETENER</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col novideo-msg d-block">
                                <div class="container bg-danger d-flex justify-content-center align-items-center pt-2 text-center" style="border-radius:15px">
                                    <h5 class="text-light">ESTADO: NO ESTÁS TRANSMITIENDO</h5>
                                </div>
                            </div>
                            <div class="col live-msg d-none">
                                <div class="container bg-success d-flex justify-content-center align-items-center pt-2 text-center" style="border-radius:15px">
                                    <h5 class="text-light">ESTADO: TRANSMITIENDO EN VIVO</h5>
                                </div>
                            </div>
                            <div class="col error-msg d-none">
                                <div class="container bg-warning d-flex justify-content-center align-items-center pt-2 text-center" style="border-radius:15px">
                                    <h5 class="text-light">ESTADO: ERROR DE CONEXIÓN</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section><!-- /.content -->
        </div><!-- /.content-wrapper -->


        <!-- Main Footer -->
        <?php
        include('class_lib/main_footer.php');
        ?>

        <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
        <div class="control-sidebar-bg"></div>
    </div><!-- ./wrapper -->

    <!-- REQUIRED JS SCRIPTS -->
    <script src="dist/js/sidebar-negocio.js"></script>

    <script src="plugins/moment/moment.min.js"></script>



</body>

</html>