<?php
	require_once("./api/constants.php");
	require_once('./api/model/routing.php');
	require_once('./api/model/database.php');
	$db=database::getPdo();
	require_once("./api/model/User.php");
	require_once("./api/controller/userController.php");
	require_once("./api/model/Post.php");
	require_once("./api/controller/postController.php");
	require_once("./api/model/challenge.php");
	require_once("./api/controller/challengeController.php");
?>

<html>
<head>
	<title>test</title>
 	<meta charset="utf-8">	
</head>
<body>
	<form method="post" enctype="multipart/form-data" action="api/post/add/2" autocomplete="on">
		<input type="text" name="title" placeholder="title">
		<input type="file" name="image" placeholder="title">
		<select name="type">
			<option value="image">image</option>
			<option value="link">lien</option>
			<option value="other">autre</option>
		</select>
		<textarea name="desc">description</textarea>
		<input type="submit" value="envoyer">
	</form>
</body>
</html>
