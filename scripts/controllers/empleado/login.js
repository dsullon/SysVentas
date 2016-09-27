app.controller("loginCtrl", function($scope,$location, employeeFactory)
{
	$scope.actionAuth = function(user)
	{
		employeeFactory.login(user);
	}
});