<?php

	class database {

		private static $servername = "localhost";
		private static $username = "root";
		private static $password = "";
		private static $dbname = "thechallenger";

		public static function getPdo(){
			if(stristr(PHP_OS, 'DAR'))	self::$password = "root";
			try {
				$bdd = new PDO("mysql:host=".self::$servername.";dbname=".self::$dbname,self::$username,self::$password);

				/* set the PDO error mode to exception
				*
				* ATTR_ERRMODE : Les exceptions non attrappées deviennent des erreurs fatales.
				* ERRMODE_EXCEPTION :  "contourner" le point critique de votre code, vous montrer rapidement le problème rencontré
				* et structure notre gestionnaire d'erreur*/

				$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				/*Test de connexion établie*/

				/*echo "Connected successfully<br/>";*/
			} catch(PDOException $e){
				echo "Connection failed: " . $e->getMessage(). "<br/>";
				die();
			}

			return $bdd;
		}
	}
?>
