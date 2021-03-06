<?php 

include_once("model/utility.php");

class postController {

	//on vérifie si la personne a deja like
	public static function checkLike($idpost){
		if(Post::checklike($idpost)){
			echo(json_encode(["code" => 1,"message" => "Success"]));
			exit();
		}

		echo(json_encode(["code" => 0,"message" => "error"]));
	}

	//gestion des like de post
	public static function addlike($idpost){
		if(Post::checklike($idpost)){
			echo(json_encode(["code" => 0,"message" => "error : post already liked "]));
			exit();
		}
		//si l'utilisateur n'a pas encore like le post
		global $db;
		$query=$db->prepare('INSERT INTO score (iduser,idpost) VALUES (:iduser,:idpost)');
        $query->bindParam(':iduser',$_COOKIE['id'],PDO::PARAM_INT);
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
        $query=$db->prepare('UPDATE post SET score=score+1 WHERE id=:idpost');
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
		echo(json_encode(["code" => 1,"message" => "Success"]));
	}

	public static function deletelike($idpost){
		//si l'utilisateur a like
		if(!Post::checklike($idpost)){
			echo(json_encode(["code" => 0,"message" => "error post not liked"]));
			exit();
		}
		global $db;
		$query=$db->prepare('DELETE FROM score WHERE iduser=:iduser AND idpost=:idpost');
        $query->bindParam(':iduser',$_COOKIE['id'],PDO::PARAM_INT);
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
        $query=$db->prepare('UPDATE post SET score=score-1 WHERE id=:idpost');
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
	    echo(json_encode(["code" => 1,"message" => "Success"]));
	}


	//insérer nouveau post
	public static function addpost($idchallenge){
		
		$title=(!empty($_POST['title']))? $_POST['title']:"";
		$image=(!empty($_FILES['image']))? $_FILES['image']:"";
		$tag=(!empty($_POST['tag']))? $_POST['tag']:"";
		$link=(!empty($_POST['link']))? $_POST['link']:"";
		$type=(!empty($_POST['type']))? $_POST['type']:"";
		$desc=(!empty($_POST['desc']))? $_POST['desc']:"";
		
		global $user;

		if(!$user->is_connected(MEMBRE)){
	    	echo(json_encode(["code" => 0,"message" => "Not connected"]));
	    	Utility::nextPage("");	
			exit();
		}
		//test si l'utilisateur n'a pas plus de 3 avertissements
		if(!$user->checkwarnings()){
	    	echo(json_encode(["code" => 0,"message" => "too many warnings, can't post anymore"]));
	    	Utility::nextPage("challenge/$idchallenge");	
			exit();
		}
	
		global $db;
		$post=new Post();
		if (empty($tag)) {
			$tag = $type;
		}
		if(empty($image) && empty($link)){
	    	echo(json_encode(["code" => 0,"message" => "empty field"]));
			Utility::nextPage("challenge/$idchallenge");	
			exit();
		}
		
		//si c'est une image
		if(!empty($image) && empty($link)){
			$testimage=Image::test_image($image);
			if($testimage==1 || $testimage==2){ //pas d'erreur sur l'image
				//on déplace l'image dans le bon dossier
				$linkcontent=Image::move_image($image,'../data/post/');

				//on ajoute les donnees dans la bdd
				if($testimage==1){ //si image pas hd
					$query=$db->prepare('INSERT INTO post (title,state,linkcontent,type,hd,description,tag,datepost,iduser,idchallenge,winner,score) VALUES (:title,0,:linkcontent,:type,0,:description,:tag,DATE(NOW()),:iduser,:idchallenge,0,0)');
				}
				elseif($testimage==2){ //si image hd
					$query=$db->prepare('INSERT INTO post (title,state,linkcontent,type,hd,description,tag,datepost,iduser,idchallenge,winner,score) VALUES (:title,0,:linkcontent,:type,1,:description,:tag,DATE(NOW()),:iduser,:idchallenge,0,0)');
				}
			}
		}
		//si c'est un lien et pas une image
		if(empty($image) && !empty($link)){
		
			$linkcontent=$link;
			$query=$db->prepare('INSERT INTO post (title,state,linkcontent,type,hd,description,tag,datepost,iduser,idchallenge,winner,score) VALUES (:title,0,:linkcontent,:type,0,:description,:tag,DATE(NOW()),:iduser,:idchallenge,0,0)');			
			
		}
		$query->bindParam(':title',$title,PDO::PARAM_STR);
		$query->bindParam(':linkcontent',$linkcontent,PDO::PARAM_STR);
		$query->bindParam(':type',$type,PDO::PARAM_INT);
		$query->bindParam(':tag',$tag,PDO::PARAM_INT);
		$query->bindParam(':description',$desc,PDO::PARAM_STR);
		$query->bindParam(':iduser',$_COOKIE['id'],PDO::PARAM_INT);
		$query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
		$query->execute();
		$query->CloseCursor();
		
		echo(json_encode(["code" => 1,"message" => "success"]));
		Utility::nextPage("challenge/$idchallenge");	
	}

	public static function checkpost($idpost){
		global $db;
		//on vérifie si le name est déjà utilisé 
		$query=$db->prepare('SELECT iduser FROM post WHERE id=:idpost');
		$query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		$iduser=$datas['iduser'];
		if(empty($iduser)){
	    	return false;
	    	exit();
		}
		return $iduser;
	}
	
	
	//modifier post
	public static function updatepost($idpost){
		if(!self::checkpost($idpost)){
	    	echo(json_encode(["code" => 0,"message" => "post does not exist"]));
			exit();
		}
		$iduser=self::checkpost($idpost);
		global $user; 
		if($user->is_connected(MODERATEUR) || ($user->is_connected(MEMBRE) && $iduser==$_COOKIE['id'])){
			$title=(!empty($_POST['title']))? $_POST['title']:"";
			$desc=(!empty($_POST['desc']))? $_POST['desc']:"";

			global $db;
			$query=$db->prepare('UPDATE post SET title=:title,description=:description WHERE id=:idpost');
	        $query->bindParam(':title',$title,PDO::PARAM_STR);
	        $query->bindParam(':description',$desc,PDO::PARAM_STR);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
		}
	}

	//fonction valider post
	public static function validatepost($idpost){
		global $user;
		if(!$user->is_connected(MODERATEUR)){
	    	echo(json_encode(["code" => 0,"message" => "you can't do that young man"]));
			exit();
		}
		global $db;
		$query=$db->prepare('UPDATE post SET state=1 WHERE id=:idpost');
		$query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
		$query->execute();
		$query->CloseCursor();
		echo(json_encode(["code" => 1,"message" => "success"]));

	}

	//supprimer post
	public static function deletepost($idpost){
		if(!self::checkpost($idpost)){
	    	echo(json_encode(["code" => 0,"message" => "post does not exist"]));
			exit();
		}
		$iduser=self::checkpost($idpost);
		global $user; 
		if($user->is_connected(MODERATEUR) || ($user->is_connected(MEMBRE) && $iduser==$_COOKIE['id'])){
			global $db;
			$query=$db->prepare("SELECT linkcontent FROM post WHERE id=:idpost AND type=".IMAGE);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $datas=$query->fetch();
	        //si c'est une image on la supprime des fichiers
	        if(!empty($datas['linkcontent'])){
	        	unlink('../data/post/'.$datas['linkcontent']);
	        }
			$query=$db->prepare('DELETE FROM post WHERE id=:idpost');
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
			echo(json_encode(["code" => 1,"message" => "success : post deleted"]));	
	    }
	}

	public static function getRandomBackground(){
		
		global $db;
		$query=$db->prepare('SELECT COUNT(*) AS nbhd FROM post WHERE hd=1');
		$query->execute();
		$datas=$query->fetch();
		$nbhd=$datas['nbhd'];
		$query->CloseCursor();
		$random=rand(1,$nbhd);
		$query=$db->prepare('SELECT * FROM post WHERE hd=1');
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
		echo(json_encode(["code" => 1,"url" => 'post/'.$datas['linkcontent'], "user" => $result['name']]));
	}

	public static function toArray($idpost){
		if(!self::checkpost($idpost)){
	    	echo(json_encode(["code" => 0,"message" => "post does not exists"]));
			exit();
		}
		global $db;
		$query=$db->prepare('SELECT * FROM post WHERE id=:idpost');
		$query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		
		if ($datas['type'] == 1) {
		
			$link = 'post/'.$datas['linkcontent'];
		}
		else $link = $datas['linkcontent'];
		$item = [
			"id" => $idpost,
			"title" => $datas['title'],
			"state" => $datas['state'],
			"type" => $datas['type'],
			"hd" => $datas['hd'],
			"linkcontent" => $link,
			"description" => $datas['description'],
			"tag" => $datas['tag'],
			"winner" => $datas['winner'],
			"score" => $datas['score'],
			"datepost" => $datas['datepost'],
			"iduser" => $datas['iduser'],
			"idchallenge" => $datas['idchallenge']
		];
		echo(json_encode($item));

		return $item;
	}
	
		public static function returnArray($idpost){
		if(!self::checkpost($idpost)){
	    	echo(json_encode(["code" => 0,"message" => "post does not exists"]));
			exit();
		}
		global $db;
		$query=$db->prepare('SELECT * FROM post WHERE id=:idpost');
		$query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
		$query->execute();
		$datas=$query->fetch();
		$query->CloseCursor();
		
		if ($datas['type'] == 1) {
		
			$link = 'post/'.$datas['linkcontent'];
		}
		else $link = $datas['linkcontent'];
		$item = [
			"id" => $idpost,
			"title" => $datas['title'],
			"state" => $datas['state'],
			"type" => $datas['type'],
			"hd" => $datas['hd'],
			"linkcontent" => $link,
			"description" => $datas['description'],
			"tag" => $datas['tag'],
			"winner" => $datas['winner'],
			"score" => $datas['score'],
			"datepost" => $datas['datepost'],
			"iduser" => $datas['iduser'],
			"idchallenge" => $datas['idchallenge']
		];
		// echo(json_encode($item));

		return $item;
	}
	
	public static function getWinners() {
	
		Challenge::winners();
		global $db;
		$query=$db->prepare('SELECT * FROM post WHERE winner = 1');
		$query->execute();
		$win=array();
		while($datas=$query->fetch()){
			array_push($win, $datas['id']);
		}
		$query->CloseCursor();
		echo(json_encode($win));
	}
}

?>