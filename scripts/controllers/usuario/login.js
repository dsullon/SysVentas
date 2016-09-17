app.controller("loginCtrl", function($scope,$location, userFactory)
{
	$scope.actionAuth = function(user)
	{
		userFactory.login(user);
	}
});