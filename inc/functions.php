<?php

$database = getenv('CLEARDB_DATABASE_URL');

if (!$database) {
  require_once('connect.php');
}




?>