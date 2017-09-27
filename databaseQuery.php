<?php

$hostname="localhost";
$username="root";
$passwd="root";
$dbname="database";

$con = mysqli_connect($hostname,$username,$passwd,$dbname);

if(!$con){
	die("Database connection error " . mysqli_connect_errno());
};


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



print_r(json_encode($returnJSON));

//function($results)
//https://developers.arcgis.com/javascript/3/jssamples/graphics_add.html
//https://developers.arcgis.com/javascript/3/jsapi/infotemplate-amd.html
 
/*EXAMPLE JAVASCRIPT REQUEST-  ** written in angular, you could use javascript or jQuery
    $scope.dbQuery = function dbQuery (table, phpfile, params){
    	deferred = $q.defer();
    	//console.log(params)
        $http.get(phpfile, {params: params})
        .then( function (response) {
        	deferred.resolve(response);
        });
        return deferred.promise
    }; 
*/

    
?>
