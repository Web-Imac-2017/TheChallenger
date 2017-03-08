<?php 
include_once("model/Post.php");
$user=new User();

class postController
{

	//recupère toutes les infos d'un post
	public static function displaypost($id){
		global $db;
		$query=$db->prepare('SELECT * FROM thechallenger.post WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch();
        $query->CloseCursor();
        return $datas;
	}

	//on vérifie si la personne a deja like
	public static function checklike($idpost){
		global $db;
		global $user;
		if(!$user->is_connected(MEMBRE)){
			exit();
		}
		else{
			$query=$db->prepare('SELECT id FROM thechallenger.score WHERE iduser=:iduser AND idpost=:idpost');
	        $query->bindParam(':iduser',$iduser,PDO::PARAM_INT);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $exist=($query->fetchColumn()==0)?true:false;
	        $query->CloseCursor();
	        return $exist;
		}
	}

	//gestion des like de post
	public static function addlike($idpost){
		global $db;
		//si l'utilisateur n'a pas encore like le post
		if(!postController::checklike($idpost)){
			$query=$db->prepare('INSERT INTO thechallenger.score (iduser,idpost,idchallenge) VALUES (:iduser,:idpost,:idchallenge)');
	        $query->bindParam(':iduser',$iduser,PDO::PARAM_INT);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
	        $query=$db->prepare('UPDATE thechallenger.post SET score=score+1 WHERE id=:idpost AND idchallenge=:idchallenge');
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
		}
	}

	public static function deletelike($idpost){
		global $db;
		//si l'utilisateur a like
		if(postController::checklike($idpost)){
			$query=$db->prepare('DELETE FROM thechallenger.score WHERE iduser=:iduser AND idpost=:idpost AND idchallenge=:idchallenge');
	        $query->bindParam(':iduser',$iduser,PDO::PARAM_INT);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
	        $query=$db->prepare('UPDATE thechallenger.post SET score=score-1 WHERE id=:idpost AND idchallenge=:idchallenge');
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
	    }
	}


	//insérer nouveau post
	public static function addpost($idchallenge){
		$title=(!empty($_POST['title']))? $_POST['title']:"";
		$image=(!empty($_FILES['image']))? $_FILES['image']:"";
		$type=(!empty($_FILES['type']))? $_FILES['type']:"";
		$desc=(!empty($_FILES['desc']))? $_FILES['desc']:"";

		global $user;

		if(!$user->is_connected(MEMBRE)){
	    	echo(json_encode(["code" => 0,"message" => "Not connected"]));
			exit();
		}
		//test si l'utilisateur n'a pas plus de 3 avertissements
		if(!$user->checkwarnings()){
	    	echo(json_encode(["code" => 0,"message" => "too many warnings, can't post anymore"]));
			exit();
		}

		$date=date("d m Y");
	
		global $db;
		$post=new Post();
		$testimage=$post->test_image($image);
		if($testimage==1 || $testimage==2){ //pas d'erreur sur l'image
			//on déplace l'image dans le bon dossier
			$linkcontent=$post->move_image($image,'images/images_posts');

			//on ajoute les donnees dans la bdd
			if($testimage==1){ //si image pas hd
				$query=$db->prepare('INSERT INTO thechallenger.post (title,state,linkcontent,type,hd,description,datepost,iduser,idchallenge) VALUES (:title,0,:linkcontent,:type,0,:description,:datepost,:iduser,:idchallenge)');
			}
			elseif($testimage==2){ //si image hd
				$query=$db->prepare('INSERT INTO thechallenger.post (title,state,linkcontent,type,hd,description,datepost,iduser,idchallenge) VALUES (:title,0,:linkcontent,:type,1,:description,:datepost,:iduser,:idchallenge)');
			}
	        $query->bindParam(':title',$title,PDO::PARAM_STR);
	        $query->bindParam(':linkcontent',$linkcontent,PDO::PARAM_STR);
	        $query->bindParam(':type',$type,PDO::PARAM_STR);
	        $query->bindParam(':description',$desc,PDO::PARAM_STR);
	        $query->bindParam(':datepost',$date,PDO::PARAM_STR);
	        $query->bindParam(':iduser',$_COOKIE['id'],PDO::PARAM_INT);
	        $query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
		}
	}

	public static function checkpost($idpost){
		global $db;
		//on vérifie si le name est déjà utilisé 
		$query=$db->prepare('SELECT iduser FROM thechallenger.post WHERE id=:idpost');
		$query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		$iduser=$datas['iduser'];
		if(empty($iduser)){
	    	return false;
	    	exit();
		}
		return true;
	}
	
	
	//modifier post
	public static function updatepost($idpost){
		if(!Post::postexists($idpost)){
	    	echo(json_encode(["code" => 0,"message" => "error"]));
			exit();
		}
		global $user; 
		if($user->is_connected(MODERATEUR) || ($user->is_connected(MEMBRE) && $iduser==$_COOKIE['id'])){
			$title=(!empty($_POST['title']))? $_POST['title']:"";
			$type=(!empty($_FILES['type']))? $_FILES['type']:"";
			$desc=(!empty($_FILES['desc']))? $_FILES['desc']:"";

			global $db;
			$query=$db->prepare('UPDATE thechallenger.post SET title=:title,type=:type,description=:description WHERE id=:idpost');
	        $query->bindParam(':title',$title,PDO::PARAM_STR);
	        $query->bindParam(':type',$type,PDO::PARAM_STR);
	        $query->bindParam(':description',$desc,PDO::PARAM_STR);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
		}
	}

	//supprimer post
	public static function deletepost($idpost){
		if(!Post::postexists($idpost)){
	    	echo(json_encode(["code" => 0,"message" => "post does not exist"]));
			exit();
		}
		global $user; 
		if($user->is_connected(MODERATEUR) || ($user->is_connected(MEMBRE) && $iduser==$_COOKIE['id'])){
			global $db;
			$query=$db->prepare('DELETE FROM thechallenger.post WHERE id=:idpost');
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "success : post deleted"]));	
	    }
	}

	public static function getRandomBackground(){
		
		global $db;
		$query=$db->prepare('SELECT COUNT(*) AS nbhd FROM thechallenger.post WHERE hd=1');
		$query->execute();
		$datas=$query->fetch();
		$nbhd=$datas['nbhd'];
		$query->CloseCursor();
		$random=rand(1,$nbhd);
		$query=$db->prepare('SELECT * FROM thechallenger.post WHERE hd=1');
		$query->execute();
		$i=1;
		$datas=$query->fetch();
		while($i!=$random){
			$datas=$query->fetch();
			$i++;
		}
		$query->CloseCursor();
		$iduser = $datas['iduser'];
		$query=$db->prepare('SELECT name FROM user WHERE id=:iduser');
		$query->bindParam(':iduser',$iduser,PDO::PARAM_INT);
		$query->execute();
		$result = $query->fetch();
		echo(json_encode(["code" => 1,"url" => $datas['linkcontent'], "user" => $result['name']]));
	}

	public static function toArray($idpost){
		if(!Post::postexists($idpost)){
	    	echo(json_encode(["code" => 0,"message" => "post does not exists"]));
			exit();
		}
		global $db;
		$query=$db->prepare('SELECT * FROM thechallenger.post WHERE id=:idpost');
		$query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		$item = [
			"id" => $idpost,
			"title" => $datas['title'],
			"state" => $datas['state'],
			"type" => $datas['type'],
			"hd" => $datas['hd'],
			"linkcontent" => $datas['linkcontent'],
			"description" => $datas['description'],
			"winner" => $datas['winner'],
			"score" => $datas['score'],
			"datepost" => $datas['datepost'],
			"iduser" => $datas['iduser'],
			"idchallenge" => $datas['idchallenge']
		];
		echo(json_encode($item));
	}
}

?>