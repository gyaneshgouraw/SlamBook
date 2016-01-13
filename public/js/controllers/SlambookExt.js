	angular.module('LoginModuleCtrl')
		.controller('SlambookExt',['$scope','$route','SlambookCollection', function($scope,$route,SlambookCollection) {

		console.log("SlambookExt controller");
		 if ($route)
		        console.log("refrencecode", $route);


$scope.createSlamEntry = function(){
 var slamdata = $scope.slam;
     slamdata.sendername = "gyanesh";
     slamdata.recievername = "gouraw";
	 slamdata.senderid=$route.current.params.senderid;
	 slamdata.recieverid=$route.current.params.recieverid;

SlambookCollection.createSlam(slamdata)
	.success(function (data) {
		$('#myMailModal').modal('toggle')
		alert("success");
	},
	function(data){
		alert("error");
	}
);
}

	}]);

