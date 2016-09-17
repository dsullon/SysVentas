app.controller('ProgressCtrl', function($scope, $stateParams, $http, sesionesControl, 
employeeFactory, evaluationFactory) {
    $scope.evaluationId = $stateParams.id;
    employeeFactory.getEvaluatedByEvaluation($scope.evaluationId).success(function(data)
    {
        $scope.evaluatedList = data;
    });

    $scope.getAverage = function(evaluated){
        evaluated.totalAverage = (0).toFixed(1);
        var count = 0;
        var sum = 0;
        evaluationFactory.getQuestionsByEvaluated($scope.evaluationId, evaluated.id).success(function(data)
        {
            var questionList = data;
            if(questionList){
                for (var idx = 0; idx < questionList.length; idx++) {
                    value = questionList[idx];
                    if(value.answer && value.answer >= 0){
                        count ++;
                        sum += parseInt(value.answer);
                    }
                }
            }
            if(count>0){
                evaluated.totalAverage = (sum / count).toFixed(1);
            }
        });
    };
});