<?php 
class Challenge extends Image
{

	private $id;
	private $title;
	private $desc;
	private $datestart;
	private $datestop;

	// CONSTRUCTEUR
	
	// function __construct($val_id, $val_title, $val_desc, $val_start, $val_stop) {
		
		// $this->id = $val_id;
		// $this->title = $val_title;
		// $this->desc = $val_desc;
		// $this->datestart = $val_start;
		// $this->datestop = $val_stop;
	// }
		
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
	
	// V�rifier si un challenge existe � partir de son id, retourner le challenge correspondant dans ce cas
	// false s'il n'existe pas
	public static function challenge_exists($id){
		
		$db = database::getPDO();
		$query=$db->prepare('SELECT * FROM challenge WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_INT);
        $query->execute();
		$datas=($query->fetchColumn()==0)?0:1;
		$query->CloseCursor();
		return $datas;
	}
	
	// retourne les posts correspondant au challenge
	public static function getPosts($idchallenge) {

		global $db;
		$query = $db->prepare('SELECT * FROM post WHERE idchallenge=:idchallenge');
		$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
		$query->execute();
		$tab = array();
		while ($datas = $query->fetch()) { 
			array_push($tab,$datas['id']);
		};
		$query->CloseCursor();
		return $tab;
	}
	
	// R�cup�rer le gagnant du challenge
	public function getWinner($idchallenge) {
		
		global $db;
		$query=$db->prepare('SELECT * FROM post WHERE idchallenge=:idchallenge AND winner = 1'); 
		$query->bindParam(':idchallenge', htmlspecialchars($idchallenge),PDO::PARAM_STR);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
	}

	/* Gestion du temps */
	
	// Retourne le temps restant
	public static function timeLeft($idchallenge) {
		
		global $db;
		$query=$db->prepare('SELECT datestop FROM challenge WHERE id=:idchallenge');
		$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
		$query->execute();
		$stop=$query->fetch();
		$query->closeCursor();
		$date=strtotime($stop['datestop']);
		$diff=$date-time();
		$days=round($diff/(60*60*24));
		$hours=round(($diff-$days*60*60*24)/(60*60));
		$time = [
		
			"days" => $days,
			"hours" => $hours,
		];
		return $time;
	}
	// Date limite pass�e ou non
	//retourne 1 si c'est le challenge est en cours
	// 0 sinon
	public static function deadLine($idchallenge) {
		
		global $db;
		$query = $db->prepare('SELECT datestop FROM challenge WHERE id=:idchallenge');
		$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
		$query->execute();
		$stop=$query->fetch();
		$query->closeCursor();
		$date=$stop['datestop'];
		$today = date("Y-m-d");
		return ($date > $today);
	}
	
	public static function setWinner($idchallenge) {
		
		if (!self::deadLine($idchallenge)) {
		
			global $db;
			// on cherche le nombre maximal de likes sur les pots du challenge
			$query_max = $db->prepare('SELECT max(score) FROM post WHERE idchallenge=:idchallenge');
			$query_max->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
			$query_max->execute();
			$result = $query_max->fetch(); 
			$query_max->CloseCursor();
			$max = $result['max(score)'];
			
			// on cherche le post ayant le plus de like du challenge
			$query = $db->prepare('SELECT * FROM post WHERE idchallenge=:idchallenge AND score = :max');
			$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
			$query->bindParam(':max',$max,PDO::PARAM_INT);
			$query->execute();
			$data = $query->fetch();
			$query->CloseCursor();
			$id = $data['id'];
			
			// le post est winner
			$query_win = $db->prepare('UPDATE post SET winner = 1 WHERE id=:id');
			$query_win->bindParam(':id',$id,PDO::PARAM_INT);
			$query_win->execute();
			$query_win->CloseCursor();
		}
	}
	
	public static function winners() {
		
		global $db;
		$query = $db->prepare('SELECT COUNT(*) as nb FROM challenge');
		$query->execute();
		$data = $query->fetch();
		$query->CloseCursor();
		$nb = $data['nb'];
		$query = $db->prepare('SELECT * FROM challenge');
		$query->execute();
		$id_challenge = array();
		while ($datas = $query->fetch()) {
			array_push($id_challenge,$datas['id']);
		}
		$query->CloseCursor();

		for ($i = 0; $i<$nb; $i++) {
			self::setWinner($id_challenge[$i]);
		}
	}
	

}

?>
