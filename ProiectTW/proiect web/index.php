<?php

require __DIR__."/database_helpers.php";
require __DIR__."/repository.php";

$db = get_db_connection();

initialize_db($db);


$cars_repo = new CarRepository($db);
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI']==='/json-handler'){

  
  $json=file_get_contents('php://input');
  $obj = json_decode($json);

  $myArr =  $cars_repo->getCarsNumber($obj->ani, $obj->judete, $obj->brands, $obj->categorii, $obj->criteriu);

  $myJSON = json_encode($myArr);

  echo $myJSON;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI']==='/') {
    // insert_data($db);
    readfile("./html/home.html");
}
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI']==='/1') {
  $data =$cars_repo->getTotalCarsNumber();
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data);
}





?>
