app.factory("ZonaFt", function($http)
{
	return{
		getAll : function()
		{		
            return $http({
                url: 'data/Zona/getAll',
                method: 'GET'
            });
		}
	}
});