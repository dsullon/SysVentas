app.factory("sesionesControl", function(){
    return {
        get : function(key) 
        {
            return sessionStorage.getItem(key)
        },
        set : function(key, val) 
        {
            return sessionStorage.setItem(key, val)
        },
        unset : function(key) 
        {
            return sessionStorage.removeItem(key)
        },
        clear : function(key)
        {
            return sessionStorage.clear()
        }
    }
});

app.factory("authFactory", function($http, $location, $mdDialog, sesionesControl)
{
	return{
        isLoggedIn : function()
        {
            return sesionesControl.get("userLoggued");
        },
        proccessAuth : function()
        {
        	if(this.isLoggedIn())
        	{
        		$location.path("/index");
        	}
        },
        proccessNoAuth : function()
        {
            if(!this.isLoggedIn())
            {
                $location.path("/access/signin");
            }
        }
    }
});
