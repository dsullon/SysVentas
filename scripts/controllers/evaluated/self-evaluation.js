app.controller('SelfEvaluationCtrl', function($scope, $http, $stateParams, $mdDialog, $timeout, sesionesControl, 
employeeFactory, evaluationCriteriaFactory, evaluationFactory) {
  $scope.evaluated = $.parseJSON(sesionesControl.get("userLoggued"));
  $scope.type="warning";
  $scope.tabs = [
    { title:'COMPETENCIAS', active: true },
    { title:'RESUMEN', active: false }
  ];

  evaluationFactory.getOneEvaluation($stateParams.id).success(function(data)
  {
    $scope.evaluation = data;
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
        $scope.calculateTotalProgress();
        $scope.calculateAverage();
      });
      $scope.options =evaluationFactory.getOptions();
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

  $scope.calculateTotalProgress = function(ev){
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
        $mdDialog.show(
          $mdDialog.alert()
          .title('Felicidades!')
          .content('Ha completado con éxito el 100% de su auto-evaluación.')
          .ariaLabel('Notificación')
          .ok('Aceptar')
          .targetEvent(ev)
        );
      }
    }
  }
  
  $scope.evaluate = function(question) {
    var data = $.param({
      "evaluation" : question.evaluation_id,
      "evaluated" : question.evaluated_id,
      "question_id" : question.question_id,
      "answer" : question.answer
    });
    evaluationFactory.selfassess(data).success(function(data)
    {
      $scope.calculateAverage();
      $scope.calculateTotalProgress();
    }).error(function(error){
      alert('Error al aplicar la evaluación');
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