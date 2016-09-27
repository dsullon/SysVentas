app.factory("LoteFt", function($http, $location)
{
	return{
		get : function(id)
		{		
            return $http({
                url: 'data/Lote/get' + '/'+ id,
                method: 'GET'
            });
		},
        getAll : function(type)
		{		
            return $http({
                url: 'data/Lote/getAll',
                method: 'GET'
            });
		},
        update : function(data)
		{
            return $http({
                url: 'data/Lote/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/Lote/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/Lote/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});