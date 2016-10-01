app.factory("ProformaFt", function($http, $location)
{
	return{
		get : function(id)
		{		
            return $http({
                url: 'data/Proforma/getById' + '/'+ id,
                method: 'GET'
            });
		},
        getAll : function(type)
		{		
            return $http({
                url: 'data/Proforma/getAll',
                method: 'GET'
            });
		},
        getNotBilling : function(type)
		{		
            return $http({
                url: 'data/Proforma/getNotBilling',
                method: 'GET'
            });
		},
        update : function(data)
		{
            return $http({
                url: 'data/Proforma/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/Proforma/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/Proforma/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});