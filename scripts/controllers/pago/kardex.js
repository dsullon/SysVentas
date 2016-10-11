app.controller('KardexCtrl', function($scope, $modal, $mdDialog, $state, $stateParams, PagoFt) {
    
    PagoFt.get($stateParams.id).success(function(data)
    {
        $scope.pago = data;
        PagoFt.getDetail($stateParams.id).success(function(data)
        {
            $scope.detalle = data;
            $scope.calcularPendiente();
        });
    });

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