<?php

    require_once("../model/challenge.php");

    class challengeController {

	// Informations/affichage d'un challenge
	
    public static function infos($id){
            
		$challenge = Challenge::challenge_exists($id);
        echo(json_encode($challenge->toArray()));
    }
	
	// Vérifier si un challenge existe
	
	public function challenge_exists($id){
		
		$query=$db->prepare('SELECT * FROM thechallenger.challenge WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch();
		if($data->rowcount() != 0) return $data;
		else return false;
	}
	
	/*
	// Afficher à partir de la BDD
	public function display_challenge($id){
		
		$query=$db->prepare('SELECT * FROM thechallenger.challenge WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch();
        $query->CloseCursor();
        return $datas;
	}
	*/
	
	// Ajouter un challenge à la BDD
	public function add_challenge($title, $desc, $date_start, $date_stop) {
		$_SESSION['title']=$title;
		$_SESSION['desc']=$desc;
		$date_start=date("d m Y");
		$date_stop=date("d m Y");
		$query=$db->prepare('INSERT INTO thechallenger.challenge (title, desc, datestart, datestop) VALUES (:title,:desc,:date_start,:date_stop)');
	    $query->bindParam(':title',$title,PDO::PARAM_STR);
	    $query->bindParam(':desc',$desc,PDO::PARAM_STR);
	    $query->bindParam(':date_start',$date,PDO::PARAM_STR);
	    $query->bindParam(':date_stop',$date,PDO::PARAM_STR);
	    $query->execute();
	    $query->CloseCursor();
		echo(json_encode(["code" => 1,"message" => "Success : challenge added"]));
	}
	
	// Modifier un challenge dans la BDD
	public function update_challenge($idchallenge) {
		
		if(!$this->challenge_exists($idchallenge)){
	    	echo(json_encode(["code" => 0,"message" => "Error challenge does not exists"]));
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
	public function delete_challenge($idchallenge){
		
		if (!$this->challenge_exists($idchallenge) {
		
			echo(json_encode(["code" => 0,"message" => "Error : challenge does not exists"]));
			exit();
		}
		$query=$db->prepare('DELETE FROM thechallenger.challenge WHERE id=:idchallenge');
        $query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
		echo(json_encode(["code" => 1,"message" => "Success : challenge deleted"]));
	}

		
    }
?>
