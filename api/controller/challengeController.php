<?php

require_once("model/challenge.php");
require_once("model/database.php");
$user=new User();
$post = new Post();

class challengeController {

	// Informations/affichage d'un challenge
	
    public static function infos($id){
            
		$challenge = Challenge::challenge_exists($id);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
        echo(json_encode($challenge->toArray()));
    }
	
	// Ajouter un challenge à la BDD
	public static function add_challenge() {
		
		//global $user;
		// if ($user->is_connected(MODERATEUR)) {
			$title=(!empty($_POST['title']))? $_POST['title']:"";
			$desc=(!empty($_FILES['desc']))? $_FILES['desc']:"";
			$date_start=(!empty($_POST['date_start']))? $_POST['date_start']:"";
			$date_stop=(!empty($_POST['date_stop']))? $_POST['date_stop']:"";
			$db = database::getPDO();
			$query=$db->prepare('INSERT INTO thechallenger.challenge (title, description, datestart, datestop) VALUES(:title,:desc,:date_start,:date_stop)');
			$query->bindParam(':title',$title,PDO::PARAM_STR);
			$query->bindParam(':desc',$desc,PDO::PARAM_STR);
			$query->bindParam(':date_start',$date,PDO::PARAM_STR);
			$query->bindParam(':date_stop',$date,PDO::PARAM_STR);
			$query->execute();
			$query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "Success : challenge added"]));;
		// }
	}
	
	
	// Modifier un challenge dans la BDD
	public static function update_challenge($idchallenge) {
		
		$challenge = Challenge::challenge_exists($idchallenge);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
		global $user;
		if ($user->is_connected(MODERATEUR)) {
			
			$title=(!empty($_POST['title']))? $_POST['title']:"";
			$desc=(!empty($_FILES['desc']))? $_FILES['desc']:"";
			$date_start=(!empty($_POST['date_start']))? $_POST['date_start']:"";
			$date_stop=(!empty($_POST['date_stop']))? $_POST['date_stop']:"";
			$db = database::getPDO();
			$query=$db->prepare('UPDATE thechallenger.challenge SET title=:title,description=:desc,datestart=:date_start,datestop=:date_stop WHERE id=:idchallenge');
			$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
			$query->bindParam(':title',$title,PDO::PARAM_STR);
			$query->bindParam(':desc',$desc,PDO::PARAM_STR);
			$query->bindParam(':date_start',$date,PDO::PARAM_STR);
			$query->bindParam(':date_stop',$date,PDO::PARAM_STR);
			$query->execute();
			$query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "Success : challenge updated"]));
		}
	}
	
	// Suppression d'un challenge
	public static function delete_challenge($idchallenge){
		
		$challenge = Challenge::challenge_exists($idchallenge);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
		global $user;
		if ($user->is_connected(MODERATEUR)) {
		
			global $db;
			$query=$db->prepare('DELETE FROM thechallenger.challenge WHERE id=:idchallenge');
			$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "Success : challenge deleted"]));
		}
	}

	public static function add_post() {
		
		//Post::addpost($id);
	}

	// retourner tous les posts d'un challenge

	public static function show_posts($idchallenge) {
		
		$challenge = Challenge::challenge_exists($idchallenge);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
		$posts = Challenge::getPosts($idchallenge);
		$result_tab = array();
		for ($i=0; $i<count($posts); $i++) {
			Post::toArray($posts[$i]);
		}
	}
	
}
?>
