<?php 
	class Utility{
		public static function nextPage($page){
			$page_file_temp = $_SERVER["PHP_SELF"];
	    	$page_directory = dirname($page_file_temp);
	    	$path = str_replace("api", "", $page_directory) . "#/" . $page;
	    	header("Location: ". $path);
	    }
	}
?>