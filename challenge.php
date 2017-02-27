<?php 

// session_start();
class Challenge
{

	private $_id;
	private $_title;
	private $_desc;
	private $_datestart;
	private $_datestop;

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
		}
	}
	
	public function update_challenge($idchallenge, $title, $desc, $date_start, $date_stop) {
		$query=$db->prepare('UPDATE thechallenger.challenge SET title=:title,desc=:desc,datestart=:date_start,datestop=:date_stop WHERE id=:idchallenge');
	    $query->bindParam(':title',$title,PDO::PARAM_STR);
	    $query->bindParam(':desc',$desc,PDO::PARAM_STR);
	    $query->bindParam(':date_start',$date,PDO::PARAM_STR);
	    $query->bindParam(':date_stop',$date,PDO::PARAM_STR);
        $query->execute();
        $query->CloseCursor();
	}
	
	// Suppression d'un challenge
	public function delete_challenge($idchallenge){
		$query=$db->prepare('DELETE FROM thechallenger.challenge WHERE id=:idchallenge');
        $query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
	}
	
	// Gestion du temps d'un challenge
	public function deadLine() {

	}

	// Récupérer le gagnant du post
	public function getWinner() {
		
		$ch = $this->id
		$query=$db->prepare(' '); //requete retournant l'id du post gagnant
		$query->bindParam(':ch', htmlspecialchars($ch),PDO::PARAM_STR);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
	}
	
}


?>