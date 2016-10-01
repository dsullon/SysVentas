app.controller('ProformaCtrl', function($scope, $mdDialog, ProformaFt){
  ProformaFt.getAll().success(function(data)
  {
    $scope.proformas = data;
  });
});