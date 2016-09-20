app.controller('ClienteCtrl', function($scope, $mdDialog, clienteFactory) {
  $scope.loadData = function(){
    clienteFactory.getAll().success(function(data)
    {
      $scope.clientes = data;
    });
  }
});