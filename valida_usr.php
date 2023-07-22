<?php
error_reporting(0);
session_start();

include('./class_lib/funciones.php');

$usuario=test_input($_POST['usuario']);
$password=test_input($_POST['pass']);
$uid=test_input($_POST['uid']);
$tipo_usuario=$_POST["tipousuario"];

$_SESSION['autorizado']=1;
$_SESSION['nombre_de_usuario']=$_POST["nombre"];
$_SESSION['clave']=$password;
$_SESSION['id_usuario'] = $uid;
$_SESSION['tipo_usuario'] = $tipo_usuario;
$_SESSION['id_negocio'] = $_POST["idTienda"];
$_SESSION['short_name'] = $_POST["shortName"];
$_SESSION['imageUrl'] = $_POST["imagen"];

if ($tipo_usuario == "vendedor" && $_POST["idTienda"] != null){
  $idNegocio = $_POST["idTienda"];
  $shortName = $_POST["shortName"];
  echo "
  <script>
    document.location.href = 'admin_negocio.php?id=$idNegocio&negocio=$shortName';
  </script>
  ";
  
}
else if ($tipo_usuario == "admin"){
  echo "
  <script>
    document.location.href = 'inicio.php';
  </script>
  ";
}


?>