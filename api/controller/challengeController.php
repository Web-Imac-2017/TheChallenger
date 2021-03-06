<?php

// require_once("model/challenge.php");
$user=new User();
$post = new Post();

class challengeController {

	// Informations/affichage d'un challenge
	
	public static function toArray($idchallenge) {
			
		$challenge = Challenge::challenge_exists($idchallenge);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
		global $db;
		$query=$db->prepare('SELECT * FROM challenge WHERE id=:idchallenge');
		$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		$time = self::getLeftTime($idchallenge);
		$item = [
			"id" => $idchallenge,
			"title" => $datas['title'],
			"description" => $datas['description'],
			"photo" => 'challenge/'.$datas['photo'],
			"datestart" => $datas['datestart'],
			"datestop" => $datas['datestop'],
			"timeleft" => $time
		];
		
		
		echo(json_encode($item));
	}

	
	// Ajouter un challenge à la BDD
	public static function add_challenge() {
		
		global $user;
		if ($user->is_connected(MODERATEUR)) {
			
			$challenge = new Challenge();
			global $db;
			// $db = database::getPDO();
			$title=(!empty($_POST['title']))? $_POST['title']:"";
			$desc=(!empty($_POST['desc']))? $_POST['desc']:"";
			$photo = (!empty($_FILES['photo']))? $_FILES['photo']:"";
			$date_stop=(!empty($_POST['date_stop']))? $_POST['date_stop']:"";			
			if (empty($title)) {
			
				echo(json_encode(["code" => 0,"message" => "Challenge name field empty"]));
				exit();
			}
			if (empty($desc)) {
					
				echo(json_encode(["code" => 0,"message" => "Challenge description field empty"]));
				exit();
			}
			
			if (empty($date_stop)) {
					
				echo(json_encode(["code" => 0,"message" => "Stop date challenge field empty"]));
				exit();
			}
			if (empty($photo)){
				
				echo(json_encode(["code" => 0,"message" => "photo challenge field empty"]));
				exit();
			}

			$testimage=Image::test_image($photo);
			if($testimage!=1 && $testimage!=2){ 
				echo(json_encode(["code" => 0,"message" => "photo error"]));
				exit();
			}

			$linkcontent=Image::move_image($photo,'../data/challenge');
			$query=$db->prepare('INSERT INTO challenge (title, description, photo, datestart, datestop) VALUES(:title,:desc, :linkcontent, NOW(),:date_stop)');
				
			
			$query->bindParam(':title',$title,PDO::PARAM_STR);
			$query->bindParam(':desc',$desc,PDO::PARAM_STR);
			$query->bindParam(':linkcontent',$linkcontent,PDO::PARAM_STR);
			$query->bindParam(':date_stop',$date_stop,PDO::PARAM_STR);
			$query->execute();
			$query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "Success : challenge added"]));;
		}
		else {
			
			echo(json_encode(["code" => 0, "message" => "Error : moderator and admin only"]));
			exit();		
		}
	}
	
	private static function getLeftTime($idchallenge){
		$challenge = Challenge::challenge_exists($idchallenge);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
		global $db;
		$query=$db->prepare('SELECT datestop FROM challenge WHERE id=:idchallenge');
		$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
		$query->execute();
		$stop=$query->fetch();
		$query->closeCursor();
		$date=strtotime($stop['datestop']);
		//$diff=$date-time();
		return $date;
	}

	public static function time_left($idchallenge) {
	
		$diff = getLeftTime($idchallenge);
		$days=round($diff/(60*60*24));
		$hours=round(($diff-$days*60*60*24)/(60*60));

		$time = [
		
			"days" => $days,
			"hours" => $hours,
		];
		echo (json_encode($time));
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
			$date_stop=(!empty($_POST['date_stop']))? $_POST['date_stop']:"";
			$db = database::getPDO();
			$query=$db->prepare('UPDATE challenge SET title=:title,description=:desc,datestop=:date_stop WHERE id=:idchallenge');
			$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
			$query->bindParam(':title',$title,PDO::PARAM_STR);
			$query->bindParam(':desc',$desc,PDO::PARAM_STR);
			$query->bindParam(':date_stop',$date_stop,PDO::PARAM_STR);
			$query->execute();
			$query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "Success : challenge updated"]));
		}
		else {
		
			echo(json_encode(["code" => 0, "message" => "Error : moderator and admin only"]));
			exit();
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
			$query=$db->prepare('DELETE FROM challenge WHERE id=:idchallenge');
			$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "Success : challenge deleted"]));
		}
		else {
		
			echo(json_encode(["code" => 0, "message" => "Error : moderator and admin only"]));
			exit();
		}
	}

	// retourner tous les posts d'un challenge

	public static function show_posts($idchallenge) {
		
		$challenge = Challenge::challenge_exists($idchallenge);
		if (!$challenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exist"]));
			exit();
		}
		$tab = Challenge::getPosts($idchallenge);
		/*$result_tab = array();
		for ($i=0; $i<count($tab); $i++) {
			$item = postController::returnArray($tab[$i]);
			array_push($result_tab, $item);
		}*/
		echo (json_encode($tab));
	}
	
	public static function current_challenges() {
			
		global $db;
		$query = $db->prepare('SELECT * FROM challenge');
		$query->execute();
		$tab = array();
		while ($datas = $query->fetch()) { 
			array_push($tab,$datas['id']);
		};
		$query->CloseCursor();
		$current = array();
		for ($i = 0; $i<count($tab); $i++) {
		
			if (Challenge::deadLine($tab[$i])) {
				array_push($current, $tab[$i]);
			}
		}
		echo (json_encode($current));
	}
	
	
}
?>
