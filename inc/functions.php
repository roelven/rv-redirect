<?php

// Add ezSQL DB wrapper
include_once 'ezSQL/ez_sql_core.php';
include_once 'ezSQL/ez_sql_mysql.php';

$host     = $_SERVER['SERVER_NAME'];
$database = getenv('CLEARDB_DATABASE_URL');

// XXX: I couldn't get getenv() to work on my mac environment, this is a workaround
if (!$database) {
  require_once('connect.php');
}

$url      = parse_url($database);
$db       = new ezSQL_mysql($url['user'], $url['pass'], substr($url['path'], 1), $url['host']);

$send_to = $db->get_row("SELECT redirect_uri FROM domains WHERE host = ".$host);

print $send_to->redirect_uri;

$db->debug();
?>