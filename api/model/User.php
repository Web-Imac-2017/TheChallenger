<?php 

class User
{
	private $_id;
	private $_name;
	private $_rank;
	private $_password;
	private $_email;
	// private $_desc;
	// private $_key;
	// private $_isActive;
	// private $_birthdate;
	// private $_cptwarnings;

	// public function __construct($name,$pwd,$rank,$id){
	// 	$this->$_name=$name;
	// 	$this->$_pwd=$pwd;
	// 	$this->$_rank=$rank;
	// 	$this->$_id=$id;
	// }

	//////////// GETTERS ////////////

	function getId(){return $this->_id;}
	function getName(){return $this->_name;}
	function getRank(){return $this->_rank;}
	function getPassword(){return $this->_password;}
	function getEmail(){return $this->_email;}


	//////////// SETTERS ////////////

	function setId($id){$this->_id = $id;}
	function setName($name){$this->_name = $name;}
	function setRank($rank){$this->_rank = $rank;}
	function setPassword($password){$this->_password = $password;}
	function setEmail($email){$this->_email = $email;}

	//fonction qui vérifie que l'utilisateur est bien connecté et vérifie aussi son rang
	public function is_connected($rank){
		$autorisation=false;

		if (!empty($_COOKIE['id']) && !empty($_COOKIE['name']) && !empty($_COOKIE['pwd']) && !empty($_COOKIE['rank']))
		{
			global $db;
			$query= $db->prepare('SELECT id,name,pwd,rank FROM thechallenger.user WHERE id=:id');
			$query->bindParam(':id', $_COOKIE['id'], PDO::PARAM_INT);
			$query->execute();
			$datas=$query->fetch();
			$query->CloseCursor();

			if($_COOKIE['id']==$datas['id'] && $_COOKIE['pwd']==$datas['pwd'] && $_COOKIE['name']==$datas['name'] && $_COOKIE['rank']==$datas['rank'] && $_COOKIE['rank']>=$rank)
			{
				$autorisation=true;
			}
		}

		//on retourne la valeur de l'autorisation
		return $autorisation;
	}

	//on envoi le mail de confirmation
	public function registeremail(){
		global $db;
		$key=sha1(microtime(TRUE)*100000); //création de la clé unique
		$registerdate=date("d m Y");
		//on ajoute les infos à la bdd
		//on insère les infos dans la bdd

		$query=$db->prepare('INSERT INTO thechallenger.user (rank,name,pwd,email,keyactive,registerdate,cptwarnings,photo) VALUES (1,:name, :pwd, :email, :keyactive, :registerdate,0,:photo)');
		$query->bindParam(':name', $this->_name, PDO::PARAM_STR);
		$query->bindParam(':pwd', $this->_password, PDO::PARAM_STR);
		$query->bindParam(':email', $this->_email, PDO::PARAM_STR);
		$query->bindParam(':keyactive',$key,PDO::PARAM_STR);
		$query->bindParam(':registerdate', $registerdate, PDO::PARAM_STR);
		$query->bindParam(':photo', "pp.jpg", PDO::PARAM_STR);
		$query->execute();
		$query->CloseCursor();

		//on prépare l'envoi du mail de confirmation
		$destinataire=$this->_email;
		$sujet="Active ton compte TheChallenger en 1 clic";
		$entete="From: inscription@thechallenger.com"."\r\n";
		$entete.="Reply-To: no-reply@thechallenger.com"."\r\n";
		$entete.='MIME-Version: 1.0'."\r\n";
		$entete.='Content-type: text/html; charset=utf-8'."\r\n";

		//on prépare le message avec le lien d'activation
		$message="<html><body>"."\r\n";
		$message.="<img src=''><h1 style='font-family:sans-serif;font-size:20px;color:#161616;'>Confirme ton inscription The Challenger</h1>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'>Bienvenue <span style='font-size:15px;font-weight:bold;'>".$this->_name."</span></p>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'> Pour activer ton compte, clique sur le bouton ci dessous</p>"."\r\n";
		$message.="<p style='font-size:14px;font-family:sans-serif;padding:20px 0;'><a style='color:#fff; font-weight:bold;padding:10px; background-color:#437B1A;border:1px solid #366B11;text-decoration:none;'href='http://www.thechallenger.com/user/confirm/".$key."'>ACTIVER MON COMPTE THE CHALLENGER</a></p>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'>Ou copie/colle ce lien dans ton navigateur internet:</p><p style='font-size:13px;font-family:sans-serif'>http://www.thechallenger.com/user/confirm/".$key."</p>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'>Merci et à bientôt sur TheChallenger.com !</p>"."\r\n";
		$message.="<p style='font-size:11px;font-family:sans-serif;padding-top:10px;border-top:1px solid #161616;'>Ceci est un mail automatique, merci de ne pas y répondre.</p>"."\r\n";
		$message.="</html></body>";

		//on envoie l'email
    	mail($destinataire, $sujet, $message, $entete);
	}

	//fonction verifier follow
	public function checkfollow($id){
		global $db;
		$query=$db->prepare('SELECT id FROM thechallenger.follow WHERE idfollower=:idfollower AND idfollowed=:idfollowed');
        $query->bindParam(':idfollower',$_COOKIE['id'],PDO::PARAM_INT);
        $query->bindParam(':idfollowed',$id,PDO::PARAM_INT);
        $query->execute();
        $exist=($query->fetchColumn()==0)?false:true;
        $query->CloseCursor();
        return $exist;
	}

	//fonction qui vérifie si l'utilisateur à plus de 3 avertissments
	public function checkWarnings(){
		global $db;
		$query=$db->prepare('SELECT cptwarnings FROM thechallenger.user WHERE id = :id');		
		$query->bindParam(':id', $_COOKIE['id'],PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		return ($datas['cptwarnings']>=3) ? false : true; //si > 3 l'utilisateur est bloqué
	}

}

?>