app.controller('NuevoPagoCtrl', function($scope, $modal, $mdDialog, $state, $stateParams, PagoFt) {
    $scope.nuevo = {
        'montoPagar': 0
    }

    PagoFt.get($stateParams.id).success(function(data)
    {
        $scope.pago = data;
        $scope.nuevo.pago = $scope.pago.id;
        PagoFt.getDetail($stateParams.id).success(function(data)
        {
            $scope.detalle = data;
            $scope.calcularPendiente();
        });
    });

    $scope.save = function() {
        var data = $.param({
            'pago': $scope.nuevo
        });
        PagoFt.create(data).success(function(data)
        {
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Se generó el pago')
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
            $state.go("app.pago");
        }).error(function(){
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Ocurrió un error al crear el pago.')
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
        });
    };

    $scope.calcularPendiente = function(){
        $scope.pendiente = (0).toFixed(2);
        var cargo = 0;
        var abono = 0;
        var detalle = null;
        for (var idx = 0; idx < $scope.detalle.length; idx++) {
            detalle = $scope.detalle[idx];
            if(detalle.tipo === '0'){
                cargo += parseFloat(detalle.monto);
            }else{
                abono += parseFloat(detalle.monto);
            }
        }
        $scope.pendiente = (cargo - abono).toFixed(2);
    }
});