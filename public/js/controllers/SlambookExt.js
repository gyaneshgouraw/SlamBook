	angular.module('LoginModuleCtrl')
		.controller('SlambookExt',['$scope','$route','SlambookCollection','$location', function($scope,$route,SlambookCollection,$location) {

		console.log("SlambookExt controller");
		 if ($route)
		        console.log("refrencecode", $route);

if($route.current.params.senderid == "disp"){
 var getslamrequest = {
 	 sendermailid : $route.current.params.sendermailid,
	 recievermailid :$route.current.params.recievermailid
 };
 SlambookCollection.getSelectedSlam(getslamrequest)
 .then(function(success){
	 	//alert("success");
	 	if(success.data.length>=0){
	 		$('#multipleSlamInstance').modal('show');
	 		$scope.slamList = success.data;
	 	}
	 },
	 function(error){
	    alert("error");
 });
}

$scope.renderSelectedSlam = function(item){
		$scope.slam = item;
		$('#multipleSlamInstance').modal('hide');
};



$scope.createSlamEntry = function(){
 var slamdata = $scope.slam;
     slamdata.sendername = "gyanesh";
     slamdata.recievername = "gouraw";
	 slamdata.senderid=$route.current.params.senderid;
	 slamdata.recieverid=$route.current.params.recieverid;
	 slamdata.sendermailid = $route.current.params.sendermailid;
	 slamdata.recievermailid = $route.current.params.recievermailid;
	 slamdata.createdon = new Date();

SlambookCollection.createSlam(slamdata)
			.success(function (data) {
				$('#myMailModal').modal('toggle');
				$scope.slamSuccess = true;
			},
			function(data){
				$('#myMailModal').modal('toggle');
				$scope.slamSuccess = false;
			}
		);
};

$scope.redirectLogin = function(){
	$('#myMailModal').appendTo("body") ;
	$('#myMailModal').modal('hide');
	 $location.path("/login");
}

	}]);

