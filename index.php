<?php
require_once('inc/functions.php');

header('HTTP/1.1 301 Moved Permanently'); 
header('Location: http://'.$location);

?>