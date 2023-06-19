<?php

    function get_db_connection() {
      try {
        $db = new PDO('sqlite:parcAuto.db');
        // $db = new \PDO("sqlite:" . "parcAuto.db");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      
        return $db;
      } catch (PDOException $ex) {
        echo $ex->getMessage();
      }
    }
    
    function initialize_db($db) {
      $db->exec(
        "
          CREATE TABLE IF NOT EXISTS countries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            size INTEGER
          );
      
          CREATE TABLE IF NOT EXISTS cities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            population INTEGER,
            country_id INTEGER,
            is_capital BOOLEAN
          );
          CREATE TABLE IF NOT EXISTS parcAuto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            judet TEXT,
            rar_category TEXT,
            vehicle_comm_categ TEXT,
            vehicle_brand TEXT,
            commercial_description TEXT,
            count INTEGER,
            year INTEGER
          );
        "
      );
    }
    
    function insert_data($db){
      ini_set('max_execution_time', '3000');
      $lines = file('parc-auto-2013.csv');
      // $lines=["",'"ARGES","AUTOTURISM","M1","MERCEDES BENZ","A 170 CDI","27"'];
      //450093
      //699055
      //968338
      //1258264
      //1569786
      //1902948
      //217380
      //2257127
      //2441711
      //1483669
      $cars_repo = new CarRepository($db);
      $count = 0;
      foreach($lines as $line) {
      $count += 1;
      if($count>1){
        $tokens = preg_split('/,"/',$line);
        for ($i = 0; $i < count($tokens); $i++){
          $empty="\0";
          $len = strlen($tokens[$i]);
          if($len>0)
            $tokens[$i][$len-1]=$empty[0];
        }
        $judet= substr($tokens[0], 1);
        // echo $tokens[1];
        // break;
        $newCar = new Car($judet, $tokens[1], $tokens[2], $tokens[3], $tokens[4], intval($tokens[5]),2013);
        $cars_repo->saveCar($newCar);
      }
      }
      echo 'Done';
    }

    function insert_dummy_data($db) {
      $db->exec(
        "
          INSERT INTO countries (name, size)
            VALUES ('Romania', 238397);
        
          INSERT INTO countries (name, size)
            VALUES ('South Africa', 1221037);
      
          INSERT INTO cities (name, population, country_id, is_capital)
            VALUES ('Bucuresti', 1883000, 1, true);
      
          INSERT INTO cities (name, population, country_id, is_capital)
            VALUES ('Iasi', 318000, 1, false);
      
          INSERT INTO cities (name, population, country_id, is_capital)
            VALUES ('Cape Town', 4618000, 2, true);
      
          INSERT INTO cities (name, population, country_id, is_capital)
            VALUES ('Pretoria', 2473000, 2, true);
      
          INSERT INTO cities (name, population, country_id, is_capital)
            VALUES ('Johannesburg', 5635000, 2, false);
        "
      );
    }
    ?>