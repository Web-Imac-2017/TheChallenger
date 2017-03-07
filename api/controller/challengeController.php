<?php

require_once("model/challenge.php");

class challengeController {
	
	$user=new User();

	// Informations/affichage d'un challenge
	
    public static function infos($id){
            
		$challenge = Challenge::challenge_exists($id);
        echo(json_encode($challenge->toArray()));
    }
	
	// Ajouter un challenge à la BDD
	public static function add_challenge() {
		
		global $user;
		// if ($user->is_connected(MODERATEUR)) {
			$title=(!empty($_POST['title']))? $_POST['title']:"";
			$desc=(!empty($_FILES['desc']))? $_FILES['desc']:"";
			$date_start=(!empty($_POST['date_start']))? $_POST['date_start']:"";
			$date_stop=(!empty($_POST['date_stop']))? $_POST['date_stop']:"";
			global $db;
			$query=$db->prepare('INSERT INTO thechallenger.challenge (title, description, datestart, datestop) VALUES (:title,:desc,:date_start,:date_stop)');
			$query->bindParam(':title',$title,PDO::PARAM_STR);
			$query->bindParam(':desc',$desc,PDO::PARAM_STR);
			$query->bindParam(':date_start',$date,PDO::PARAM_STR);
			$query->bindParam(':date_stop',$date,PDO::PARAM_STR);
			$query->execute();
			$query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "Success : challenge added"]));
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
			global $db;
			$query=$db->prepare('UPDATE thechallenger.challenge SET title=:title,desc=:desc,datestart=:date_start,datestop=:date_stop WHERE id=:idchallenge');
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
		$query=$db->prepare('DELETE FROM thechallenger.challenge WHERE id=:idchallenge');
        $query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
		echo(json_encode(["code" => 1,"message" => "Success : challenge deleted"]));
	}

	public static function add_post() {
		
		//Post::addpost($id);
	}

	// Envoyer tous les posts d'un challenge
	public static function show_posts($idchallenge) {
		
		$challenge = Challenge::challenge_exists($idchallenge);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
		$post = $challenge->getPosts();
		$result_tab = array();
		foreach ($post as $p) array_push($result_tab, $p->toArray());
		echo(json_encode($result_tab));
	}
	
}
?>
