app.factory("PagoFt", function($http, $location)
{
	return{
		get : function(id)
		{		
            return $http({
                url: 'data/Pago/get' + '/'+ id,
                method: 'GET'
            });
		},
        getAll : function(type)
		{		
            return $http({
                url: 'data/Pago/getAll',
                method: 'GET'
            });
		},
        update : function(data)
		{
            return $http({
                url: 'data/Pago/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/Pago/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/Pago/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});