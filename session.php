<?php

    class Session {

		function __construct() {
			session_start();
		}
	
        public static function getSession() {
			
            if(!isset($_SESSION)){
                session_start();
			}
            return $_SESSION;
        }

		public function getValue($key) {
			
			if(!isset($_SESSION)){
                return FALSE;
			}
            return $_SESSION;
		}
		
        public static function setValue($key,$value){
            $_SESSION[$key] = $value;
        }

        public static function clearLogin(){
            if(isset($_SESSION["idUser"]))
                unset($_SESSION["idUser"]);
        }
    }
	
 ?>
 
 