app.controller('PagoCtrl', function($scope, $modal, $mdDialog, PagoFt){
  PagoFt.getAll().success(function(data)
  {
    $scope.pagos = data;
    console.log(data);
  });
});