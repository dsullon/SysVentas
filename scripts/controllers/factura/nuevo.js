app.controller('NuevaFacturaCtrl', function($scope, $modal, $mdDialog, $state, $stateParams, FacturaFt, ProformaFt) {
    $scope.nuevo = {
        'numero': '<<Nuevo>>',
        'cuotas': 12,
        'domingos': '0',
        'empleado': $scope.userLoggued.id
    }

    ProformaFt.get($stateParams.id).success(function(data)
    {
        $scope.proforma = data;
        console.log(data);
        $scope.nuevo.cliente = $scope.proforma.dCliente
        $scope.nuevo.lote = $scope.idLote;
        $scope.nuevo.precio = $scope.proforma.precioTotal;
        $scope.nuevo.precioMt2 = $scope.proforma.precioM2;
    });

    $scope.save = function() {
        var data = $.param({
            'factura': $scope.nuevo
        });
        ProformaFt.create(data).success(function(data)
        {
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Se generó la facturas número: ' + data.data)
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