<?php
$mysqli = connect();

$result = $mysqli->query("SELECT * FROM puntuaciones");	

if (!$result) {
    echo "Problema al hacer un query: " . $mysqli->error;								//s
} else {
    // Recorremos los resultados devueltos
    $rows = array();
    while( $r = $result->fetch_assoc()) {
        $rows[] = $r;
    }			
    // Codificamos los resultados a formato JSON y lo enviamos al HTML (Client-Side)
    echo json_encode($rows);
}

function connect(){
    $databasehost = "31.170.160.1";
    $databasename = "u840845621_GraficasWeb";
    $databaseuser = "u840845621_gweb";
    $databasepass = "Zomrromr2";

    $mysqli = new mysqli($databasehost, $databaseuser, $databasepass, $databasename);
    if ($mysqli->connect_errno) {
        echo "Problema con la conexion a la base de datos";
    }
    return $mysqli;
}
?>