app.controller('NuevaProformaCtrl', function($scope, $modal, $mdDialog, $state, ProformaFt, ClienteFt, LoteFt) {
    $scope.nuevo = {
        'numero': '<<Nuevo>>',
        'descripcion': '',
        'descripcion2': '',
        'empleado': $scope.userLoggued.id
    }

    ClienteFt.getAll().success(function(data)
    {
        $scope.clientes = data;
    });

    LoteFt.getAll().success(function(data)
    {
        $scope.lotes = data;
    });

    $scope.buscarCliente = function(){
        var modalInstance = $modal.open({
        templateUrl: 'views/templates/cliente-modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
            items: function () {
            return $scope.clientes;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
          $scope.cliente = {
              'id': selectedItem.id,
              'nombre': (selectedItem.apellidos + ', ' + selectedItem.nombres).toUpperCase()
          };
          $scope.nuevo.cliente = $scope.cliente.id;
        });
    }

    $scope.buscarLote = function(){
        var modalInstance = $modal.open({
        templateUrl: 'views/templates/lote-modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
            items: function () {
            return $scope.lotes;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
          $scope.lote = selectedItem;
          $scope.nuevo.lote = $scope.lote.id;
          $scope.nuevo.precio = $scope.lote.precioTotal;
          $scope.nuevo.precioMt2 = $scope.lote.precioM2;
        });
    }

    $scope.save = function() {
        var data = $.param({
            'proforma': $scope.nuevo
        });
        ProformaFt.create(data).success(function(data)
        {
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Se generó la proforma número: ' + data.data)
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
            $state.go("app.proforma");
        }).error(function(){
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Ocurrió un error al crear el cliente.')
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
        });
    }
});