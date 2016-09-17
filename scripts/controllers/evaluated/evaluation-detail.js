app.controller('EvaluationDetailCtrl', function($scope, $http, $stateParams, $mdDialog, $timeout, sesionesControl, 
employeeFactory, evaluationCriteriaFactory, evaluationFactory) {
  $scope.evaluationId = $stateParams.evaluator;
  $scope.evaluatorId = $stateParams.evaluator;
  $scope.evaluated = $.parseJSON(sesionesControl.get("userLoggued"));
  $scope.type="warning";

  evaluationFactory.getOneEvaluation($stateParams.id).success(function(data)
  {
    $scope.evaluation = data;
  });

  employeeFactory.getOne($scope.evaluatorId).success(function(data)
  {
    $scope.evaluator = data;
  });

  $timeout(function(){
    if($scope.evaluation != null){
      evaluationCriteriaFactory.getByType($scope.evaluation.evaluation_type_id).success(function(data)
      {
        $scope.criteria = data;
        $scope.currentIndex = 0;
      });

      evaluationFactory.getQuestions($scope.evaluation.id, $scope.evaluatorId, $scope.evaluated.id).success(function(data)
      {
        $scope.questionList = data;
        $scope.totalQuestion = $scope.questionList.length;
        $scope.calculateTotalProgress();
        $scope.calculateAverage();
      });

      evaluationFactory.getCommentsToEvaluation($scope.evaluation.id, $scope.evaluatorId, $scope.evaluated.id, 0).success(function(data)
      {
        $scope.evaluatorCommentList = data;
      });

      evaluationFactory.getCommentsToEvaluation($scope.evaluation.id, $scope.evaluatorId, $scope.evaluated.id, 1).success(function(data)
      {
        $scope.commentList = data;
      });
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

  $scope.calculateTotalProgress = function(){
    $scope.totalProgress = 0;
    $scope.totalProgressType = "danger";
    var count = 0;
    angular.forEach($scope.questionList, function(value, key){
      if(value.answer){
        count ++;
      }       
    });
    if($scope.totalQuestion >0){
      $scope.totalProgress = ((count / $scope.totalQuestion)*100).toFixed(0);
      if($scope.totalProgress < 50){
        $scope.totalProgressType ="danger"
      }else if($scope.totalProgress < 100){
        $scope.totalProgressType ="warning"
      }else{
        $scope.totalProgressType ="success"
      }
    }
  }

  $scope.saveComment = function() {
    var data = $.param({
      "comments": $scope.commentList
    });
    evaluationFactory.updateComment(data).success(function(data)
    {
      alert('Datos grabados.');
    });
  };

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
  
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  };
});