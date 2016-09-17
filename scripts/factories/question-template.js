app.factory("questionTemplateFactory", function($http, $location)
{
	return{
		getByType : function(type)
		{		
            return $http({
                url: 'data/QuestionTemplate/getByType' + '/'+ type,
                method: 'GET'
            });
		},
        update : function(data)
		{
            return $http({
                url: 'data/QuestionTemplate/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/QuestionTemplate/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/QuestionTemplate/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});