app.controller('NuevLoteCtrl', function($scope, $modal, $mdDialog, $state, FileUploader, LoteFt) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'scripts/controllers/upload.php'
    });

    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item, options) {
            return this.queue.length < 10;
        }
    });


    $scope.nuevo = {
        'numero': '<<Nuevo>>',
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
            'lote': $scope.nuevo
        });
        LoteFt.create(data).success(function(data)
        {
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Se generó el Lote número: ' + data.data)
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
            $scope.nuevo.numero = data.data;
            uploader.uploadAll();
            $state.go("app.lote");
        }).error(function(){
            $mdDialog.show(
                $mdDialog.alert()
                .title($scope.app.name)
                .content('Ocurrió un error al crear el lote.')
                .ariaLabel('Notificación')
                .ok('Aceptar')
            );
        });
    }

    uploader.onAfterAddingFile = function(fileItem) {
        $scope.nuevo.withImage = true;
        $scope.nuevo.tipoImagen = '.' + fileItem.file.name.split('.').pop();
    };

    uploader.onBeforeUploadItem = function(item) {
        item.file.name = $scope.nuevo.numero + $scope.nuevo.tipoImagen;
        item.formData.push({folder: 'planos'});
    };
});