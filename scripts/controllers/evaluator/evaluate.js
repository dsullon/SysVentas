app.controller('EvaluationEvaluateCtrl', function($scope, $http, $stateParams, $mdDialog, $timeout, sesionesControl, 
employeeFactory, evaluationCriteriaFactory, evaluationFactory) {
  $scope.currentDate = new Date();
  $scope.evaluatedId = $stateParams.evaluated; 
  $scope.evaluator = $.parseJSON(sesionesControl.get("userLoggued"));
  $scope.type="warning";
  $scope.tabs = [
    { title:'COMPETENCIAS', active: true },
    { title:'COMENTARIOS', active: false },
    { title:'RESUMEN', active: false }
  ];

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

      evaluationFactory.getQuestions($scope.evaluation.id, $scope.evaluator.id, $scope.evaluatedId).success(function(data)
      {
        $scope.questionList = data;
        $scope.totalQuestion = $scope.questionList.length;
        $scope.calculateTotalProgress();
        $scope.calculateAverage();
      });
      $scope.options =evaluationFactory.getOptions();
      evaluationFactory.getCommentsToEvaluation($scope.evaluation.id, $scope.evaluator.id, $scope.evaluatedId, 0).success(function(data)
      {
        $scope.commentList = data;
      });
    }
  },1000);

  $scope.next = function() {
    if($scope.currentIndex < $scope.criteria.length - 1){
      $scope.currentIndex++
    }else{
      $scope.selectTab(1);
    };
  };

  $scope.prev = function() {
    if($scope.currentIndex > 0){
      $scope.currentIndex--
    }
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
  
  $scope.evaluate = function(question) {
    var data = $.param({
      "evaluation" : question.evaluation_id,
      "evaluator" : question.evaluator_id,
      "evaluated" : question.evaluated_id,
      "question_id" : question.question_id,
      "answer" : question.answer
    });
    evaluationFactory.evaluate(data).success(function(data)
    {
      $scope.calculateAverage();
      $scope.calculateTotalProgress();
    }).error(function(error){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Datos grabados!')
        .content('Error al aplicar la evaluación.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
        );
    });
  };

  $scope.updateComment = function(comment) {
    var data = $.param({
      "evaluation" : comment.evaluation_id,
      "evaluator" : comment.evaluator_id,
      "evaluated" : comment.evaluated_id,
      "comment" : comment.comment_id,
      "response" : comment.response
    });
    evaluationFactory.updateComment(data).success(function(data)
    {
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

  $scope.printReport = function(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="libs/jquery/bootstrap/dist/css/bootstrap.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  };

  $scope.showInstructions = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/templates/instructions.tpl.html',
      targetEvent: ev,
    });
  };

  $scope.selectTab = function(tab) {
    for (var idx = 0; idx < $scope.tabs.length; idx++) {
      $scope.tabs[idx].active = false;
    }
    $scope.tabs[tab].active = true;
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