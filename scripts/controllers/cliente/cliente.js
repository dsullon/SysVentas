app.controller('ClienteCtrl', function($scope, $mdDialog, ClienteFt){
  ClienteFt.getAll().success(function(data)
  {
    $scope.clientes = data;
  });
});