<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<link rel="stylesheet" type="text/css" href="layout.css">
	
	<link rel="stylesheet" href="bootstrap-3.3.7/dist/css/bootstrap.css">
	<!-- Latest compiled and minified JQuery -->
	<script src="jquery-3.2.0.min.js"></script>
	<!-- Latest compiled and minified Bootstrap JavaScript -->
	<script src="bootstrap-3.3.7/dist/js/bootstrap.min.js"></script> 
	<!-- CDN to angular.js-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.9/angular.min.js"></script>

	<!-- cdn for ionic icons-->
	<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
	<!-- cdn for font-awesome icons-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
</style>
</head>

<body>
	<header>
		<span class="ion-ios-baseball-outline" data-pack="default" data-tags=""></span>
		<p>Baseball Stadium Explorer</p>
	</header>

	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"> </span>
				<span class="icon-bar"> </span>
				<span class="icon-bar"> </span>
				</button>
				<a class="navbar-brand" href="#"></a>
			</div>

			<div>

			<div class="collapse navbar-collapse" id="navbar">
				<ul class="nav navbar-nav navbar-left">
					<li><a href="index.php?action=home">Home</a></li>

					<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown" href="#">Stat Explorer
					<span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="index.php?action=Map">Map</a></li>
						<li><a href="index.php?action=sources">Source Information</a></li>
					</ul>

					<li><a href="index.php?action=suggestions">Suggestions?</a></li>
					<li><a href="index.php?action=contact">Contact</a></li>
					</li>
				</ul>
			</div>
		</div>
		</div> <!--end of container-fluid-->
	</nav>

	<div class="container-fluid" id="mainContent">
		

		<?php 

		$action = null;

		if(isset($_REQUEST['action'])){
			$action = $_REQUEST['action'];

				if($action === 'home'){
					include("welcome.php");
				}
				else if($action === 'Map'){
					include("Map.php");
				}
				else if($action === 'sources'){
					include("source.php");
				}
				else if($action === 'suggestions'){
					include("suggestions.php");
				}
				else if($action === 'insert_suggestions'){
					include("insert_suggestions.php");
				}
				else if($action === 'show_collision'){
					include("source_information.php");
				}
				else if($action === 'contact'){
					include("contact.php");
				}
			}
			else{
				include("welcome.php");
			}
		

		?>
	</div><!--content div-->

	<footer class="footer">
        <p class="text-muted">All contents &amp; All rights reserved. &copy; Nick Romano</p>
    </footer>
</body>
</html>





















































