<?php include "./class_lib/sesionSecurity.php"; ?>
<!DOCTYPE html>
<html>
  <head>
    <title>Publicidad</title>
    <?php include "./class_lib/links.php"; ?>
    <?php include "./class_lib/scripts.php"; ?>
    <script src="dist/js/admin_publicidad.js"></script>
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
      <div id="contenido" class="content-wrapper">
        <?php include('loader.php'); ?>
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1 style="display:inline-block">
            Publicidad
          </h1>
          <ol class="breadcrumb">
            <li><a href="inicio.php"> Inicio</a></li>
            <li class="active">Publicidad</li>
          </ol>
        </section>
        <!-- Main content -->
        <section class="content pb-5">
         <!-- Your Page Content Here -->
          <div class='row'>
          
          <div class="col-md-12"> <!-- CONTENEDOR IMAGENES DE PORTADA -->
            <div class="row mb-3">
                <div class="col">
                <div class="portada-div" >
                    <img id="img-portada1" class="imgportada" src="dist/img/noimage-wide.jpg" onerror="this.src='dist/img/noimage-wide.jpg';">
                    <input class="img-input" x-data="none" id="img-upload1" type="file" x-index="0" accept="image/*"/>
                    
                    <button class="btn btn-danger btn-sm rounded-0 btn-eliminar-portada text-center" type="button"><i class="fa fa-trash"></i></button>
                </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                <div class="portada-div" >
                    <img id="img-portada2" class="imgportada" src="dist/img/noimage-wide.jpg" onerror="this.src='dist/img/noimage-wide.jpg';">
                    <input class="img-input" x-data="none" id="img-upload2" type="file" x-index="1" accept="image/*"/>
                    <button class="btn btn-danger btn-sm rounded-0 btn-eliminar-portada text-center" type="button"><i class="fa fa-trash"></i></button>
                </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                <div class="portada-div" >
                    <img id="img-portada3" class="imgportada" src="dist/img/noimage-wide.jpg" onerror="this.src='dist/img/noimage-wide.jpg';">
                    <input class="img-input" x-data="none" id="img-upload3" type="file" x-index="2" accept="image/*"/>
                    <button class="btn btn-danger btn-sm rounded-0 btn-eliminar-portada text-center" type="button"><i class="fa fa-trash"></i></button>
                </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                <div class="portada-div" >
                    <img id="img-portada4" class="imgportada" src="dist/img/noimage-wide.jpg" onerror="this.src='dist/img/noimage-wide.jpg';">
                    <input class="img-input" x-data="none" id="img-upload4" type="file" x-index="3" accept="image/*"/>
                    <button class="btn btn-danger btn-sm rounded-0 btn-eliminar-portada text-center" type="button"><i class="fa fa-trash"></i></button>
                </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col">
                <div class="portada-div" >
                    <img id="img-portada5" class="imgportada" src="dist/img/noimage-wide.jpg" onerror="this.src='dist/img/noimage-wide.jpg';">
                    <input class="img-input" x-data="none" id="img-upload5" type="file" x-index="4" accept="image/*"/>
                    <button class="btn btn-danger btn-sm rounded-0 btn-eliminar-portada text-center" type="button"><i class="fa fa-trash"></i></button>
                </div>
                </div>
            </div>
                
             
              
            </div>  
            
            

          </div>
        </section><!-- /.content -->
         </div><!-- /.content-wrapper -->
        
        
        <!-- Modal FOTO PORTADA-->
        <div class="modal fade" id="ModalUploadImg" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="ModalUploadImgLabel" aria-hidden="true">
          <div class='modal-dialog mw-100' role="document" style="width: 930px !important">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalUploadImgLabel">¿Subir esta imagen?</h5>
                <span id="id-input" style="display:none"></span>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div style="width: 850px;height:400px">
                  <img id="verificar-subida-img"  style="display: block;max-width: 100%;">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button id="btn-subir-img" type="button" class="btn btn-primary">SUBIR</button>
              </div>
            </div>
          </div>
        </div><!--FIN MODAL FOTO-->


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