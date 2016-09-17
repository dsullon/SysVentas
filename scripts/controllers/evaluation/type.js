app.controller('TypeCtrl', function($scope, $http, $state, evaluationTypeFactory) {
  $scope.newType = null;
  $scope.alert = null;

  evaluationTypeFactory.getAll().success(function(data)
  {
    $scope.types = data;
  });

  $scope.create = function(ev) {
    var data = $.param({
      "name" : $scope.newType
    });
    evaluationTypeFactory.create(data).success(function(data)
    {
      $scope.alert = { type: 'success', msg: 'Registro creado.' };
      $scope.types.push(data.data);
    }).error(function(error){
      $scope.alert = {type: 'danger', msg: 'Error al crear el registro.'};
    });
    $scope.newType = null;
  };

  $scope.closeAlert = function() {
    $scope.alert = null;
  };
});

// QUESTIONS AND COMMENTS
app.controller('TypeListCtrl', function($scope, $stateParams, $mdDialog, evaluationTypeFactory, evaluationCriteriaFactory, questionTemplateFactory, 
commentTemplateFactory, responseTypeFactory) {
  $scope.model = {
      selectedCriteria: '',
      questionEvalType: '',
      commentEvalType: ''
  };

  $scope.showCriterias = false;
  $scope.type = $stateParams.id;
  $scope.newQuestion = null;
  $scope.newComment = {
    "description": '',
    "response": ''
  };

  $scope.newCriteria = {
    "name": '',
    "note": ''
  };

  evaluationTypeFactory.getById($scope.type).success(function(data)
  {
    $scope.evaluationType = data;
  });

  evaluationCriteriaFactory.getByType($scope.type).success(function(data)
  {
    $scope.criterias = data;
    $scope.model.selectedCriteria = $scope.criterias[0];
  });

  questionTemplateFactory.getByType($scope.type).success(function(data)
  {
    $scope.questionList = data;
  });

  commentTemplateFactory.getByType($scope.type).success(function(data)
  {
    $scope.commentList = data;
  });

  responseTypeFactory.getAll().success(function(data)
  {
    $scope.responseTypeList = data;
  });

  $scope.criteriaVisible = function(){
    $scope.showCriterias = !$scope.showCriterias;
  }

  $scope.changeStatus = function(){
    var data = $.param({
      "id": $scope.evaluationType.id,
      "status": $scope.evaluationType.has_boss
    });
    evaluationTypeFactory.updateStatus(data).success(function(data)
    {
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al actualizar el estado.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  }

  $scope.showEditQuestion = function(question){
    $scope.questionSelected = question;
    $mdDialog.show({
      closeTo: {left: 500},
      contentElement: '#editQuestion',
      parent: angular.element(document.body),
    });
  }

  $scope.showEditComment = function(comment){
    $scope.commentSelected = comment;
    $mdDialog.show({
      closeTo: {left: 500},
      contentElement: '#editComment',
      parent: angular.element(document.body),
    });
  }

  $scope.showEditCriteria = function(criteria){
    $scope.criteriaSelected = criteria;
    $mdDialog.show({
      closeTo: {left: 500},
      contentElement: '#editCriteria',
      parent: angular.element(document.body),
    });
  }

  $scope.showNewQuestion = function(){
    $mdDialog.show({
      closeTo: {left: 500},
      contentElement: '#newQuestion',
      parent: angular.element(document.body),
    });
  }

  $scope.showNewComment = function(){
    $mdDialog.show({
      closeTo: {left: 500},
      contentElement: '#newComment',
      parent: angular.element(document.body),
    });
  }

  $scope.showNewCriteria = function(){
    $mdDialog.show({
      closeTo: {left: 500},
      contentElement: '#newCriteria',
      parent: angular.element(document.body),
    });
  }

  $scope.deleteQuestion = function(question){
    var data = $.param({
      "id": question.id
    });
    var confirm = $mdDialog.confirm()
    .title('Plantilla')
    .content('¿Está seguro(a) de eliminar la pregunta?')
    .ariaLabel('Eliminar pregunta')
    .ok('Aceptar')
    .cancel('Cancelar')
    $mdDialog.show(confirm).then(function() {
      questionTemplateFactory.delete(data).success(function(data)
      {
        var index = $scope.questionList.indexOf(question);
        $scope.questionList.splice(index, 1);
      });
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al eliminar la pregunta.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.deleteComment = function(comment){
    var data = $.param({
      "id": comment.id
    });
    var confirm = $mdDialog.confirm()
    .title('Plantilla')
    .content('¿Está seguro(a) de eliminar el comentario?')
    .ariaLabel('Eliminar comentario')
    .ok('Aceptar')
    .cancel('Cancelar')
    $mdDialog.show(confirm).then(function() {
      commentTemplateFactory.delete(data).success(function(data)
      {
        var index = $scope.commentList.indexOf(comment);
        $scope.commentList.splice(index, 1);
      });
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al eliminar el comentario.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.deleteCriteria = function(comment){
    if($scope.criterias.length === 1){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('No se puede eliminar el registro del criterio.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
      return;
    }
    var data = $.param({
      "id": comment.id
    });
    var confirm = $mdDialog.confirm()
    .title('Plantilla')
    .content('¿Está seguro(a) de eliminar el criterio?')
    .ariaLabel('Eliminar comentario')
    .ok('Aceptar')
    .cancel('Cancelar')
    $mdDialog.show(confirm).then(function() {
      evaluationCriteriaFactory.delete(data).success(function(data)
      {
        var index = $scope.criterias.indexOf(comment);
        $scope.criterias.splice(index, 1);
      });
    });
  };

  $scope.updateQuestion = function(){
    var data = $.param({
      "question": $scope.questionSelected
    });
    questionTemplateFactory.update(data).success(function(data)
    {
      $mdDialog.cancel();
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al actualizar la pregunta.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.updateComment = function(){
    var data = $.param({
      "comment": $scope.commentSelected
    });
    commentTemplateFactory.update(data).success(function(data)
    {
      $mdDialog.cancel();
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al actualizar el comentario.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.updateCriteria = function(){
    var data = $.param({
      "criteria": $scope.criteriaSelected
    });
    evaluationCriteriaFactory.update(data).success(function(data)
    {
      $mdDialog.cancel();
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al actualizar el criterio.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.saveQuestion = function(){
    var data = $.param({
      "description": $scope.newQuestion,
      "criteria": $scope.model.selectedCriteria.id,
      "type": $scope.model.questionEvalType
    });
    questionTemplateFactory.create(data).success(function(data)
    {
      $scope.newQuestion = null;
      $scope.questionList.push(data.data);
      $mdDialog.cancel();
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al crear la pregunta.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.saveComment = function(){
    var data = $.param({
      "description": $scope.newComment.description,
      "evaluation": $scope.type,
      "response": $scope.newComment.response,
      "type": $scope.model.commentEvalType
    });
    commentTemplateFactory.create(data).success(function(data)
    {
      $scope.newComment = {
        "description": "",
        "response": 'SELECCIONE'
      };
      $scope.commentList.push(data.data);
      $mdDialog.cancel();
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al crear el comentario.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.saveCriteria = function(){
    var data = $.param({
      "name": $scope.newCriteria.name,
      "type": $scope.type,
      "note": $scope.newCriteria.note
    });
    console.log(data);
    evaluationCriteriaFactory.create(data).success(function(data)
    {
      $scope.newCriteria = {
        "name": '',
        "note": ''
      };
      $scope.criterias.push(data.data);
      $mdDialog.cancel();
    }).error(function(data){
      $mdDialog.show(
        $mdDialog.alert()
        .title('Plantilla')
        .content('Ocurrió un error al crear el criterio.')
        .ariaLabel('Notificación')
        .ok('Aceptar')
      );
    });
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };
});