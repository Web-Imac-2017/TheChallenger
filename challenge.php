<?php 

class Challenge
{

	private $id;
	private $title;
	private $desc;
	private $datestart;
	private $datestop;

	// CONSTRUCTEUR
	
	function __construct($val_id, $val_title, $val_desc, $val_start, $val_stop) {
		
		$this->id = $val_id;
		$this->title = $val_title;
		$this->desc = $val_desc;
		$this->datestart = $val_start;
		$this->datestop = $val_stop;
	}
		
	// SETTERS
	
	public function set_id($value) { 
		$this->id = $value; 
	}
	
	public function set_title($value) { 
		$this->title = $value;
	}
	
	public function set_desc($value) { 
		$this->desc = $value;
	}
	
	public function set_dateStart($value) { 
		$this->datestart = $value;
	}
	
	public function set_dateStop($value) { 
		$this->datestop = $value; 
	}
	
	// GETTERS
	
	public function get_id() { 
		return $this->id; 
	}
	
	public function get_title() { 
		return $this->title;
	}
	
	public function get_desc() { 
		return $this->desc;
	}
	
	public function get_dateStart() { 
		return $this->datestart;
	}
	
	public function get_dateStop() { 
		return $this->datestop; 
	}
	
	// Retourne les données en JSON

	public function toArray() {
			
		//$this->provide();
		$item = [

			"id" => $this->getId(),
			"title"=> $this->get_title(),
			"description" => utf8_encode($this->get_desc()),
			"date_start" => $this->get_dateStart(),
			"date_stop" => $this->get_dateStop()
		];
		return $item;
	}

	// Vérifier si un challenge existe
	
	public function challenge_exists($id){
		
		$query=$db->prepare('SELECT * FROM thechallenger.challenge WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch();
		if($datas->rowcount() != 0) return $datas;
		else return false;
	}
	
	// Afficher à partir de la BDD
	
	public function display_challenge($id){
		
		$query=$db->prepare('SELECT * FROM thechallenger.challenge WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch();
        $query->CloseCursor();
        return $datas;
	}
	
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
		}
	}
	
	// Modifier un challenge dans la BDD
	
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


	// Récupérer le gagnant du post
	
	public function getWinner() {
		
		$ch = $this->id;
		$query=$db->prepare(''); //requete retournant l'id du post gagnant
		$query->bindParam(':ch', htmlspecialchars($ch),PDO::PARAM_STR);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
	}
	
	// Gestion du temps des challenges
	
	public function deadLine() {
		
		$ch = $this->id;
		$query = $db->prepare('SELECT datestop FROM challenge WHERE id = :ch');
		$query->binParam(':ch',$ch,PDO::PARAM_INT);
		$query->execute();
		$result = $query->fetch();
		if (date() > $result) delete_challenge($ch);
	}
}

?>