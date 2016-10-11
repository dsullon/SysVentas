app.controller('NuevaFacturaCtrl', function($scope, $modal, $mdDialog, $state, $stateParams, FacturaFt, ProformaFt) {
    $scope.nuevo = {
        'numero': '<<Nuevo>>',
        'empleado': $scope.userLoggued.id,
        'cuotas': 12,
        'tieneDescuento': false,
        'descuento': 0,
        'porcentajeIGV': 18,
        'igv': 0,
        'total': 0,
        'interesAnual': 0.9,
        'cuotaMensual': 0
    }

    ProformaFt.get($stateParams.id).success(function(data)
    {
        $scope.proforma = data;
        $scope.nuevo.cliente = $scope.proforma.idCliente;
        $scope.nuevo.proforma = $scope.proforma.id;
        $scope.nuevo.lote = $scope.proforma.idLote;
        $scope.nuevo.precio = $scope.proforma.precioTotal;
        $scope.nuevo.precioMt2 = $scope.proforma.precioM2;
        $scope.nuevo.descripcion = $scope.proforma.descripcion;

        $scope.calcularTotal();
    });

    $scope.save = function() {
        var data = $.param({
            'factura': $scope.nuevo
        });
        FacturaFt.create(data).success(function(data)
        {
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Se generó la facturas número: ' + data.data)
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
            $state.go("app.factura");
        }).error(function(){
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Ocurrió un error al crear la factura.')
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
        });
    }

    $scope.calcularTotal = function(){
        $scope.nuevo.cuotaMensual = 0;
        $scope.nuevo.porcentajeDCTO = 0;   
        $scope.nuevo.subTotal = $scope.nuevo.precio;
        $scope.nuevo.descuento = (0).toFixed(2);
        if($scope.nuevo.tieneDescuento){
            $scope.nuevo.porcentajeDCTO = 10;
        }
        var dcto = ($scope.nuevo.precio *  ($scope.nuevo.porcentajeDCTO / 100)).toFixed(2);
        $scope.nuevo.descuento = dcto;
        $scope.nuevo.subTotal = ($scope.nuevo.precio - dcto).toFixed(2);
        $scope.nuevo.igv = $scope.nuevo.subTotal * ($scope.nuevo.porcentajeIGV / 100);
        $scope.nuevo.total = (parseFloat($scope.nuevo.subTotal) + parseFloat($scope.nuevo.igv)).toFixed(2);
        $scope.nuevo.inicial = parseFloat(($scope.nuevo.total *  (10 / 100)).toFixed(2));
    }

    $scope.calcularCuota = function(){
        var interes = $scope.nuevo.interesAnual / 12;
        var pendiente = (parseFloat($scope.nuevo.total) - parseFloat($scope.nuevo.inicial)).toFixed(2);
        $scope.nuevo.montoInteres = (pendiente * (interes / 100) * $scope.nuevo.cuotas).toFixed(2);
        $scope.nuevo.montoPendiente = (parseFloat(pendiente) + parseFloat($scope.nuevo.montoInteres)).toFixed(2);
        $scope.nuevo.cuotaMensual = ($scope.nuevo.montoPendiente / $scope.nuevo.cuotas).toFixed(2);
    }
});