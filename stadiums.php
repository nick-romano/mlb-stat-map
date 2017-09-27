<?php

	require_once("db.php");


$sql = $_GET['sql'];

if(mysqli_query($con, $sql)){
	$result = mysqli_query($con, $sql);
	$returnJSON = array();
	while($row = mysqli_fetch_array($result)){
		array_push($returnJSON, $row);
	};
}else{
	die("Invalid query: " . mysqli_error($con));
}


//function($results)

print_r(json_encode($returnJSON));

?>