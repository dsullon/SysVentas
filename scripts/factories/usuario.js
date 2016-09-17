app.factory("userFactory", function($http, $location, $mdDialog, sesionesControl)
{
	return{
        login : function(user)
        {
            return $http({
                url: 'data/usuario/login',
                method: "POST",
                data : "usuario="+user.usuario+"&password="+user.password,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data)
            {
                if(data.respuesta == "success")
                {
                    console.log(data.user);
                    sesionesControl.set("userLoggued",JSON.stringify(data.user));                  
                    $location.path("/app/home");
                }
                else
                {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .title('SysVentas')
                        .content('El email o el password introducidos son incorrectos, inténtalo de nuevo.')
                        .ariaLabel('Notificación')
                        .ok('Aceptar')
                    );
                }
            }).error(function(data)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                    .title('SysVentas')
                    .content('Error al consultar, intentélo nuevamente.')
                    .ariaLabel('Notificación')
                    .ok('Aceptar')
                );
            })
        }
    }
});