<?php 

class Post extends Image
{
	//on vérifie si la personne a deja like
	public static function checklike($idpost){
		global $db;
		global $user;
		if(!$user->is_connected(MEMBRE)){
			echo(json_encode(["code" => 0,"message" => "not connected"]));
			exit();
		}
		else{
			$query=$db->prepare('SELECT id FROM score WHERE iduser=:iduser AND idpost=:idpost');
	        $query->bindParam(':iduser',$_COOKIE['id'],PDO::PARAM_INT);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $exist=($query->fetchColumn()==0)?false:true;
	        $query->CloseCursor();
	        return $exist;
		}
	}

	public static function getIdChallenge($idpost){
		$query=$db->prepare('SELECT idchallenge FROM post WHERE id=:idpost');
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch;
        return $datas['idchallenge'];
	}

}
?>