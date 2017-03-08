<?php
include_once("model/User.php");

class userController{

	public static function register(){
		global $db;
		$name=(!empty($_POST['name']))? $_POST['name']:"";
		$email=(!empty($_POST['email']))? $_POST['email']:"";
		$password=(!empty($_POST['pwd']))? $_POST['pwd']:"";
		$passwordconfirm=(!empty($_POST['pwdconfirm']))? $_POST['pwdconfirm']:"";
	
		if (!preg_match("#^[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}$#",$name) || empty($name))
        {
           echo(json_encode(["code" => 0,"message" => "1Login field empty"]));
            exit();
        }
        if (!preg_match("#^[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}$#",$password) || !preg_match("#[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}#",$passwordconfirm) || empty($password) || empty($passwordconfirm))
        {
            echo(json_encode(["code" => 0,"message" => "2Login field empty"]));
            exit();
        }
      
	    $name=htmlspecialchars($name);
	    $password=sha1($password);
	    $passwordconfirm=sha1($passwordconfirm);

	    //on vérifie si le name est déjà utilisé 
	    $query=$db->prepare('SELECT COUNT(*) FROM thechallenger.user WHERE name=:name');
	    $query->bindParam(':name',$name,PDO::PARAM_STR);
	    $query->execute();
	    $name_dispo=($query->fetchColumn()==0)?1:0;
	    $query->CloseCursor();

	    if(!$name_dispo){
    	    echo(json_encode(["code" => 0,"message" => "name already taken"]));
            exit();
        }

	    //on teste la longueur du name entre 3 et 20 caracteres 
	    if (strlen($name) < 3 || strlen($name) > 20){
	    	echo(json_encode(["code" => 0,"message" => "name too short or too long (3 minimum 20 maximum)"]));
        	exit();
        }

	    //Vérification du mdp
	    if ($password != $passwordconfirm){
	    	echo(json_encode(["code" => 0,"message" => "password confirmation different from password"]));
	    	exit();
	    }

    	//On vérifie la forme de l'adresse email
    	if (!preg_match("#^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$#", $email) || empty($email))
    	{
        	echo(json_encode(["code" => 0,"message" => "wrong email"]));
    		exit();
    	}

	    //test si l'adresse mail existe déjà
	    $query=$db->prepare('SELECT COUNT(*) FROM thechallenger.user WHERE email =:email');
	    $query->bindParam(':email',$email,PDO::PARAM_STR);
	    $query->execute();
	    $mail_dispo=($query->fetchColumn()==0)?1:0;
	    $query->CloseCursor();
	    
	    if(!$mail_dispo){
	    	echo(json_encode(["code" => 0,"message" => "email already taken"]));
			exit();
	    }
	    	    
	    //TOUT EST BON ON PEUT INSERER L'UTILISATEUR

	    $user=new User();
   		$user->setName($name);
   		$user->setPassword($password);
   		$user->setEmail($email);

   		//envoi mail de confirmation
   		$user->registeremail();
        
	    echo(json_encode(["code" => 1,"message" => "Success"]));
	}

	//si l'utilisateur clique sur le lien envoyé par email on confirme l'inscription
	public static function confirm($name,$key){
		if(empty($name) || empty($key)){
	    	echo(json_encode(["code" => 0,"message" => "Error param"]));
			exit();
		}

		global $db;
		$query = $db->prepare("SELECT key,rank FROM thechallenger.user WHERE name=:name ");
		$query->bindParam(':name',$name,PDO::PARAM_STR);
		if($query->execute(array(':name' => $name)) && $datas = $query->fetch())
		{
			$keydb = $datas['key'];	// Récupération de la clé
			$rank = $datas['rank']; // $actif contiendra alors 0 ou 1
		}

		$query->CloseCursor();

		if ($rank>1){
	    	echo(json_encode(["code" => 0,"message" => "account already activated"]));
			exit();
		} //membre deja actif
	
		if($key==$keydb){ //tout est bon on met à jour les infos
			$query = $db->prepare("UPDATE thechallenger.user SET rank=2 WHERE name=:name");
			$query->bindParam(':name',$name,PDO::PARAM_STR);
			$query->execute();
			$query->CloseCursor();
			//on affiche le message de confirmation
	    	echo(json_encode(["code" => 1,"message" => "Success"]));
			exit();
		}
		else{
	    	echo(json_encode(["code" => 0,"message" => "wrong key"]));
			exit();
		}
	}

	public static function login(){
		$email = (isset($_POST["email"])) ? $_POST["email"] : "";
		$password = (isset($_POST["password"])) ? sha1($_POST["password"]): "";

		if(empty($email) || empty($password)){
	    	echo(json_encode(["code" => 0,"message" => "empty field"]));
			exit();
		}

		global $user;
		if(isset($user) && $user->is_connected(MEMBRE)){
	    	echo(json_encode(["code" => 0,"message" => "Already connected"]));
			exit();
		}
		
		global $db;
		$query=$db->prepare('SELECT id, rank, name, pwd, email FROM thechallenger.user WHERE email = :email');		
		$query->bindParam(':email', $email,PDO::PARAM_STR);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		if ($datas['pwd']!=$password){
			echo(json_encode(["code" => 0,"message" => "Wrong password"]));
			exit();
		}
		if ($datas['rank']<MEMBRE) //on vérifie que l'utilisateur est actif
		{
	    	echo(json_encode(["code" => 0,"message" => "please click on the link on the email you received"]));
			exit();
		}

		//tout est bon
		//création des cookies
		$expire = time() + 365*24*3600;
		setcookie('name', $datas['name'], $expire, null, null, false, true); 
		setcookie('pwd', $datas['pwd'], $expire, null, null, false, true); 
		setcookie('rank', $datas['rank'], $expire, null, null, false, true); 
		setcookie('id', $datas['id'], $expire, null, null, false, true); 			

		echo(json_encode(["code" => 1,"message" => "Success"]));	
	}

	public static function logout(){
		//s'il n'est pas connecté
		global $user;
		if(!$user->is_connected(INSCRIT)){
	    	echo(json_encode(["code" => 0,"message" => "Not connected"]));
			exit();
		}

		//sinon on détruit les cookie et la session
		if (isset ($_COOKIE['name']))
		{
			setcookie('name', '', -1);
		}
		if (isset ($_COOKIE['pwd']))
		{
			setcookie('pwd', '', -1);
		}
		if (isset ($_COOKIE['rank']))
		{
			setcookie('rank', '', -1);
		}
		if (isset ($_COOKIE['id']))
		{
			setcookie('id', '', -1);
		}

		session_destroy();

		echo(json_encode(["code" => 1,"message" => "Success"]));	

	}

	//fonction ajout follower
	public static function addfollower($id){
		global $user;
		//si le follow existe deja
		if($user->checkfollow($id)){
	    	echo(json_encode(["code" => 0,"message" => "Not connected"]));
			exit();
		}

		global $db;
		$query=$db->prepare('INSERT INTO thechallenger.follow (idfollower,idfollowed) VALUES (:idfollower,:idfollowed)');
		$query->bindParam(':idfollower', $_COOKIE['id'], PDO::PARAM_INT);
		$query->bindParam(':idfollowed', $id, PDO::PARAM_INT);
		$query->execute();
		$query->CloseCursor();
	}

	//fonction suppression follower
	public static function deletefollower($id){
		global $user;
		//si le follow n'existe pas
		if(!$user->checkfollow($id)){
	    	echo(json_encode(["code" => 0,"message" => "Not connected"]));
			exit();
		}
		global $db;
		$query=$db->prepare('DELETE FROM thechallenger.follow idfollower=:idfollower AND idfollowed=:idfollowed)');
		$query->bindParam(':idfollower', $_COOKIE['id'], PDO::PARAM_INT);
		$query->bindParam(':idfollowed', $id, PDO::PARAM_INT);
		$query->execute();
		$query->CloseCursor();
	}

	//nombre de personne que le user suit
	public static function ndfollow($id){
		global $db;
		$query=$db->prepare('SELECT COUNT(*) AS nbfollow FROM thechallenger.follow WHERE idfollower=:id');
		$query->bindParam(':id', $id, PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		echo(json_encode(["code" => 1,"nb" => $datas['nbfollow']]));
	}

	//nombre de personne qui suivent le user
	public static function ndfollower($id){
		global $db;
		$query=$db->prepare('SELECT COUNT(*) AS nbfollower FROM thechallenger.follow WHERE idfollowed=:id');
		$query->bindParam(':id', $id, PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		echo(json_encode(["code" => 1,"nb" => $datas['nbfollower']]));
	}

	//fonction modification utilisateur, ajout avertissement et modif de rang
	public function changeuser($id){
		$description=(!empty($_POST['description']))? $_POST['description']:"";
		$birthdate=(!empty($_POST['birthdate']))? $_POST['birthdate']:"";
		$photo=(!empty($_POST['photo']))? $_POST['photo']:"";
		$cptwarnings=(!empty($_POST['cptwarnings']))? $_POST['cptwarnings']:"";
		$rank=(!empty($_POST['rank']))? $_POST['rank']:"";

		global $db;
		global $user;

		if(!$user->is_connected(MEMBRE)){
	    	echo(json_encode(["code" => 0,"message" => "Not connected"]));
			exit();
		}
		//si c'est un moderateur ou l'utilisateur en question, il peut modifier le profil
		if($user->is_connected(MODERATEUR)|| ($_COOKIE['id']==$id && $user->is_connected(MEMBRE))){
			$query = $db->prepare("UPDATE thechallenger.user SET photo=:photo,description=:description,birthdate=:birthdate WHERE id=:id");
			$query->bindParam(':photo',$photo,PDO::PARAM_STR);
			$query->bindParam(':description',$desciption,PDO::PARAM_STR);
			$query->bindParam(':birthdate',$birthdate,PDO::PARAM_STR);
			$query->bindParam(':id',$id,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}
		//si moderateur il peut modifier le nombre d'avertissements
		if($user->is_connected(MODERATEUR)){
			$query = $db->prepare("UPDATE thechallenger.user SET cptwarnings=:cptwarnings WHERE id=:id");
			$query->bindParam(':cptwarnings',$cptwarnings,PDO::PARAM_INT);
			$query->bindParam(':id',$id,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}
		//si administrateur il peut modifier le rang
		if($user->is_connected(ADMIN)){
			$query = $db->prepare("UPDATE thechallenger.user SET rank=:rank WHERE id=:id");
			$query->bindParam(':rank',$rank,PDO::PARAM_INT);
			$query->bindParam(':id',$id,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}

		echo(json_encode(["code" => 1,"message" => "Success"]));
	}

	public function toArray($id){

		$query=$db->prepare('SELECT * FROM thechallenger.user WHERE id=:id');
		$query->bindParam(':id',$id,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		if(empty($datas['id'])){
	    	echo(json_encode(["code" => 0,"message" => "user doesn't exist"]));
			exit();
		}
		$item = [
			"id" => $id,
			"rank" => $datas['rank'],
			"name" => $datas['name'],
			"email" => $datas['email'],
			"photo" => $datas['photo'],
			"description" => $datas['description'],
			"registerdate" => $datas['registerdate'],
			"birthdate" => $datas['birthdate'],
			"cptwarnings" => $datas['cptwarnings']
		];
		echo(json_encode($item));
	}

}



?>