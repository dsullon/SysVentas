app.factory("UbigeoFt", function($http)
{
	return{
		getAll : function()
		{		
            return $http({
                url: 'data/Ubigeo/getAll',
                method: 'GET'
            });
		}
	}
});