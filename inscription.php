<?php 

session_start();

class User
{

private $pseudo;
private $password;
private $email;
private $desc;
private $key;
private $isActive;
private $birthdate;
private $cptwarnings;


public User($pseudo, $pwd, $mail, $desc, $isActive, $birthdate) {
	
	$this->pseudo = $pseudo;
	$this->password = $pwd;
	$this->mail = $email;
	$this->desc = $desc;
	$this->isActive = 0;
	$this->birthdate = $birthdate;	
}
public function register($pseudo, $password, $email){
	
}

public function getActive() {
	
	
}

public function signIn($pseudo, $password) {
	
}

public function signOut($pseudo, $password) {
	
}

public function likePost() {
	

}

public function changePassword($newPwd, $confirmationPwd) {
	
}

public function changeMail($newMail, $confirmationMail) {
	
	//try catch error if $newMail != $confirmationMail 
}
}


?>