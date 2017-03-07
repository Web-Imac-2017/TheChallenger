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
	
	// retourne les posts correspondant au challenge
		
	public static function getPosts($idchallenge) {

		global $db;
		$query = $db->prepare('SELECT * FROM thechallenger.post WHERE id=:idchallenge');
		$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
		$query->execute();
		$posts = $quert->fetch();
		$query->CloseCursor();
		return posts;
	}
	
	// Retourne les données en JSON

	public function toArray() {
			
		$item = [

			"id" => $this->getId(),
			"title"=> $this->get_title(),
			"description" => utf8_encode($this->get_desc()),
			"date_start" => $this->get_dateStart(),
			"date_stop" => $this->get_dateStop()
		];
		return $item;
	}	

	// Récupérer le gagnant du post
	public function getWinner() {
		
		$ch = $this->id;
		$query=$db->prepare(''); //requete retournant l'id du post gagnant
		$query->bindParam(':ch', htmlspecialchars($ch),PDO::PARAM_STR);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		return $datas;
	}
	
}

?>