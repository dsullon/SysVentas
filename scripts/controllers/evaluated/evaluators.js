app.controller('EvaluatorsCtrl', function($scope, $stateParams, sesionesControl, employeeFactory, 
evaluationFactory, $http, $timeout) {
  $scope.evaluationId = $stateParams.id; 
  $scope.user = $.parseJSON(sesionesControl.get("userLoggued"));
  $scope.evaluatorList = [];

  employeeFactory.getEvaluatorByEvaluated($scope.evaluationId, $scope.user.id).success(function(data)
  {
    var employeeList = data;
    angular.forEach(employeeList, function(value, key){
      $scope.getProgress(value);
      $scope.evaluatorList.push(value);
    });
  });

  $scope.calculateAverage = function(){
    $scope.totalAverage = (0).toFixed(1);
    $scope.average = (0).toFixed(1);
    var count = 0;
    var sum = 0;
    var countC = 0;
    var sumC = 0;
    angular.forEach($scope.questionList, function(value, key){
      if($scope.criteriaSelected.id != 0){
        if(value.answer && value.answer > 0){
          count ++;
          sum += parseInt(value.answer);
          $scope.totalAverage = (sum / count).toFixed(1);
          if(value.question_criteria == $scope.criteriaSelected.id){
            countC ++;
            sumC += parseInt(value.answer);
            $scope.average = (sumC / countC).toFixed(1);
          }
        }
      }
    });
  }

  $scope.getProgress = function(evaluator){
    evaluator.totalAverage = (0).toFixed(1);
    var count = 0;
    var sum = 0;
    evaluationFactory.getQuestions($scope.evaluationId, evaluator.id, $scope.user.id).success(function(data)
    {
      var questionList = data;
      angular.forEach(questionList, function(value, key){
        if(value.answer && value.answer > 0){
          count ++;
          sum += parseInt(value.answer);
        }      
      });
      if(count>0){
        evaluator.totalAverage = (sum / count).toFixed(1);
      }
    });
  }
});