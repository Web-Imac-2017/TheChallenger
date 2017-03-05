<?php 

// session_start();

include("identifiants.php");
// include("constants.php");

//definition des niveaux d'utilisateurs
define('VISITEUR',0);
define('INSCRIT',1);
define('MEMBRE',2);
define('MODERATEUR',3);
define('ADMIN',4);

class User
{
	// private $_id;
	// private $_name;
	// private $_rank;
	// private $_password;
	// private $_email;
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


	//test si l'utilisateur existe
	public function id_exists($id){
		$query=$db->prepare('SELECT COUNT(*) FROM thechallenger.user WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_);
        $query->execute();
        $exist=($query->fetchColumn()==0)?true:false;
        $query->CloseCursor();
        return $exist;
	}

	//fonction test de connexion
	public function is_connected($rank)
	{
		//on initialise la variable
		$autorisation=false;

		if (isset($_COOKIE['id']) && !empty($_COOKIE['id']) && isset($_COOKIE['name']) && !empty($_COOKIE['name']) && isset($_COOKIE['pwd']) && !empty($_COOKIE['pwd'])  && isset($_COOKIE['rank']) && !empty($_COOKIE['rank']))
		{
			global $db;
			$query= $db->prepare('SELECT id, name, pwd, rank FROM thechallenger.user WHERE name = :name');
			$query->bindParam(':name', $_COOKIE['name'], PDO::PARAM_STR);
			$query->execute();
			$datas=$query->fetch();
			$query->CloseCursor();

			if ($_COOKIE['id']==$datas['id'] && $_COOKIE['pwd']==$datas['pwd'] && $_COOKIE['rank']==$datas['rank'] )
			{
				if ($_COOKIE['rank']>=$rang)
				{
					$autorisation=true;
				}
			}
		}

		//on retourne la valeur de l'autorisation
		return $autorisation;

	}

	//fonction tester si on est l'utilisateur
	public function is_connected_as($id){
		$autorisation=false;
		if(is_connected(MEMBRE)){
			global $db;
			$query= $db->prepare('SELECT name, pwd, rank FROM thechallenger.user WHERE id = :id');
			$query->bindParam(':id', $id, PDO::PARAM_INT);
			$query->execute();
			$datas=$query->fetch();
			$query->CloseCursor();

			if ($_COOKIE['name']==$datas['name'] && $_COOKIE['pwd']==$datas['pwd'] && $_COOKIE['rank']==$datas['rank'] )
			{
				$autorisation=true;
			}
		}
	}

	//fonction connexion
	public function connexion($name,$password){
		//si utilisateur déjà connecté on renvoi une erreur
		if($user->is_connected(MEMBRE)){
			return 8;
		}
		else{
			$name=strtolower($_POST['name']);
			$query=$db->prepare('SELECT id,rank, name, pwd, email FROM thechallenger.user WHERE name = :name');		
			$query->bindParam(':name', htmlspecialchars($name),PDO::PARAM_STR);
			$query->execute();
			$datas=$query->fetch();
			$query->CloseCursor();
			if ($datas['pwd']==$password)
			{
				if ($datas['rank']>=MEMBRE) //on vérifie que l'utilisateur est actif
				{
					//création des cookies
					$expire = time() + 365*24*3600;
					setcookie('name', $datas['name'], $expire, null, null, false, true); 
					setcookie('pwd', $datas['pwd'], $expire, null, null, false, true); 
					setcookie('rank', $datas['rank'], $expire, null, null, false, true); 
					setcookie('id', $datas['id'], $expire, null, null, false, true); 			
				}	
				else //on écrit qu'il faut qu'il aille activer son compte
				{
					return 10;
				}
			}
			else
			{
				return 11;
			}
		}
	}

	//fonction ajouter un avertissement

	// PAS BESOIN VOIR FONCTION CHANGEUSER

	// public function addwarning($name){
	// 	if($this->is_connected(MODERATEUR)){
	// 		global $db; 
	// 		$query = $db->prepare("UPDATE thechallenger.user SET cptwarnings=cptwarnings+1 WHERE name=:name");
	// 		$query->bindParam(':name',$name,PDO::PARAM_STR);
	// 		$query->execute();
	// 		$query->CloseCursor();
	// 	}
	// }


	//fonction enregistrement nouvel utilisateur
	public function checkregister($name, $password, $passwordconfirm, $email){
		global $db;
		if (!preg_match("#^[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}$#",$name) || empty($name))
        {
        	var_dump("erreur name incorrect");
           	return 1;
        }
        elseif (!preg_match("#^[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}$#",$password) || !preg_match("#[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}#",$passwordconfirm) || empty($password) || empty($passwordconfirm))
        {
        	var_dump("erreur password incorrect");
            return 2;
        }
        else
        {
        	$passwordconfirm=sha1($passwordconfirm);
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
            	var_dump("erreur nom deja existant");
            	return 3;
            }

            //on teste la longueur du name entre 3 et 20 caracteres 
            elseif (strlen($name) < 3 || strlen($name) > 20){
            	var_dump("erreur nom trop long ou trop court");
            	return 4;
            }

            //Vérification du mdp
            elseif ($password != $passwordconfirm){
            	var_dump("erreur password confirm incorrect");
            	return 7;
            }

            //Vérification de l'adresse email
            else
            {       
                //On vérifie la forme de l'adresse email
                if (!preg_match("#^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$#", $email) || empty($email))
                {
                	var_dump("erreur password incorrect");
                    return 6;
                }
                else
                {
                    //test si l'adresse mail existe déjà
                    $query=$db->prepare('SELECT COUNT(*) FROM thechallenger.user WHERE email =:email');
                    $query->bindParam(':email',$email,PDO::PARAM_STR);
                    $query->execute();
                    $mail_dispo=($query->fetchColumn()==0)?1:0;
                    $query->CloseCursor();
                    
                    if(!$mail_dispo){return 5;}
                    else{$this->registermail($name,$password,$email);}
                }
            } 
       }
	}

	//on envoi le mail de confirmation
	private function registermail($name,$password,$email){
		global $db;
		$key=sha1(microtime(TRUE)*100000); //création de la clé unique
		$registerdate=date("d m Y");
		//on ajoute les infos à la bdd
		//on insère les infos dans la bdd

		$query=$db->prepare('INSERT INTO thechallenger.user (rank,name,pwd,email,keyactive,isActive,registerdate,cptwarnings) VALUES (1,:name, :pwd, :email, :keyactive, 0,:registerdate,0)');
		$query->bindParam(':name', $name, PDO::PARAM_STR);
		$query->bindParam(':pwd', $password, PDO::PARAM_STR);
		$query->bindParam(':email', $email, PDO::PARAM_STR);
		$query->bindParam(':keyactive',$key,PDO::PARAM_STR);
		$query->bindParam(':registerdate', $registerdate, PDO::PARAM_STR);
		$query->execute();
		$query->CloseCursor();

		//on prépare l'envoi du mail de confirmation
		$destinataire=$email;
		$sujet="Active ton compte TheChallenger en 1 clic";
		$entete="From: inscription@thechallenger.com"."\r\n";
		$entete.="Reply-To: no-reply@thechallenger.com"."\r\n";
		$entete.='MIME-Version: 1.0'."\r\n";
		$entete.='Content-type: text/html; charset=utf-8'."\r\n";

		//on prépare le message avec le lien d'activation
		$message="<html><body>"."\r\n";
		$message.="<img src=''><h1 style='font-family:sans-serif;font-size:20px;color:#161616;'>Confirme ton inscription The Challenger</h1>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'>Bienvenue <span style='font-size:15px;font-weight:bold;'>".$name."</span></p>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'> Pour activer ton compte, clique sur le bouton ci dessous</p>"."\r\n";
		$message.="<p style='font-size:14px;font-family:sans-serif;padding:20px 0;'><a style='color:#fff; font-weight:bold;padding:10px; background-color:#437B1A;border:1px solid #366B11;text-decoration:none;'href='http://www.thechallenger.com/user.php?register=2&name=".urlencode($name)."&key=".urlencode($key)."'>ACTIVER MON COMPTE THE CHALLENGER</a></p>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'>Ou copie/colle ce lien dans ton navigateur internet:</p><p style='font-size:13px;font-family:sans-serif'>http://www.thechallenger.com/user.php?register=2&name=".urlencode($name)."&key=".urlencode($key)."</p>"."\r\n";
		$message.="<p style='font-size:13px;font-family:sans-serif'>Merci et à bientôt sur TheChallenger.com !</p>"."\r\n";
		$message.="<p style='font-size:11px;font-family:sans-serif;padding-top:10px;border-top:1px solid #161616;'>Ceci est un mail automatique, merci de ne pas y répondre.</p>"."\r\n";
		$message.="</html></body>";

		//on envoie l'email
    	mail($destinataire, $sujet, $message, $entete);
	}


	//quand on clique sur le mail de confirmation, on confirme l'inscription
	public function register($name,$key){
		global $db;
		$query = $db->prepare("SELECT key,isActive FROM thechallenger.user WHERE name=:name ");
		$query->bindParam(':name',$name,PDO::PARAM_STR);
		// $query->execute();
		if($query->execute(array(':name' => $name)) && $datas = $query->fetch())
		{
			$keydb = $datas['key'];	// Récupération de la clé
			$active = $datas['isActive']; // $actif contiendra alors 0 ou 1
		}

		$query->CloseCursor();

		if ($active==1){return 18;} //membre deja actif
		else{
			if($key==$keydb){ //tout est bon on met à jour les infos
				$query = $db->prepare("UPDATE thechallenger.user SET isActive=1, rank=2 WHERE name=:name");
				$query->bindParam(':name',$name,PDO::PARAM_STR);
				$query->execute();
				$query->CloseCursor();
				//on affiche le message de confirmation
	   			return 104;
			}
			else{
				return 404;
			}
		}
	}

	//fonction verifier follow
	public function checkfollow($idfollower, $idfollowed){
		$query=$db->prepare('SELECT id FROM thechallenger.follow WHERE idfollower=:idfollower AND idfollowed=:idfollowed');
        $query->bindParam(':idfollower',$idfollower,PDO::PARAM_INT);
        $query->bindParam(':idfollowed',$idfollowed,PDO::PARAM_INT);
        $query->execute();
        $exist=($query->fetchColumn()==0)?true:false;
        $query->CloseCursor();
	}

	//fonction ajout follower
	public function addfollower($idfollower, $idfollowed){
		global $db;
		if($this->id_exists($idfollowed) && !$this->checkfollow($idfollower,$idfollowed)){
			$query=$db->prepare('INSERT INTO thechallenger.follow (idfollower,idfollowed) VALUES (:idfollower,:idfollowed)');
			$query->bindParam(':idfollower', $idfollower, PDO::PARAM_INT);
			$query->bindParam(':idfollowed', $idfollowed, PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}
	}

	//fonction suppression follower
	public function deletefollower($idfollower,$idfollowed){
		global $db;
		if($this->id_exists($idfollowed) && $this->checkfollow($idfollower,$idfollowed)){
			$query=$db->prepare('DELETE FROM thechallenger.follow idfollower=:idfollower AND idfollowed=:idfollowed)');
			$query->bindParam(':idfollower', $idfollower, PDO::PARAM_INT);
			$query->bindParam(':idfollowed', $idfollowed, PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}
	}

	//fonction modification utilisateur, ajout avertissement et modif de rang
	public function changeuser($id,$description,$birthdate,$photo,$cptwarnings,$rank){
		global $db;
		//si c'est un moderateur ou l'utilisateur en question, il peut modifier le profil
		if($this->is_connected(MODERATEUR)|| $this->is_connected_as($id)){
			$query = $db->prepare("UPDATE thechallenger.user SET photo=:photo,description=:description,birthdate=:birthdate WHERE id=:id");
			$query->bindParam(':photo',$photo,PDO::PARAM_STR);
			$query->bindParam(':description',$desciption,PDO::PARAM_STR);
			$query->bindParam(':birthdate',$birthdate,PDO::PARAM_STR);
			$query->bindParam(':id',$id,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}
		//si moderateur il peut modifier le nombre d'avertissements
		if($this->is_connected(MODERATEUR)){
			$query = $db->prepare("UPDATE thechallenger.user SET cptwarnings=:cptwarnings WHERE id=:id");
			$query->bindParam(':cptwarnings',$cptwarnings,PDO::PARAM_INT);
			$query->bindParam(':id',$id,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}
		//si administrateur il peut modifier le rang
		if($this->is_connected(ADMIN)){
			$query = $db->prepare("UPDATE thechallenger.user SET rank=:rank WHERE id=:id");
			$query->bindParam(':rank',$rank,PDO::PARAM_INT);
			$query->bindParam(':id',$id,PDO::PARAM_INT);
			$query->execute();
			$query->CloseCursor();
		}
		return 105;
	}

	//fonction qui vérifie si l'utilisateur à plus de 3 avertissments
	public function checkWarnings($id){
		$query=$db->prepare('SELECT cptwarnings FROM thechallenger.user WHERE id = :id');		
		$query->bindParam(':id', $id,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		return ($datas['cptwarnings']>=3) ? false : true; //si > 3 l'utilisateur est bloqué
	}

	//deconnexion
	public function deconnexion(){
		//s'il est connecté
		if($this->is_connected(MEMBRE)){
			//on détruit les cookie
			if (isset ($_COOKIE['name']))
			{
				setcookie('pseudo', '', -1);
			}
			if (isset ($_COOKIE['mdp']))
			{
				setcookie('mdp', '', -1);
			}
			if (isset ($_COOKIE['rang']))
			{
				setcookie('rang', '', -1);
			}
			if (isset ($_COOKIE['id']))
			{
				setcookie('id', '', -1);
			}

			session_destroy();
			return 111;
		}
		else{
			return 17; //tu n'es pas connecté
		}
	}

}

?>