app.controller('EvaluationCtrl', function($scope, $mdDialog, evaluationFactory) {
  $scope.loadData = function(){
    evaluationFactory.getAll().success(function(data)
    {
      $scope.evaluationList = data;
    });
  }
  
  $scope.closeEvaluation = function(evaluation){
    $scope.CloseConfirm();
  }

  $scope.showToEvaluate = function(evaluation, ev){
    var data = $.param({
      "evaluation": evaluation
    });
    var confirm = $mdDialog.confirm()
    .title('Evaluación')
    .content('Los resultados de la evaluación estarán visibles para los usuarios, ¿Está seguro(a) de continuar?')
    .ariaLabel('Mostrar resultados de evaluación')
    .ok('Aceptar')
    .cancel('Cancelar')
    .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      evaluationFactory.showToEvaluated(data).success(function(data)
      {
        $scope.showAlert();
      });
    });   
  }

  $scope.deleteEvaluation = function(evaluation, ev){
    var data = $.param({
      "evaluation": evaluation
    });
    var confirm = $mdDialog.confirm()
    .title('Evaluación')
    .content('¿Está seguro(a) de eliminar la evaluación?')
    .ariaLabel('Eliminar evaluación')
    .ok('Aceptar')
    .cancel('Cancelar')
    .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      evaluationFactory.delete(data).success(function(data)
      {
        $scope.loadData();
        $mdDialog.show(
          $mdDialog.alert()
          .title('Evaluación')
          .content('Registro eliminado.')
          .ariaLabel('Notificación')
          .ok('Aceptar')
          .targetEvent(ev)
        );
      });
    });   
  }



  $scope.showAlert = function(ev) {
    $mdDialog.show(
      $mdDialog.alert()
      .title('Evaluación')
      .content('El resultado de la evaluación se encuentra disponible para los evaluados.')
      .ariaLabel('Notificación')
      .ok('Aceptar')
      .targetEvent(ev)
    );
  };

  

  $scope.CloseConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
    .title('Evaluación')
    .content('¿Está seguro(a) de cerrar la evaluación?')
    .ariaLabel('Cerrar evaluación')
    .ok('Aceptar')
    .cancel('Cancelar')
    .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      $scope.alert = 'You decided to get rid of your debt.';
    }, function() {
      $scope.alert = 'You decided to keep your debt.';
    });
  };
});

app.controller('EvaluationDetailCtrl', function($scope, $stateParams, sesionesControl, employeeFactory, 
evaluationFactory, $http, $timeout) {
  $scope.evaluationId = $stateParams.id; 
  $scope.user = $.parseJSON(sesionesControl.get("userLoggued"));
  $scope.evaluatedList = [];

  employeeFactory.getToEvaluate($scope.evaluationId, $scope.user.id).success(function(data)
  {
    var employeeList = data;
    angular.forEach(employeeList, function(value, key){
      $scope.getProgress(value);
      $scope.evaluatedList.push(value);
    });
  });

  $scope.getProgress = function(evaluated){
    evaluated.progress = 0;
    evaluationFactory.getQuestions($scope.evaluationId, $scope.user.id, evaluated.id).success(function(data)
    {
      var questionList = data;
      var totalQuestion = questionList.length;
      evaluated.progressType = "danger";
      var count = 0;
      angular.forEach(questionList, function(value, key){
        if(value.answer){
          count ++;
        }       
      });
      if(totalQuestion >0){
        evaluated.progress = ((count / totalQuestion)*100).toFixed(0);
        if(evaluated.progress < 50){
          evaluated.progressType ="danger"
        }else if(evaluated.progress < 100){
          evaluated.progressType ="warning"
        }else{
          evaluated.progressType ="success"
        }
      }
    });
  }
});