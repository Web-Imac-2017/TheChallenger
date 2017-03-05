<?php

    use Carbon\Carbon;

    class Session {
        private static $date_of_creation;
        private static $break = 1800000; //30 minutes de session autorisé

        public static function getSession(){
            if(!isset($_SESSION)){
                session_start();
                //TODO Ajoutez la déconnexion au bout d'un certain temps (LOW PRIORITY)
            }
            return $_SESSION;
        }

        public static function addToSession($key,$value){
            $_SESSION[$key] = $value;
        }

        public static function clearLogin(){
            if(isset($_SESSION["idUser"]))
                unset($_SESSION["idUser"]);
            if(isset($_SESSION["dateOfCreation"]))
                unset($_SESSION["dateOfCreation"]);
        }
    }

 ?>
