<?php 

session_start();

class Post
{

private $id;
private $state;
private $type;
private $winner;
private $score;
private $date;
private $iduser;
private $idchallenge
private $countLikes


public Post($state, $type, $winner, $score, $date, $iduser, $idchallenge) {

// constructeur
}

public function getsLike() {
	
	$this->countLikes ++;
}

public function losesLike() {
	
	$this->countLikes --;
}

public function getUser() {

// afficher le nom de l'artiste

	$n = $this->iduser;
	// requête SQL
	// SELECT user.pseudo FROM user WHERE user.id = $n
}


?>