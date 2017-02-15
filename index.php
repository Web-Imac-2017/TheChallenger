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
		<input name="name" type="text" maxlength="20">
		<input name="pwd" type="text" maxlength="20">
		<input name="pwdconfirm" type="text" maxlength="20">
		<input name="email" type="text" maxlength="50">
		<input type="submit">
	</form>
</body>
</html>