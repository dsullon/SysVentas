app.factory("clienteFactory", function($http, $location)
{
	return{
		get : function(id)
		{		
            return $http({
                url: 'data/Cliente/get' + '/'+ id,
                method: 'GET'
            });
		},
        getAll : function(type)
		{		
            return $http({
                url: 'data/Cliente/getAll',
                method: 'GET'
            });
		},
        update : function(data)
		{
            return $http({
                url: 'data/Cliente/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/Cliente/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/Cliente/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});