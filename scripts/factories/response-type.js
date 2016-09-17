app.factory("responseTypeFactory", function($http,$location,sesionesControl)
{
	return{
		getAll : function()
		{		
            return $http({
                url: 'data/ResponseType/getAll',
                method: 'GET'
            });
		}
	}
});