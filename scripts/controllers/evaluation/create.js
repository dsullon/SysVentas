app.controller('EvaluationCreateCtrl', function($scope, $http, $mdDialog, $state, evaluationFactory, 
evaluationTypeFactory, employeeFactory, evaluationCriteriaFactory, questionTemplateFactory, 
commentTemplateFactory) {
  $scope.type = 0;
  $scope.note = '';
  $scope.evalType = "0";
  $scope.evalType1 = "0";
  $scope.startDate = new Date();
  $scope.endDate = new Date();
  $scope.minDate = new Date();

  $scope.$watch(
    "startDate",
    function changeDate( newValue, oldValue ) {
      $scope.endDate = newValue;
      $scope.minEndDate = newValue;
    }
  );

  $scope.evaluators=[];
  $scope.evaluatorSelected;

  evaluationTypeFactory.getAll().success(function(data)
  {
    $scope.types = data;
  });

  employeeFactory.getAll().success(function(data)
  {
    $scope.employeeList = data;
  });

  $scope.onChange = function(){
    if($scope.type){
      $scope.criterias = null;
      $scope.questionList = null;
      $scope.commentList = null;
      evaluationCriteriaFactory.getByType($scope.type).success(function(data)
      {
        $scope.criterias = data;
      });

      questionTemplateFactory.getByType($scope.type).success(function(data)
      {
        $scope.questionList = data;
      });

      commentTemplateFactory.getByType($scope.type).success(function(data)
      {
        $scope.commentList = data;
      });
    }
  }

  $scope.removeQuestion = function(question){
    var index = $scope.questionList.indexOf(question);
    $scope.questionList.splice(index, 1);
  }

  $scope.removeComment = function(question){
    var index = $scope.commentList.indexOf(question);
    $scope.commentList.splice(index, 1);
  }

  $scope.save = function(ev) {
    var process = true;
    if($scope.evaluators.length==0){
      process = false;
    }else{
      angular.forEach($scope.evaluators, function(value, key) {
        if(value.evaluateds.length==0)
        {
          process = false;
          return;
        }
      });
    }
    if(process){
      var data = $.param({
        "type": $scope.type,
        "startDate": convertDate($scope.startDate),
        "endDate": convertDate($scope.endDate),
        "evaluators": $scope.evaluators,
        "note": $scope.note,
        "questions": $scope.questionList,
        "comments": $scope.commentList
      });
      evaluationFactory.save(data).success(function(data)
      {
        $mdDialog.show(
          $mdDialog.alert()
          .title('Evaluación')
          .content('Evaluación creada.')
          .ariaLabel('Notificación')
          .ok('Aceptar')
          .targetEvent(ev)
        );
        $state.go("app.evaluation");
      }).error(function(){
        $mdDialog.show(
          $mdDialog.alert()
          .title('Evaluación')
          .content('Ocurrió un error al crear la evaluación.')
          .ariaLabel('Notificación')
          .ok('Aceptar')
          .targetEvent(ev)
        );
      });
    }
    else{
      $mdDialog.show(
        $mdDialog.alert()
        .title('Evaluación')
        .content('Algunos evaluadores no tienen asignación.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
        .targetEvent(ev)
      );
    }
  };

  /*====== DIALOG====== */

  $scope.addEvaluator = function(user){
    $scope.evaluators.push(user);
    var idx = $scope.evaluators.indexOf(user);
    $scope.evaluators[idx].evaluateds=[];
    getEvaluators();
  };

  /* AGREGAR EVALUADOS POR EVALUADORES */

  $scope.addEvaluated = function(user){
    var idx = $scope.evaluators.indexOf($scope.evaluatorSelected);
    $scope.evaluators[idx].evaluateds.push(user);
    getEvaluateds();
  };

  $scope.removeEvaluator = function(user) { 
    var index = $scope.evaluators.indexOf(user);
    $scope.evaluators.splice(index, 1);
  };

  $scope.removeEvaluated = function(user) { 
    var index = $scope.evaluatorSelected.evaluateds.indexOf(user);
    $scope.evaluatorSelected.evaluateds.splice(index, 1);
    $scope.availableEvaluateds.push(user);   
  };

  $scope.showEvaluatorList = function(ev) {
    $scope.availableEvaluators = null;
    employeeFactory.getAll().success(function(data)
    {
      $scope.availableEvaluators = data;
      getEvaluators();
    });
    $mdDialog.show({
      openFrom: {top: -50, width: 30, height: 80},
      closeTo: {left: 500},
      contentElement: '#dialogEvaluator',
      parent: angular.element(document.body),
      targetEvent: ev,
    });
  };
  
  $scope.showEvaluatedList = (ev, evaluator) => {
    $scope.evaluatorSelected = evaluator;
    $scope.availableEvaluateds = null;
    employeeFactory.getAll().success(function(data)
    {
      $scope.availableEvaluateds = data;
      getEvaluateds();
    });
    $mdDialog.show({
      locals: { evaluator : evaluator },
      controller: ['$scope', 'evaluator', function($scope, evaluator) {
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }],
      contentElement: '#dialogExaminated',
      parent: angular.element(document.body),
      targetEvent: ev,
      preserveScope: true
    });
  };
  
  function EvaluatorDialogController($scope, $mdDialog) {
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

  /*====== END DIALOG ====== */
  function getEvaluators(){
    for (var i = 0, len = $scope.evaluators.length; i < len; i++) {
      for (var j = 0, lenB = $scope.availableEvaluators.length; j < lenB; j++) {
        if ($scope.evaluators[i].acronym === $scope.availableEvaluators[j].acronym) {
          $scope.availableEvaluators.splice(j, 1); 
          break;
        }
      }
    };
  }

  function getEvaluateds(){
    for (var i = 0, len = $scope.evaluatorSelected.evaluateds.length; i < len; i++) {
      for (var j = 0, lenB = $scope.availableEvaluateds.length; j < lenB; j++) {
        if ($scope.evaluatorSelected.evaluateds[i].acronym === $scope.availableEvaluateds[j].acronym) {
          $scope.availableEvaluateds.splice(j, 1); 
          break;
        }
      }
    }
    for (var i = 0, lenB = $scope.availableEvaluateds.length; i < lenB; i++) {
      if ($scope.evaluatorSelected.acronym === $scope.availableEvaluateds[i].acronym) {
        $scope.availableEvaluateds.splice(i, 1); 
        break;
      }
    }
  }

  function convertDate(date) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date);
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
  }

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };   

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  };
});