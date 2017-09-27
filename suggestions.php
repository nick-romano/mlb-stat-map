<h3>Suggestions?</h3>
<p> Let me know what you would like to see more of in this application</p>
		<div id="report" class="row alert alert-info">
			<form method="post" action="index.php?action=insert_suggestions" enctype="multipart/form-data" class="form-horizontal">

					
				
				<div class="form-group">
					<label for="Name" class="control-label col-sm-2">Name: </label>
					<div class="col-sm-8">
						<input type="text"  class="form-control col-sm-8" id="Name" name="Name" />
					</div>
				</div>

				<div class="form-group">
					<label for="Email" class="control-label col-sm-2">Email: </label>
					<div class="col-sm-8">
						<input type="text"  class="form-control col-sm-8" id="Email" name="Email" />
					</div>
				</div>

				<div class="form-group">
					<label for="Suggestions" class="control-label col-sm-2">Suggestions: </label>
					<div class="col-sm-8">
						<textarea rows="4" class="form-control col-sm-8" id="Suggestions" name="Suggestions"> </textarea>
					</div>
				</div>


				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10 col-xs-10 col-sm-10">
						<input type="reset" id="cancel" value="Cancel" class="btn btn-default"/>
						<input type="submit" id="submit" value="Submit" class="btn btn-primary"/>
					</div>
				</div>
			</form>
		</div><!--Report div-->