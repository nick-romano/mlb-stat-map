var myApp = angular.module('myApp', []);

myApp.controller("controller", function($scope, $http, $q){
    scp = $scope;

    $scope.dbQuery = function dbQuery (table, phpfile, params){
    	deferred = $q.defer();
    	//console.log(params)
        $http.get(phpfile, {params: params})
        .then( function (response) {
        	deferred.resolve(response);


        	if(table == 'Stadiums'){
            	$scope.stadiums = response.data;
            	$scope.mapStadiums()
            };
        });
        return deferred.promise
    }; 


    $scope.dbQuery('Stadiums','stadiums.php',{sql: "Select * from baseball2.Stadiums;"})

    //function to add Stadium Points and Markers to the map. Runs after stadium query is run
    $scope.mapStadiums = function(){
    	$scope.stadiumPoints = {}
    	$scope.markers = []
    	for(i=0;i<$scope.stadiums.length; i++){
    		$scope.stadiumPoints[$scope.stadiums[i].Name] = new google.maps.LatLng(scp.stadiums[i].y, scp.stadiums[i].x);
    	};

    	for(i in $scope.stadiumPoints){
    		$scope.markers.push(
    			new google.maps.Marker({
        			position: $scope.stadiumPoints[i],
        			map: map,
        			title: i,
        			icon : 'http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png',
        			//label: i
   				})
    		);
    	};

    	for(i=0; i < $scope.markers.length;i++){
    		var name = i
    		$scope.markers[i].addListener('click', function(e) {
    			$scope.clickQuery(e);
    		});
    	}

    	$scope.clickQuery = function clickQuery(e){

    		var clickLat = e.latLng.lat()

    		for(i=0; i<$scope.stadiums.length;i++){
    				if($scope.stadiums[i].y == clickLat){
    					$scope.currStadium = $scope.stadiums[i]
    					var Capacity = parseInt($scope.stadiums[i].Capacity)
    					$('#stadiumName')[0].innerHTML = $scope.stadiums[i].Name;
    					$('#stadiumTeam')[0].innerHTML = $scope.stadiums[i].City +' '+ $scope.stadiums[i].Team;
    					$('#stadiumCapacity')[0].innerHTML = parseInt(scp.stadiums[i].Capacity).toLocaleString();
    					$('#stadiumYear')[0].innerHTML = $scope.stadiums[i].yearBuilt;
    				}
    		}

    		if($('#HR').hasClass('active')){
    			$scope.hrQuery()
    		}else if($('#HITS').hasClass('active')){
    			$scope.hitQuery()
    		}else if($('#SO').hasClass('active')){
    			$scope.soQuery()
    		}
    		
    		if($('#instructions').css('display') == 'block'){
    			$('#instructions').css('display', 'none');
    			$('#infoScreen').css('display', 'block')
    		}

    	}

    	$scope.hrQuery = function(){
    		$scope.dbQuery('atbats', 'stadiums.php', {
    			sql: 'SELECT batter, COUNT(batter) as c, event FROM baseball2.atbats WHERE ab_id REGEXP "/'+$scope.currStadium.team_code+'" and event = "Home Run" GROUP BY batter order by c DESC LIMIT 5;'
    		}).then(function(r){
    			$scope.hrLeaders = r.data;
    			$scope.tiedLeaders = [];
    			$scope.hrLeaders[0]

    			$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hrLeaders[0].batter
    			}).then(function(r){
    				$scope.hrLeaders[0].first = r.data[0].first;
    				$scope.hrLeaders[0].last = r.data[0].last;

    			if($scope.hrLeaders.length > 1) {
    					$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hrLeaders[1].batter
    				}).then(function(r){
    					$scope.hrLeaders[1].first = r.data[0].first;
    					$scope.hrLeaders[1].last = r.data[0].last;
    					if($scope.hrLeaders.length > 2) {
    						$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hrLeaders[2].batter
    					}).then(function(r){
    						$scope.hrLeaders[2].first = r.data[0].first;
    						$scope.hrLeaders[2].last = r.data[0].last;

    							if($scope.hrLeaders.length > 2) {
    									$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hrLeaders[3].batter
    								}).then(function(r){
    									$scope.hrLeaders[3].first = r.data[0].first;
    									$scope.hrLeaders[3].last = r.data[0].last;
    									if($scope.hrLeaders.length > 4) {
    										$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hrLeaders[3].batter
    									}).then(function(r){
    										$scope.hrLeaders[3].first = r.data[0].first;
    										$scope.hrLeaders[3].last = r.data[0].last;

    											if($scope.hrLeaders.length > 3) {
    													$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hrLeaders[4].batter
    												}).then(function(r){
    													$scope.hrLeaders[4].first = r.data[0].first;
    													$scope.hrLeaders[4].last = r.data[0].last;
    													if($scope.hrLeaders.length > 2) {
    														$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hrLeaders[4].batter
    													}).then(function(r){
    														$scope.hrLeaders[4].first = r.data[0].first;
    														$scope.hrLeaders[4].last = r.data[0].last;
    													});
    													}
    												})
    											}
    									});
    									}
    								})
    							}    						
    					});
    					}
    				})
    			}
    			})
    		$scope.selectedQuery = $scope.hrLeaders;
    		})
    	}

    	$scope.hitQuery = function(){
    		$scope.dbQuery('atbats', 'stadiums.php', {
    			sql: 'SELECT batter, count(batter) as c, hit_Type FROM baseball2.atbats WHERE ab_id REGEXP "/'+$scope.currStadium.team_code+'" AND (hit_Type = "H") GROUP BY batter order by c DESC LIMIT 5;'
    		}).then(function(r){
    			$scope.hitLeaders = r.data;
    			$scope.hitLeaders[0]

    			$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hitLeaders[0].batter
    			}).then(function(r){
    				$scope.hitLeaders[0].first = r.data[0].first;
    				$scope.hitLeaders[0].last = r.data[0].last;

    			if($scope.hitLeaders.length > 1) {
    					$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hitLeaders[1].batter
    				}).then(function(r){
    					$scope.hitLeaders[1].first = r.data[0].first;
    					$scope.hitLeaders[1].last = r.data[0].last;
    					if($scope.hitLeaders.length > 2) {
    						$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hitLeaders[2].batter
    					}).then(function(r){
    						$scope.hitLeaders[2].first = r.data[0].first;
    						$scope.hitLeaders[2].last = r.data[0].last;

    							if($scope.hitLeaders.length > 2) {
    									$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hitLeaders[3].batter
    								}).then(function(r){
    									$scope.hitLeaders[3].first = r.data[0].first;
    									$scope.hitLeaders[3].last = r.data[0].last;
    									if($scope.hitLeaders.length > 4) {
    										$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hitLeaders[3].batter
    									}).then(function(r){
    										$scope.hitLeaders[3].first = r.data[0].first;
    										$scope.hitLeaders[3].last = r.data[0].last;

    											if($scope.hitLeaders.length > 3) {
    													$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hitLeaders[4].batter
    												}).then(function(r){
    													$scope.hitLeaders[4].first = r.data[0].first;
    													$scope.hitLeaders[4].last = r.data[0].last;
    													if($scope.hitLeaders.length > 2) {
    														$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.hitLeaders[4].batter
    													}).then(function(r){
    														$scope.hitLeaders[4].first = r.data[0].first;
    														$scope.hitLeaders[4].last = r.data[0].last;
    													});
    													}
    												})
    											}
    									});
    									}
    								})
    							}    						
    					});
    					}
    				})
    			}
    			})
    		$scope.selectedQuery = $scope.hitLeaders;
    		})
    	}

    	$scope.soQuery = function(){
    		$scope.dbQuery('atbats', 'stadiums.php', {
    			sql: 'SELECT batter, COUNT(batter) as c, event FROM baseball2.atbats WHERE ab_id REGEXP "/'+$scope.currStadium.team_code+'" and event = "Strikeout" GROUP BY batter order by c DESC LIMIT 5;'
    		}).then(function(r){
    			$scope.soLeaders = r.data;
    			$scope.tiedLeaders = [];
    			$scope.soLeaders[0]

    			$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.soLeaders[0].batter
    			}).then(function(r){
    				$scope.soLeaders[0].first = r.data[0].first;
    				$scope.soLeaders[0].last = r.data[0].last;

    			if($scope.soLeaders.length > 1) {
    					$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.soLeaders[1].batter
    				}).then(function(r){
    					$scope.soLeaders[1].first = r.data[0].first;
    					$scope.soLeaders[1].last = r.data[0].last;
    					if($scope.soLeaders.length > 2) {
    						$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.soLeaders[2].batter
    					}).then(function(r){
    						$scope.soLeaders[2].first = r.data[0].first;
    						$scope.soLeaders[2].last = r.data[0].last;

    							if($scope.soLeaders.length > 2) {
    									$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.soLeaders[3].batter
    								}).then(function(r){
    									$scope.soLeaders[3].first = r.data[0].first;
    									$scope.soLeaders[3].last = r.data[0].last;
    									if($scope.soLeaders.length > 4) {
    										$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.soLeaders[3].batter
    									}).then(function(r){
    										$scope.soLeaders[3].first = r.data[0].first;
    										$scope.soLeaders[3].last = r.data[0].last;

    											if($scope.soLeaders.length > 3) {
    													$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.soLeaders[4].batter
    												}).then(function(r){
    													$scope.soLeaders[4].first = r.data[0].first;
    													$scope.soLeaders[4].last = r.data[0].last;
    													if($scope.soLeaders.length > 2) {
    														$scope.dbQuery('players', 'stadiums.php', {sql: 'SELECT first, last from baseball2.players WHERE id = ' + $scope.soLeaders[4].batter
    													}).then(function(r){
    														$scope.soLeaders[4].first = r.data[0].first;
    														$scope.soLeaders[4].last = r.data[0].last;
    													});
    													}
    												})
    											}
    									});
    									}
    								})
    							}    						
    					});
    					}
    				})
    			}
    			})
    		$scope.selectedQuery = $scope.soLeaders;
    		})
    	}

    };

});