<?php 

// session_start();

include("identifiants.php");
// include("constants.php");

class Post
{

	//recupère toutes les infos d'un post
	public function display_post($id){
		$query=$db->prepare('SELECT * FROM thechallenger.post WHERE id =:id');
        $query->bindParam(':id',$id,PDO::PARAM_INT);
        $query->execute();
        $datas=$query->fetch();
        $query->CloseCursor();
        return $datas;
	}

	//on vérifie si la personne a deja like
	public function check_like($iduser,$idpost){
		$query=$db->prepare('SELECT id FROM thechallenger.score WHERE iduser=:iduser AND idpost=:idpost');
        $query->bindParam(':iduser',$iduser,PDO::PARAM_INT);
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $exist=($query->fetchColumn()==0)?true:false;
        $query->CloseCursor();
	}

	//gestion des like de post
	public function add_like($iduser,$idpost){
		//si l'utilisateur n'a pas encore like le post
		if(!$this->check_like($iduser,$idpost)){
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

	public function delete_like($iduser,$idpost){
		//si l'utilisateur a like
		if($this->check_like($iduser,$idpost)){
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

	public function test_image($image){
		if(!empty($image['size'])){
			//On définit les variables :
			$maxsize = 5000000; //Poid de l'image 5 mo max
			$maxwidth = 3000; //Largeur de l'image
			$maxheight = 3000; //Longueur de l'image
			$extensions_valides = array( 'jpg' , 'jpeg' , 'gif' , 'png', 'bmp' ); //Liste des extensions valides
			
			if ($image['error'] > 0)
			{
			    return 24;
			}
			if ($image['size'] > $maxsize)
			{
			    return 25;       
			}
			$image_sizes = getimagesize($image['tmp_name']);
			if ($image_sizes[0] > $maxwidth OR $image_sizes[1] > $maxheight)
			{
			    return 25;
			}
			
			$extension_upload = strtolower(substr(  strrchr($image['name'], '.')  ,1));
			if (!in_array($extension_upload,$extensions_valides) )
			{
			    return 26;
			}

			return 1;
		}
		else{
			return 24;
		}

	}

	//fonction déplacer le fichier image
	function move_image($image,$destination)
	{
	    $extension_upload = strtolower(substr(strrchr($image['name'], '.')  ,1));
	    $name = time();
	    $imagename = str_replace(' ','',$name).".".$extension_upload;
	    $name = $destination.str_replace(' ','',$name).".".$extension_upload;
	    move_uploaded_file($image['tmp_name'],$name);
	    return $imagename;
	}


	//insérer nouveau post
	public function add_post($title,$image,$type,$desc,$iduser,$idchallenge){
		$_SESSION['title']=$title;
		$_SESSION['image']=$image;
		$_SESSION['type']=$type;
		$_SESSION['desc']=$desc;
		$date=date("d m Y");
		
		$testimage=$this->test_image($image);
		if($testimage)==1){ //pas d'erreur sur l'image
			//on déplace l'image dans le bon dossier
			$linkcontent=$this->move_image($image,'images/images_posts');

			//on ajoute les donnees dans la bdd
			$query=$db->prepare('INSERT INTO thechallenger.post (title,state,linkcontent,type,description,datepost,iduser,idchallenge) VALUES (:title,0,:linkcontent,:type,:description,:datepost,:iduser,:idchallenge)');
	        $query->bindParam(':title',$title,PDO::PARAM_STR);
	        $query->bindParam(':linkcontent',$linkcontent,PDO::PARAM_STR);
	        $query->bindParam(':type',$type,PDO::PARAM_STR);
	        $query->bindParam(':description',$desc,PDO::PARAM_STR);
	        $query->bindParam(':datepost',$date,PDO::PARAM_STR);
	        $query->bindParam(':iduser',$iduser,PDO::PARAM_INT);
	        $query->bindParam(':idchallenge',$idchallenge,PDO::PARAM_INT);
	        $query->execute();
	        $query->CloseCursor();
		}
		else{
			return  $testimage;
		}
	}

	//modifier post
	public function update_post($idpost,$title,$type,$desc){
		$query=$db->prepare('UPDATE thechallenger.post SET title=:title,type=:type,description=:description WHERE id=:idpost');
        $query->bindParam(':title',$title,PDO::PARAM_STR);
        $query->bindParam(':type',$type,PDO::PARAM_STR);
        $query->bindParam(':description',$desc,PDO::PARAM_STR);
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
	}

	//supprimer post
	public function delete_post($idpost){
		$query=$db->prepare('DELETE FROM thechallenger.post WHERE id=:idpost');
        $query->bindParam(':idpost',$idpost,PDO::PARAM_INT);
        $query->execute();
        $query->CloseCursor();
	}
}

?>