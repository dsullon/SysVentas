app.controller('DashboardCtrl', function($scope, $http, sesionesControl, evaluationFactory) {
  $scope.user = $.parseJSON(sesionesControl.get("userLoggued"));

  evaluationFactory.getActive().success(function(data)
  {
    $scope.evaluationActiveList = data;
  }); 

  evaluationFactory.getToEvaluate($scope.user.id).success(function(data)
  {
    $scope.listToEvaluate = data;
  });

  evaluationFactory.getByEvaluated($scope.user.id).success(function(data)
  {
    $scope.evaluationList = data;
  });  
});