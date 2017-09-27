<?php 
	require_once('db.php');
	$name = $_POST['Name'];
	$email = $_POST['Email'];
	$suggestions = $_POST['Suggestions'];
	/*
	if(!empty($name) && is_string($name) && !empty($email) && is_string($email) && !empty($suggestions) && is_string($suggestions) {
		$sql = "insert Suggestions(name, email, suggestions) values ('$name', '$email', '$suggestions')";
		if(mysqli_query($con, $sql)){
			$subTitle = "You're Information has been recorded";
		}else {
			die("Insert failed: " . mysqli_error($con));
			$subTitle = 'Sorry';
	}
	}else{
		$subTitle = 'Sorry';
	}
	*/
	if(!empty($name) && is_string($name) && !empty($email) && is_string($email) && !empty($suggestions) && is_string($suggestions)) {
		$sql = "insert Suggestions(Name, Email, SuggestionsTxt) values ('$name', '$email', '$suggestions')";
		if(mysqli_query($con, $sql)){
				$subTitle = "You're Information has been recorded";
			}else {
				die("Insert failed: " . mysqli_error($con));
				$subTitle = 'Sorry';
		}
	}else{
		$subTitle = 'Sorry';
	}

?>
<div id ="suggResults" class="jumbotron">
	<dl style="display:<?php echo $subTitle == "You're Information has been recorded" ? 'block':'none' ?>">
		<h2><?php print $subTitle; ?></h2>
	
		<dt>Name</dt>
		<dd><?php print $name; ?></dd>
	
		<dt>Email</dt>
		<dd><?php print $email; ?></dd>
	
		<dt>Suggestion</dt>
		<dd><?php print $suggestions; ?></dd>
	
	</dl>
	
	<h6 style="display:<?php echo $subTitle == "Sorry" ? 'block':'none' ?>">
		You didn't fill out the form completely. <a href="index.php?action=suggestions">Try Again?</a>
	</h6>
</div>
