<?php 

class searchController {
	public static function search(){
		$search=(!empty($_GET['search']))? $_GET['search']:"";
		//challenge ou post
		$searchtype=(!empty($_POST['searchtype']))? $_POST['searchtype']:"";
		if(empty($search) || empty($searchtype)){
			echo(json_encode(["code" => 0,"message" => "empty field"]));
			exit();
		}
		$search='%'.$search.'%';
		global $db;
		$query=$db->prepare('SELECT id FROM '.$searchtype.' WHERE title LIKE :search');
		$query->bindParam(':search',$search,PDO::PARAM_STR);
		$query->execute();
		$results=array();
		// $results[0]=$searchtype;
		while($datas=$query->fetch()){
			array_push($results, $datas['id']);
		}
		$query->CloseCursor();
		if(empty($results[1])){
			echo(json_encode(["code" => 0,"message" => "no results"]));
			exit();
		}

		//on renvoi le tableau d'id
		echo(json_encode($results));

	}
}



?>