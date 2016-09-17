app.factory("evaluationCriteriaFactory", function($http,$location,sesionesControl)
{
	return{
		getByType : function(type)
		{
            return $http({
                url: 'data/EvaluationCriteria/getbytype/'+ type,
                method: 'GET'
            });
        },
        update : function(data)
		{
            return $http({
                url: 'data/EvaluationCriteria/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/EvaluationCriteria/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/EvaluationCriteria/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});