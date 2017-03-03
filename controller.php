<?php
include_once('user.php');
include_once('post.php');


$code=0; //compteur d'erreur
$user=new User;
$post=new Post;

if(isset($_GET['type']) and $_GET['type']!=''){
	if($_GET['type']=='post'){
		if($_GET['action']=='add'){
			if(isset($_POST['iduser']) && isset($_POST['title']) && isset($_FILES['image']) && isset($_POST['type']) && isset($_POST['desc']) && isset($_POST['idchallenge'])){
				if($user->checkwarnings($_POST['iduser'])){
					$post->add_post(htmlspecialchars($_POST['title']),htmlspecialchars($_FILES['image']),htmlspecialchars($_POST['type']),htmlspecialchars($_POST['desc']),htmlspecialchars($_POST['iduser']),$_POST['idchallenge']);
				}
			}
		}
		if($_GET['action']=='delete' && isset($_GET['idpost']) && isset($_GET['iduser'])){
			if($user->is_connected(3) || $user->is_connected_as(htmlspecialchars($_GET['iduser']))){ //si moderateur ou l'auteur du post
				$post->delete_post(htmlspecialchars($_GET['idpost']));
			}
		}
		if($_GET['action']=='update' && isset($_GET['idpost']) && isset($_GET['iduser'])){
			if($user->is_connected(3) || $user->is_connected_as(htmlspecialchars($_GET['iduser']))){ //si moderateur ou l'auteur du post
				$post->update_post(htmlspecialchars($_GET['idpost']), htmlspecialchars($_GET['title']),htmlspecialchars($_GET['type']),htmlspecialchars($_GET['desc']));
			}
		}
	}
	elseif($_GET['type']=='user'){

		if($_GET['action']=='register'){

			//création des variables de session pour conserver les champs
			$_SESSION['name']=isset($_POST['name'])? htmlspecialchars($_POST['name']):'';
			$_SESSION['email']=isset($_POST['email'])? htmlspecialchars($_POST['email']):'';
			$pwd=sha1($_POST['pwd']);
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
		elseif($_GET['action']=='registerconfirm' && $_GET['name'] && $_GET['key']){
			$code=$user->register(htmlspecialchars($_GET['name']),htmlspecialchars($_GET['key']));
		}
		elseif($_GET['action']=='connexion' && isset($_POST['name']) && isset($_POST['pwd'])){
			$code=$user->connexion($_POST['name'],sha1(htmlspecialchars($_POST['pwd'])));
		}
		elseif($_GET['action']=='changeprofile' && isset($_GET['id']) && isset($_POST['description']) && isset($_POST['birthdate']) && isset($_POST['photo'])){
			$cptwarnings=(isset($_POST['cptwarnings']))? htmlspecialchars($_POST['cptwarnings']):0;
			$rank=(isset($_POST['rank']))? htmlspecialchars($_POST['rank']):0;
			$code=$user->changeuser($_GET['id'],$_POST['description'],$_POST['birthdate'],$_POST['photo'],$cptwarnings,$rank);
		}
		elseif($_GET['action']=='deconnexion'){
			$code=$user->deconnexion();
		}
		elseif($_GET['action']=='addfollower' && isset($_GET['idfollower']) && isset($_GET['idfollowed'])){
			if($user->is_connected_as(htmlspecialchars($_GET['idfollower']))){
				$user->addfollower(htmlspecialchars($_GET['idfollower']),htmlspecialchars($_GET['idfollowed']));
			}
			else{
				$code=404;
			}
		}

		header('Location: index.php?code='.$code);
	}
}


?>