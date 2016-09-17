app.controller('SelfEvaluationCtrl', function($scope, $http, $stateParams, $mdDialog, $timeout, sesionesControl, 
employeeFactory, evaluationCriteriaFactory, evaluationFactory) {
  $scope.evaluated = null;
  $scope.type="warning";

  evaluationFactory.getOneEvaluation($stateParams.id).success(function(data)
  {
    $scope.evaluation = data;
  });

  employeeFactory.getOne($stateParams.evaluated).success(function(data)
  {
    $scope.evaluated = data;
  });

  $timeout(function(){
    if($scope.evaluation != null){
      evaluationCriteriaFactory.getByType($scope.evaluation.evaluation_type_id).success(function(data)
      {
        $scope.criteria = data;
        $scope.currentIndex = 0;
      });

      evaluationFactory.getQuestionToSelfEvaluation($scope.evaluation.id, $scope.evaluated.id).success(function(data)
      {
        $scope.questionList = data;
        $scope.totalQuestion = $scope.questionList.length;
        $scope.calculateAverage();
      });
      $scope.options =evaluationFactory.getOptions();
    }
  },1000);

  $scope.next = function() {
    $scope.currentIndex < $scope.criteria.length - 1 ? $scope.currentIndex++ : $scope.currentIndex = 0;
  };
  $scope.prev = function() {
    $scope.currentIndex > 0 ? $scope.currentIndex-- : $scope.currentIndex = $scope.criteria.length - 1;
  };
  $scope.$watch('currentIndex', function() {
    if($scope.criteria){
      $scope.criteriaSelected = $scope.criteria[$scope.currentIndex];
      $scope.calculateAverage();
    }        
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

  $scope.averagePerCriteria = function(criteria){
    var average =(0).toFixed(1);
    var count = 0;
    var sum = 0;
    angular.forEach($scope.questionList, function(value, key){
      if(value.answer && value.answer > 0){
        if(value.question_criteria == criteria){
          count ++;
          sum += parseInt(value.answer);
          average = (sum / count).toFixed(1);
        }
      }
    });
    return average;
  }

  $scope.questionsAnsweredPerCriteria = function(criteria){
    var count = 0;
    angular.forEach($scope.questionList, function(value, key){
      if(value.answer && value.answer >= 0){
        if(value.question_criteria == criteria){
          count ++;
        }
      }
    });
    return count;
  }

  $scope.questionsUnAnsweredPerCriteria = function(criteria){
    var count = 0;
    angular.forEach($scope.questionList, function(value, key){
      if(!value.answer){
        if(value.question_criteria == criteria){
          count ++;
        }
      }
    });
    return count;
  }

  var indexedQuestions = [];
  
  $scope.questionToFilter = function() {
    indexedQuestions = [];
    return $scope.questionList;
  }
    
  $scope.filterQuestions = function(question) {
    var questionIsNew = indexedQuestions.indexOf(question.criteria_name) == -1;
    if (questionIsNew) {
        indexedQuestions.push(question.criteria_name);
    }
    return questionIsNew;
  }
});