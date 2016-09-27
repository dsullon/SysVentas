app.controller('ClienteCtrl', function($scope, $mdDialog, clienteFt) {
  $scope.loadData = function(){
    clienteFt.getAll().success(function(data)
    {
      $scope.clientes = data;
    });
  }
});