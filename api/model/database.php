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
				$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			} catch(PDOException $e){
				echo "Connection failed: " . $e->getMessage(). "<br/>";
				die();
			}
			return $bdd;
		}
	}
?>
