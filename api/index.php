<?php
	require_once("identifiants.php");
	require_once("constants.php");
	require_once('model/routing.php');

	require_once("controller/userController.php");
	require_once("controller/postController.php");

	//Permet d'include les classes depuis le controller directement sans avoir à cité le controller
	function __autoload($class_name){
		require_once 'controller/'.$class_name . '.php';
	}

    $routing = new ROUTING();
    $route = $routing->getRoute();

    $root = $routing->getRoot();
    $parameter = $routing->getParameter();
    
	//Class Manager or route
	if(strpos($route,".php") !== false){
		include(__DIR__.'/'.$route);
	} else {
		try {
			$explode = explode("@",$route);
			$c = $explode[0]; // La classe demandé
			$m = $explode[1]; // La méthode appelée
			//Appel de la méthode
			if($parameter != ""){
				$c::$m($parameter);
			} else {
				$c::$m();
			}
		} catch(Exception $e){
			echo($e->getLine()." : ".$e->getMessage());
		}
	}
?>
