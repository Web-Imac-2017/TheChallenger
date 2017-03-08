<?php 

class Message{
	public function sendMessage(){
		$message=(!empty($_POST['message']))? $_POST['message']:"";
		$email=(!empty($_POST['email']))? $_POST['email']:"";
		if(empty($message) || empty($email)){
			echo(json_encode(["code" => 0,"message" => "empty field(s)"]));
			exit();
		}
		$user=new User();
		if(!$user->is_connected(MEMBRE)){
			echo(json_encode(["code" => 0,"message" => "not conected"]));
			exit();
		}
		$destinataire='support@thechallenger.com';
		$sujet="new message from ".$_COOKIE['name'];
		$entete="From: support@thechallenger.com"."\r\n";
		$entete.="Reply-To:".$email."\r\n";

		$message=utf8_decode($message);

		//on envoie l'email
		mail($destinataire, $sujet, $message, $entete);
	}
}



?>
