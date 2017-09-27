<!--google maps API -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVQB2GaX91OEHVEf52kEFRUGp--Lf24HQ"></script>

<script src="js/customScript.js"></script>


<div class="container-fluid" ng-app="myApp" ng-controller="controller">
	<h3>MLB Stadium Map</h3>

<div id="mapCanvas" class="col-xs-12 col-sm-8">
</div>
<div id ="statsPanel" class="col-xs-12 col-sm-4">

	<div id="popTables">
		<h6 id="instructions"> Click a Stadium point in the map to retrieve statistics about the stadium.</h6>
		<div id="infoScreen">
		<table class="poptable">
			<tbody>
				<tr>
					<th>Stadium</th>
				</tr>
				<tr>
					<td id ="stadiumName"></td>
				</tr></tbody>
			</table>
			<table class="poptable">
				<tbody>
					<tr>
						<th>Team</th>
					</tr>
					<tr>
						<td id="stadiumTeam"></td>
					</tr>
				</tbody>
			</table>
			<table class="poptable">
				<tbody>
					<tr>
						<th>Capacity</th>
					</tr>
					<tr>
						<td id="stadiumCapacity"></td>
					</tr>
				</tbody>
			</table>
			<table class="poptable">
				<tbody>
					<tr>
						<th>Year Built</th>
					</tr>
					<tr>
						<td id="stadiumYear"></td>
					</tr>
				</tbody>
			</table>

			<table class="poptable form-group" id="pillGroup">
				<tbody>
					<tr>
						<th>Players Stats</th>
					</tr>
					<tr>
						<td class="btn-group col-xs-12 col-sm-12" data-toggle="buttons" id="statPills">
							<label class="col-sm-4 btn  btn-info active" ng-click="hrQuery()" id="HR">
								<input type="radio" name="rbHR" value="HR" > HR
							</label>
							<label class="col-sm-4 btn btn-info" ng-click="hitQuery()" id="HITS">
								<input type="radio" name="rbHITS" value="HITS"> HITS
							</label>
							<label class="col-sm-4 btn btn-info" ng-click="soQuery()" id="SO">
								<input type="radio" name="rbAVG" value="SO" > SO
							</label>
						</td>
					</tr>
				</tbody>
			</table>

			<div id="statDisplay">
				<table class="poptable playerTable">
				<thead>
  						<tr>
     						<th>First</th>
     						<th>Last</th>
     						<th>Count</th>
  						</tr>
 					</thead>
				<tbody>
					<tr ng-repeat="player in selectedQuery" class="">
						<td>{{player.first}}</td>
						<td>{{player.last}}</td>
						<td>{{player.c}}</td>
					</tr>
				</tbody>
				</table>
			</div>

		</div>
	</div>

</div>
</div>
<br>


<script>
var map;
function init(){
	var mapOptions = {
		center: {lat: 37.65880, lng: -95.710020},
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(
		document.getElementById('mapCanvas'), mapOptions
	)
	}init();
</script>
