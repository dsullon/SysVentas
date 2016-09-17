app.factory("employeeFactory", function($http, $location)
{
	return{
        getAll : function()
		{		
            return $http({
                url: 'data/Employee/getAll',
                method: 'GET'
            });
		},
        getOne: function(id)
        {
            return $http({
                url: 'data/Employee/get/'+ id,
                method: 'GET'
            });
        },
        getToEvaluate: function(evaluationId, evaluatorId)
        {
            return $http({
                url: 'data/Employee/getToEvaluate/'+ evaluationId + '/' + evaluatorId,
                method: 'GET'
            });
        },
        getEvaluatorByEvaluated: function(evaluationId, evaluatedId){
            return $http({
                url: 'data/Employee/getEvaluatorByEvaluated/'+ evaluationId + '/' + evaluatedId,
                method: 'GET'
            });            
        },
        getEvaluatedByEvaluation: function(evaluationId){
            return $http({
                url: 'data/Employee/getEvaluatedByEvaluation/'+ evaluationId,
                method: 'GET'
            });            
        }
	}
});