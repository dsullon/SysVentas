app.controller('ResultCtrl', function($scope, $stateParams, $http, sesionesControl, 
employeeFactory, evaluationFactory) {
  $scope.evaluationId = $stateParams.id;
  employeeFactory.getEvaluatedByEvaluation($scope.evaluationId).success(function(data)
  {
    $scope.evaluatedList = data;
  });
});