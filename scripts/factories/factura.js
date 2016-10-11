app.factory("FacturaFt", function($http, $location)
{
	return{
		get : function(id)
		{		
            return $http({
                url: 'data/Factura/getById' + '/'+ id,
                method: 'GET'
            });
		},
        getAll : function(type)
		{		
            return $http({
                url: 'data/Factura/getAll',
                method: 'GET'
            });
		},
        update : function(data)
		{
            return $http({
                url: 'data/Factura/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/Factura/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/Factura/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});