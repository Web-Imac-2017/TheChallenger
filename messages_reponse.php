<?php 

//définition des variables de session
$pseudo_session=isset($_SESSION['pseudo'])? $_SESSION['pseudo']:'';
$email_session=isset($_SESSION['email'])? $_SESSION['email']:'';

//si il y a une erreur
if (isset($_GET['err']) && $_GET['err']!=0)
{
	//les différentes erreurs possibles
	echo "<div class='erreur'>";
	switch ($_GET['err'])
	{
		case 1: echo "ton pseudo comporte des caractères non autorisés ou alors il est vide";
		break;

		case 2: echo "ton mot de passe comporte des caractères non autorisés ou alors il est vide";
		break;

		case 3: echo "ton pseudo est déjà utilisé par un membre, merci d'en choisir un autre";
		break;

		case 4: echo "ton pseudo est soit trop grand, soit trop petit (entre 3 et 15 caractères)";
		break;

		case 5: echo "ton adresse email est déjà utilisée par un autre membre";
		break;

		case 6: echo "ton adresse email n'a pas un format valide";
		break;

		case 7: echo "ton mot de passe et ta confirmation ne correspondent pas";
		break;

		case 8: echo"tu es déjà connecté, <a href='./deconnexion.php'>déconnecte toi</a> avant de te reconnecter";
		break;

		case 9: echo"remplis tous les champs pour pouvoir t'identifier";
		break;

		case 10: echo"ton compte n'est pas encore activé, clique sur le lien reçu sur ton email pour l'activer";
		break;

		case 11: echo"le pseudo ou le mot de passe que tu as entré est incorrect";
		break;

		case 12: echo"il faut remplir tous les champs !";
		break;

		case 13: echo"l'adresse email que tu as entrée n'existe pas sur ORQCS";
		break;

		case 14: echo"le pseudo que tu as entré n'existe pas sur ORQCS";
		break;

		case 15: echo"l'adresse email et le pseudo que tu as entrés ne correspondent pas";
		break;

		case 16: echo"erreur de captcha, recommence s'il te plaît";
		break;

		case 17: echo"tu n'es pas connecté";
		break;

		case 18: echo"ton compte est déjà activé";
		break;

		case 19: echo"halte là jeune curieux, tu n'as pas les droits pour entrer dans cette section du site";
		break;

		case 20: echo"désolé, tu as déjà visionné tout le contenu de cette section: <a href='contenu.php?action=ajouter'>ajouter du contenu</a>";
		break;

		//case 21: echo"désolé cet utilisateur a choisi de ne pas rendre son profil public";
		//break;

		case 22: echo"ton avatar n'est pas valide (max 1mo, max 3000x3000, jpg / jpeg / bnp / gif / png)";
		break;

		case 23: echo"désolé une erreur est survenue, merci d'essayer à nouveau";
		break;

		case 404: echo"désolé le contenu n'a pas pu être trouvé";
		break;
	}
	echo "</div>";
}

//si le formulaire est validé
elseif (isset($_GET['valide']) && $_GET['valide']!=0)
{
	echo "<div class='ok'>";
	//différentes validations
	switch($_GET['valide'])
	{
		case 101: echo "clique sur le lien que tu as reçu par email pour activer ton compte ORQCS !";
		break;

		case 102: echo "un email contenant ton pseudo a été envoyé à ".$email_session;
		break;

		case 103: echo "un email contenant ton nouveau mot de passe a été envoyé à ".$email_session;
		break;

		case 104: echo "félicitations, ton inscription est terminée, tu peux maintenant te connecter";
		break;

		case 105: echo "le profil a bien été modifié";
		break;

		case 106: echo "Merci, le contenu est en attente de validation et sera bientôt ajouté sur ORQCS";
		break;

		case 107: echo "merci, ton message a bien été envoyé, nous te répondrons au plus vite !";
		break;

		case 108: echo "l'utilisateur a bien reçu l'avertissement";
		break;

		case 109: echo "tu as bien ajouté ce membre à ta liste d'amis";
		break;

		case 110: echo "le membre a bien été supprimé de ta liste d'amis";
		break;

		case 111: echo "tu as bien été déconnecté, à bientôt !";
		break;
	}
	echo "</div>";
}

?>