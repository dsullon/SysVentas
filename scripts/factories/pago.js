app.factory("PagoFt", function($http, $location)
{
	return{
		get : function(id)
		{		
            return $http({
                url: 'data/Pago/getById/' + id,
                method: 'GET'
            });
		},
        getAll : function()
		{		
            return $http({
                url: 'data/Pago/getAll',
                method: 'GET'
            });
		},
        getDetail : function(id)
		{		
            return $http({
                url: 'data/Pago/getDetail/' + id,
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