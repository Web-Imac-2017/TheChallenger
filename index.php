<?php 
session_start();

?>

<html>
<head>
	<title>test</title>
	<meta charset="utf-8">
</head>
<body>
	<form method="POST" action="user.php" autocomplete="on">
		<input name="name" type="text" maxlength="20" placeholder="nom / pseudo" required>
		<input name="pwd" type="password" maxlength="100" placeholder="mot de passe" required>
		<input name="pwdconfirm" type="password" maxlength="100" placeholder="confirmer mot de passe" required>
		<input name="email" type="text" maxlength="150" placeholder="email" required>
		<input type="submit">
	</form>
</body>
</html>