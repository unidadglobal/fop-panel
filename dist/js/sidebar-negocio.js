$(document).ready(function () {
    $("#sidebar-menu").html(
        `
            <li>
                <a href="inicio.php">
                <i class="fa fa-arrow-circle-right"></i> 
                <span>Canales</span>
                </a>
            </li>
            <li>
              <a href="posicionar_canales.php">
              <i class="fa fa-arrow-circle-right"></i> 
              <span>Posicionar Canales</span>
              </a>
          </li>
          <li>
              <a href="admin_videos.php">
              <i class="fa fa-arrow-circle-right"></i> 
              <span>Videos</span>
              </a>
          </li>
          <li>
              <a href="admin_noticias.php">
              <i class="fa fa-arrow-circle-right"></i> 
              <span>Noticias</span>
              </a>
          </li>
          <li>
              <a href="admin_categorias.php">
              <i class="fa fa-arrow-circle-right"></i> 
              <span>Categorías</span>
              </a>
          </li>
          <li>
              <a href="posicionar_categorias.php">
              <i class="fa fa-arrow-circle-right"></i> 
              <span>Posicionar Categorías</span>
              </a>
          </li>
          <li>
              <a href="admin_publicidad.php">
              <i class="fa fa-arrow-circle-right"></i> 
              <span>Publicidad</span>
              </a>
          </li>
          <li>
              <a href="datos_pagina.php">
              <i class="fa fa-arrow-circle-right"></i> 
              <span>Datos del Sitio</span>
              </a>
          </li>
        `
    );
});