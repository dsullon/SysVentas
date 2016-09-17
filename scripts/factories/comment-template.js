app.factory("commentTemplateFactory", function($http, $location)
{
	return{
		getByType : function(type)
		{		
            return $http({
                url: 'data/CommentTemplate/getByType' + '/'+ type,
                method: 'GET'
            });
		},
        update : function(data)
		{
            return $http({
                url: 'data/CommentTemplate/update',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        create : function(data)
		{
            return $http({
                url: 'data/CommentTemplate/create',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        delete : function(data)
		{
            return $http({
                url: 'data/CommentTemplate/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		}
	}
});