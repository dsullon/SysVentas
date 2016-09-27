app.controller('NuevoClienteCtrl', function($scope, $modal, $mdDialog, $state, clienteFt, ZonaFt, UbigeoFt, DocumentoFt) {
    $scope.nuevo = {
        'codigo': '',
        'apellidos': '',
        'nombres': '',
        'direccion': '',
        'telefono1': '',
        'telefono2': '',
        'celular1': '',
        'celular2': '',
        'email1': '',
        'email2': '',
        'documento': '2',
        'numeroDocumento':'',
        'zona': '1'
    }

    ZonaFt.getAll().success(function(data)
    {
        $scope.listaZonas = data;
    });

    UbigeoFt.getAll().success(function(data)
    {
        $scope.listaUbigeos = data;
    });

    DocumentoFt.getAll().success(function(data)
    {
        $scope.listaDocumentos = data;
    });

    $scope.buscarUbigeo = function(){
        var modalInstance = $modal.open({
        templateUrl: 'views/templates/ubigeo-modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
            items: function () {
            return $scope.listaUbigeos;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
          $scope.nuevo.ubigeo = selectedItem.id;
        });
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
            .title('Evaluación')
            .content('Ocurrió un error al crear el cliente.')
            .ariaLabel('Notificación')
            .ok('Aceptar')
            .targetEvent(ev)
            );
        });
    }
});