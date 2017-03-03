<?php
try
{
	$db = new PDO('mysql:host=localhost;dbname=thechallenger', 'root', 'root');
	$db->exec("SET CHARACTER SET utf8"); 
}
catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}
?>