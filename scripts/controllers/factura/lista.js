app.controller('FacturaCtrl', function($scope, $modal, $mdDialog, FacturaFt, ProformaFt){
  FacturaFt.getAll().success(function(data)
  {
    $scope.facturas = data;
  });
  ProformaFt.getNotBilling().success(function(data)
  {
    $scope.proformas = data;
  });

  $scope.buscarProforma = function(){
      var modalInstance = $modal.open({
      templateUrl: 'views/templates/proforma-modal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
          items: function () {
          return $scope.proformas;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      console.log(selectedItem);
      $scope.cliente = {
        'id': selectedItem.id,
        'nombre': (selectedItem.apellidos + ', ' + selectedItem.nombres).toUpperCase()
      };
      $scope.nuevo.cliente = $scope.cliente.id;
      });
  }
});