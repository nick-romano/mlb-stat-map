var myApp = angular.module('myApp', []);

myApp.controller("controller", function($scope, $http, $q){
    scp = $scope;

    $scope.dbQuery = function dbQuery (table, phpfile, params){
    	deferred = $q.defer();
        $http.get(phpfile, params)
        .then( function (response) {
        	deferred.resolve(response);


        	if(table == 'Stadiums'){
            	$scope.stadiums = response.data;
            	$scope.mapStadiums()
            };
        });
        return deferred.promise
    }; 


    $scope.dbQuery('Stadiums','stadiums.php',{ sql : 'Select * from Baseball.Stadiums'})

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
    			//console.log(e)
    			uh = e
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

    			$scope.dbQuery('atbats', 'stadiums.php', {sql: 'hihi'}).then(function(r){console.log(r)})


    		});
    	}

    };



});