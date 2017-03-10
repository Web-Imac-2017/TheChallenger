<?php 

class Post
{
	public function test_image($image){

		if(empty($image['size'])){
	    	echo(json_encode(["code" => 0,"message" => "image error"]));
			exit();
		}
		//On définit les variables :
		$maxsize = 5000000; //Poid de l'image 5 mo max
		$maxwidth = 5000; //Largeur de l'image
		$maxheight = 5000; //Longueur de l'image
		$extensions_valides = array( 'jpg' , 'jpeg' , 'gif' , 'png', 'bmp' ); //Liste des extensions valides
		
		if ($image['error'] > 0)
		{
        	echo(json_encode(["code" => 0,"message" => "image error"]));
    		exit(); 
		}
		if ($image['size'] > $maxsize)
		{
        	echo(json_encode(["code" => 0,"message" => "image too big"]));
    		exit();      
		}
		$image_sizes = getimagesize($image['tmp_name']);
		if ($image_sizes[0] > $maxwidth OR $image_sizes[1] > $maxheight)
		{
        	echo(json_encode(["code" => 0,"message" => "dimensions exeded"]));
    		exit();
		}
		$extension_upload = strtolower(substr(  strrchr($image['name'], '.')  ,1));
		if (!in_array($extension_upload,$extensions_valides) )
		{
		    echo(json_encode(["code" => 0,"message" => "wrong image extension"]));
			exit();
		}
		if ($image_sizes[0] >= 1920 && $image_sizes[1] >= 1080)
		{
		    return 2;
		}

		return 1;

	}

	//on vérifie si la personne a deja like
	public static function checklike($idpost){
		global $db;
		global $user;
		if(!$user->is_connected(MEMBRE)){
			echo(json_encode(["code" => 0,"message" => "not connected"]));
			exit();
		}
		else{
			$query=$db->prepare('SELECT id FROM thechallenger.score WHERE iduser=:iduser AND idpost=:idpost');
	        $query->bindParam(':iduser',$_COOKIE['id'],PDO::PARAM_INT);
	        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
	        $query->execute();
	        $exist=($query->fetchColumn()==0)?false:true;
	        $query->CloseCursor();
	        return $exist;
		}
	}

	public static function getIdChallenge($idpost){
		$query=$db->prepare('SELECT idchallenge FROM thechallenger.post WHERE id=:idpost');
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch;
        return $datas['idchallenge'];
	}
	
	//fonction déplacer le fichier image
	public function move_image($image,$destination)
	{
	    $extension_upload = strtolower(substr(strrchr($image['name'], '.')  ,1));
	    $name = time();
	    $imagename = str_replace(' ','',$name).".".$extension_upload;
	    $name = $destination.str_replace(' ','',$name).".".$extension_upload;
	    move_uploaded_file($image['tmp_name'],$name);
	    return $imagename;
	}
}
?>