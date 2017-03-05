<?php
	require_once("identifiants.php");
	require_once('model/routing.php');
	require_once("controller/userController.php");


	//Permet d'include les classes depuis le controller directement sans avoir à cité le controller
	// function __autoload($class_name){
	// 	require_once 'controller/'.$class_name . '.php';
	// }

    $routing = new ROUTING();
    $route = $routing->getRoute();

    $root = $routing->getRoot();
    $parameter = $routing->getParameter();

	// var_dump(Session::getSession());

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

<html>
<head>
	<title>The Challenger</title>
	<meta charset="utf-8">
</head>
<body>
	<!-- <form method="POST" action="user.php" autocomplete="on">
		<input name="name" type="text" maxlength="20" placeholder="nom / name" required>
		<input name="pwd" type="password" maxlength="100" placeholder="mot de passe" required>
		<input name="pwdconfirm" type="password" maxlength="100" placeholder="confirmer mot de passe" required>
		<input name="email" type="text" maxlength="150" placeholder="email" required>
		<input type="submit">
	</form> -->

	<div id="app"></div>
	<script src="./dist/app/bundle.js"></script>
</body>
</html>
