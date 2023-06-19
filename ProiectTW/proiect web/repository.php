<?php
require __DIR__ . "/model.php";
class CarRepository
{
  protected $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function getCars()
  {
    $carsRows = $this->db->
      query("SELECT * FROM parcAuto")->fetchAll();


    $cars = array();

    foreach ($carsRows as $row) {
      array_push($cars, new Car(
        $row['judet'],
        $row['rar_category'],
        $row['vehicle_comm_categ'],
        $row['vehicle_brand'],
        $row['commercial_description'],
        $row['count'],
        $row['year']
      )
      );
    }


    return $cars;
  }


  // adds the brands in the where clause
  private function brands($brands)
  {
    for ($i = 0; $i < count($brands); $i++) {
      $brands[$i] = strtoupper($brands[$i]);
    }
    $camp = ' vehicle_brand like ';
    $del = ' or ';
    $result = '';
    $n = count($brands);
    if ($n > 0)
      $result = $camp . "'" . $brands[0] . "'";
    for ($i = 1; $i < $n; $i++) {
      $result .= $del . $camp . "'" . $brands[$i] . "'";
    }
    return $result;
  }

  // adds the categories in the where clause
  private function categorii($categorii)
  {
    for ($i = 0; $i < count($categorii); $i++) {
      $categorii[$i] = strtoupper($categorii[$i]);
    }
    $camp = ' rar_category like ';
    $del = ' or ';
    $result = '';
    $n = count($categorii);
    if ($n > 0)
      $result = $camp . "'" . $categorii[0] . "'";
    for ($i = 1; $i < $n; $i++) {
      $result .= $del . $camp . "'" . $categorii[$i] . "'";
    }
    return $result;
  }

  // adds the years in the where clause
  private function ani($ani)
  {
    $camp = ' year= ';
    $del = ' or ';
    $result = '';
    $n = count($ani);
    if ($n > 0)
      $result = $camp . $ani[0];
    for ($i = 1; $i < $n; $i++) {
      $result .= $del . $camp . $ani[$i];
    }
    return $result;
  }

  // adds counties in the where clause
  private function judete($judete)
  {
    for ($i = 0; $i < count($judete); $i++) {
      $judete[$i] = strtoupper($judete[$i]);
    }
    $camp = ' judet like ';
    $del = ' or ';
    $result = '';
    $n = count($judete);
    if ($n > 0)
      $result = $camp . "'" . $judete[0] . "'";
    for ($i = 1; $i < $n; $i++) {
      $result .= $del . $camp . "'" . $judete[$i] . "'";
    }
    return $result;
  }


  // returns an array corresponding to the query results
  // the criteriu parameter defines which of the four criteria will be used to form the array of results
  // the rest of the criteria parameters will be used inside every where clause
  public function getCarsNumber($ani, $judete, $brands, $categorii, $criteriu)
  {


    $del = ' and ';
    $query = 'SELECT sum(count) FROM parcAuto';
    $result = array();

    if ($criteriu == 'Judet') {
      $nr = 0;
      foreach ($judete as $judet) {
        $judet = strtoupper($judet);
        $newQuery = $query . ' where judet like ' . "'" . $judet . "'";

        // adds the rest of the clause
        $param = $this->ani($ani);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->categorii($categorii);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->brands($brands);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";

        $stmt = $this->db->prepare($newQuery);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        $result[$nr] = $count;
        $nr++;
      }
    }
    if ($criteriu == 'Categorie') {
      $nr = 0;
      foreach ($categorii as $categorie) {
        $categorie = strtoupper($categorie);
        $newQuery = $query . ' where rar_category like ' . "'" . $categorie . "'";

        // adds the rest of the clause
        $param = $this->ani($ani);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->judete($judete);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->brands($brands);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";


        $stmt = $this->db->prepare($newQuery);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        $result[$nr] = $count;
        $nr++;
      }
    }
    if ($criteriu == 'Brand') {
      $nr = 0;
      foreach ($brands as $brand) {
        $brand = strtoupper($brand);
        $newQuery = $query . ' where vehicle_brand like ' . "'" . $brand . "'";

        // adds the rest of the clause
        $param = $this->ani($ani);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->categorii($categorii);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->judete($judete);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";


        $stmt = $this->db->prepare($newQuery);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        $result[$nr] = $count;
        $nr++;
      }
    }
    if ($criteriu == 'An') {
      $nr = 0;
      foreach ($ani as $an) {
        $newQuery = $query . ' where year= ' . "'" . $an . "'";

        // adds the rest of the clause
        $param = $this->categorii($categorii);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->judete($judete);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";
        $param = $this->brands($brands);
        if (strlen($param) > 0)
          $newQuery .= $del . "( " . $param . " )";


        $stmt = $this->db->prepare($newQuery);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        $result[$nr] = $count;
        $nr++;
      }
    }
    return $result;



  }
  public function getTotalCarsNumber()
  {
 
    $query = 'SELECT count(*) FROM parcAuto';
    $stmt = $this->db->prepare($query);
    $stmt->execute();
    $count = $stmt->fetchColumn();

    return $count;
  }
  public function saveCar($car)
  {
    $sql = "INSERT INTO parcAuto (judet, rar_category,vehicle_comm_categ,vehicle_brand,commercial_description,count,year) VALUES (?,?,?,?,?,?,?)";

    $stmt = $this->db->prepare($sql);

    $stmt->execute([$car->judet, $car->rar_category, $car->vehicle_comm_categ, $car->vehicle_brand, $car->commercial_description, $car->count, $car->year]);
  }
}



?>