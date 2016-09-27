app.controller('LoteCtrl', function($scope, $mdDialog, LoteFt) {
  $scope.loadData = function(){
    LoteFt.getAll().success(function(data)
    {
      $scope.clientes = data;
    });
  }
});