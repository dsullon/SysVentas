app.controller('NuevLoteCtrl', function($scope, $modal, $mdDialog, $state, LoteFt) {
    $scope.nuevo = {
        'medida1': '',
        'medida2': '',
        'medida3': '',
        'medida4': '',
        'medida5': '',
        'area': '',
        'precio': '0.00',
        'precioM2':'0.00',
        'registroPredial': '',
        'registroMunicipal': '',
        'observacion': ''
    }

    $scope.save = function() {
        var data = $.param({
            'cliente': $scope.nuevo
        });
        clienteFt.create(data).success(function(data)
        {
            $state.go("app.cliente");
        }).error(function(){
            $mdDialog.show(
            $mdDialog.alert()
            .title($scope.app.name)
            .content('Ocurrió un error al crear el cliente.')
            .ariaLabel('Notificación')
            .ok('Aceptar')
            .targetEvent(ev)
            );
        });
    }
});