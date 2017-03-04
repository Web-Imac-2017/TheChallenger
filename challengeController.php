<?php

    require_once("challenge.php");

    class challengeController {

		// Informations/affichage d'un challenge
		
        public static function infos($id){
            $challenge = Challenge::challenge_exists($id);
            echo(json_encode($challenge->toArray()));
        }
		
    }
?>
