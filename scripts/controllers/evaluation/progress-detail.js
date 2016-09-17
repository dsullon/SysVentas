app.controller('ProgressDetailCtrl', function($scope, $stateParams, $http, $timeout, $mdDialog, $filter, employeeFactory, evaluationFactory, evaluationCriteriaFactory) {
    $scope.evaluatorList = null;
    $scope.evaluationList = null;

    evaluationFactory.getOneEvaluation($stateParams.id).success(function(data)
    {
        $scope.evaluation = data;
    });

    employeeFactory.getOne($stateParams.evaluated).success(function(data)
    {
        $scope.evaluated = data;
    });

    $timeout(function(){
        employeeFactory.getEvaluatorByEvaluated($scope.evaluation.id, $scope.evaluated.id).success(function(data)
        {
            $scope.evaluatorList = data;
        });
        
        evaluationCriteriaFactory.getByType($scope.evaluation.evaluation_type_id).success(function(data)
        {
            $scope.criteriaList = data;
        });

        evaluationFactory.getQuestionsByEvaluated($scope.evaluation.id, $scope.evaluated.id).success(function(data)
        {
            $scope.evaluationList = data;
        });

        evaluationFactory.getComments($scope.evaluation.id).success(function(data)
        {
            $scope.commentList = data;
        });

        evaluationFactory.getCommentsByEvaluated($scope.evaluation.id, $scope.evaluated.id).success(function(data)
        {
            $scope.commentEvaluationList = data;
        });

        evaluationFactory.getQuestionToSelfEvaluation($scope.evaluation.id, $scope.evaluated.id).success(function(data)
        {
            $scope.selfEvaluationList = data;
        });
    },1000);

    $scope.getSelfAverage = function(evaluator, criteria)
    {
        var average =(0).toFixed(1);
        var count = 0;
        var sum = 0;
        var value = null;
        if($scope.selfEvaluationList){
            var list = $filter('filter')($scope.selfEvaluationList, {evaluated_id: evaluator, question_criteria: criteria});
            for (var idx = 0; idx < list.length; idx++) {
                value = list[idx];
                if(value.answer && value.answer > 0){
                    count ++;
                    sum += parseInt(value.answer);
                    average = (sum / count).toFixed(1);
                }
            }
        }        
        return average;
    };    
    
    $scope.getAverage = function(evaluator, criteria)
    {
        var average =(0).toFixed(1);
        var count = 0;
        var sum = 0;
        var value = null;
        if($scope.evaluationList){
            var list = [];
            for (var idx = 0; idx < $scope.evaluationList.length; idx++) {
                value = $scope.evaluationList[idx];
                if(value.evaluator === evaluator && value.criteria === criteria){
                    list.push(value);
                }
            }
            for (var idx = 0; idx < list.length; idx++) {
                value = list[idx];
                if(value.answer && value.answer > 0){
                    count ++;
                    sum += parseInt(value.answer);
                    average = (sum / count).toFixed(1);
                }
            }
        }        
        return average;
    };

    $scope.getCriteriaAverage = function(criteria)
    {
        var average =(0).toFixed(1);
        var count = 0;
        var sum = 0;
        var value = null;
        if($scope.evaluationList){
            var list = [];
            for (var idx = 0; idx < $scope.evaluationList.length; idx++) {
                value = $scope.evaluationList[idx];
                if(value.criteria === criteria){
                    list.push(value);
                }
            }
            for (var idx = 0; idx < list.length; idx++) {
                value = list[idx];
                if(value.answer && value.answer > 0){
                    count ++;
                    sum += parseInt(value.answer);
                    average = (sum / count).toFixed(1);
                }
            }
        }        
        return average;
    };

    $scope.getTotalEvaluatorAverage = function(evaluator)
    {
        var average =(0).toFixed(1);
        var count = 0;
        var sum = 0;
        var value = null;
        if($scope.evaluationList){
            var list = [];
            for (var idx = 0; idx < $scope.evaluationList.length; idx++) {
                value = $scope.evaluationList[idx];
                if(value.evaluator === evaluator){
                    list.push(value);
                }
            }
            for (var idx = 0; idx < list.length; idx++) {
                value = list[idx];
                if(value.answer && value.answer > 0){
                    count ++;
                    sum += parseInt(value.answer);
                    average = (sum / count).toFixed(1);
                }
            }
        }        
        return average;
    };

    $scope.getTotalSelfAverage = function()
    {
        var average =(0).toFixed(1);
        var count = 0;
        var sum = 0;
        var value = null;
        if($scope.selfEvaluationList){
            for (var idx = 0; idx < $scope.selfEvaluationList.length; idx++) {
                value = $scope.selfEvaluationList[idx];
                if(value.answer && value.answer > 0){
                    count ++;
                    sum += parseInt(value.answer);
                    average = (sum / count).toFixed(1);
                }
            }
        }        
        return average;
    };

    $scope.getTotalAverage = function()
    {
        var average =(0).toFixed(1);
        var count = 0;
        var sum = 0;
        var value = null;
        if($scope.evaluationList){
            for (var idx = 0; idx < $scope.evaluationList.length; idx++) {
                value = $scope.evaluationList[idx];
                if(value.answer && value.answer > 0){
                    count ++;
                    sum += parseInt(value.answer);
                    average = (sum / count).toFixed(1);
                }
            }
        }        
        return average;
    };

    $scope.getEvaluatorComment = function(evaluator, comment)
    {
        var response = "";
        if($scope.commentEvaluationList){
            var list = [];
            for (var idx = 0; idx < $scope.commentEvaluationList.length; idx++) {
                value = $scope.commentEvaluationList[idx];
                if(value.evaluator === evaluator && value.id === comment){
                    response = value.response;
                }
            }            
        }        
        return response;
    };

    $scope.showDetail = function(ev, evaluator, criteria){
        $scope.questionList = [];
        if($scope.evaluationList){
            for (var idx = 0; idx < $scope.evaluationList.length; idx++) {
                value = $scope.evaluationList[idx];
                if(value.evaluator === evaluator.id && value.criteria === criteria.id){
                    $scope.questionList.push(value);
                }
            }            
            $scope.evaluator = evaluator;
            $scope.criteria = criteria;
            $mdDialog.show({
            locals: { evaluator : evaluator },
            contentElement: '#dialogDetail',
            parent: angular.element(document.body),
            preserveScope: true
            });
        }              
    }

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.printReport = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="libs/jquery/bootstrap/dist/css/bootstrap.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };
});