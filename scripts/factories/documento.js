app.factory("DocumentoFt", function($http)
{
	return{
		getAll : function()
		{		
            return $http({
                url: 'data/Documento/getAll',
                method: 'GET'
            });
		}
	}
});