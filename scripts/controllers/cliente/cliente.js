app.controller('ClienteCtrl', function($scope, $mdDialog, clienteFt){
  clienteFt.getAll().success(function(data)
  {
    $scope.clientes = data;
  });
});