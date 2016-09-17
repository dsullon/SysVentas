app.factory("evaluationTypeFactory", function($http,$location,sesionesControl)
{
	return{
		getAll : function()
		{		
            return $http({
                url: 'data/EvaluationType/getAll',
                method: 'GET'
            });
		},
        getById : function(id)
		{		
            return $http({
                url: 'data/EvaluationType/getById/' + id,
                method: 'GET'
            });
		},
		create : function(data)
		{
            return $http({
                url: 'data/EvaluationType/create',
                method: 'POST',
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
		updateStatus : function(data)
		{
            return $http({
                url: 'data/EvaluationType/updateStatus',
                method: 'POST',
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});