app.controller('LoteCtrl', function($scope, $mdDialog, LoteFt) {
  LoteFt.getAll().success(function(data)
  {
    $scope.lotes = data;
  });
});