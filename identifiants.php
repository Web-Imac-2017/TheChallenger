<?php
try
{
	$pwd = "";
	if(stristr(PHP_OS, 'DAR'))	$pwd = "root";
	$db = new PDO('mysql:host=localhost;dbname=thechallenger', 'root', $pwd);
	$db->exec("SET CHARACTER SET utf8"); 
}
catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}
?>