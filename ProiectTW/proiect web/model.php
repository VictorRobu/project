<?php

class Car {
  public $judet;
  public $rar_category;
  public $vehicle_comm_categ;
  public $vehicle_brand;
  public $commercial_description;
  public $count;
  public $year;

  public function __construct(string $judet, string  $rar_category, string $vehicle_comm_categ,string $vehicle_brand,string $commercial_description,int $count,int $year) {
    $this->judet = $judet;
    $this->rar_category = $rar_category;
    $this->vehicle_comm_categ = $vehicle_comm_categ;
    $this->vehicle_brand = $vehicle_brand;
    $this->commercial_description = $commercial_description;
    $this->count =$count;
    $this->year=$year;
  }
};



?>