<?php
  session_start();
  date_default_timezone_set("America/Argentina/Buenos_Aires");
  
  if ($_SESSION['tipo_usuario'] != "admin"){
    if (isset($_GET["id"]) && strlen($_GET["id"]) > 0){
      if ($_GET["id"] != $_SESSION['id_negocio']){
        header("Location: index.php");    
      }
    }
  }
  
  if($_SESSION['autorizado']<>1){
    header("Location: index.php");
  }
?>