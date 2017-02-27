<?php 

// session_start();
class Challenge
{

	private $_id;
	private $_title;
	private $_desc;
	private $_datestop;

	// gestion du temps d'un challenge
	public function deadLine() {

	}

	// récupérer le gagnant du post
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