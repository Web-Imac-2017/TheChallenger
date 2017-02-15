<?php 

// session_start();

include("identifiants.php");

class User
{

	private $_name;
	private $_password;
	private $_email;
	private $_desc;
	private $_key;
	private $_isActive;
	private $_birthdate;
	private $_cptwarnings;

	public function checkregister($name, $password, $passwordconfirm, $email){
		global $db;
		if (!preg_match("#^[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}$#",$name) || empty($name))
        {
           return 1;
        }
        elseif (!preg_match("#^[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}$#",$password) || !preg_match("#[a-zA-Z0-9éèàêâùïüë_. +-]{3,15}#",$passwordconfirm) || empty($password) || empty($passwordconfirm))
        {
            return 2;
        }
        else
        {
        	$password=sha1($password);
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

            if(!$name_dispo){return 3;}

            //on teste la longueur du name entre 3 et 20 caracteres 
            elseif (strlen($name) < 3 || strlen($name) > 20){return 4;}

            //Vérification du mdp
            elseif ($password != $passwordconfirm){return 7;}

            //Vérification de l'adresse email
            else
            {       
                //On vérifie la forme de l'adresse email
                if (!preg_match("#^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$#", $email) || empty($email))
                {
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


	//quand on clique sur le mail de confirmation
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

}

$code=0; //compteur d'erreur
$user=new User;

if($_GET['register']==1){

	//création des variables de session pour conserver les champs
	$_SESSION['name']=isset($_POST['name'])? htmlspecialchars($_POST['name']):'';
	$_SESSION['email']=isset($_POST['email'])? htmlspecialchars($_POST['email']):'';
	$pwd=$_POST['pwd'];
	$pwdconfirm=$_POST['pwdconfirm'];

	$recaptcha=$_POST['g-recaptcha-response'];

	if(!empty($recaptcha))
	{
	    include("includes/getCurlData.php");
	    $google_url="https://www.google.com/recaptcha/api/siteverify";
	    $secret='6Lcg7_8SAAAAANE6c6aURXzLPXgZYQE_jXiVrxez';
	    $ip=$_SERVER['REMOTE_ADDR'];
	    $url=$google_url."?secret=".$secret."&response=".$recaptcha."&remoteip=".$ip;
	    $res=getCurlData($url);
	    $res= json_decode($res, true);

	    if($res['success']) //si le captcha est bon
	    {
	    	//on récupère un code d'erreur
	    	$code=$user->checkregister($_SESSION['name'],$pwd,$pwdconfirm,$_SESSION['email']);
	    }
	    else{
	    	$code=16; //erreur captcha
	    }
	}
	else{
		$code=16; //erreur captcha
	}
}
elseif($_GET['register']==2 && $_GET['name'] && $_GET['key']){
	$code=$user->register(htmlspecialchars($_GET['name']),htmlspecialchars($_GET['key']));
}

// echo $code;

header('Location: index.php?code='.$code);
?>