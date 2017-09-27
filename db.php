<?php 
//dbconfigdata hidden

$con = mysqli_connect($hostname,$username,$passwd,$dbname);

if(!$con){
	die("Database connection error " . mysqli_connect_errno());
};

?>