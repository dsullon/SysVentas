app.factory("evaluationFactory", function($http, $location)
{
	return{
		getAll : function()
		{		
            return $http({
                url: 'data/Evaluation/getAll',
                method: 'GET'
            });
		},
		getOneEvaluation : function(id)
		{
            return $http({
                url: 'data/Evaluation/getone/'+id,
                method: 'GET'
            });
        },
        getQuestions: function(evaluation, evaluator, evaluated)
        {
            return $http({
                url: 'data/Evaluation/getquestion/'+ evaluation + '/' + evaluator + '/' + evaluated,
                method: 'GET'
            });
        },
        getQuestionsByEvaluated: function(evaluation, evaluated)
        {
            return $http({
                url: 'data/Evaluation/getQuestionByEvaluated/'+ evaluation + '/' + evaluated,
                method: 'GET'
            });
        },
        getQuestionToSelfEvaluation: function(evaluation, evaluated)
        {
            return $http({
                url: 'data/Evaluation/getQuestionToSelfEvaluation/'+ evaluation + '/' + evaluated,
                method: 'GET'
            });
        },
        getComments: function(evaluation)
        {
            return $http({
                url: 'data/Evaluation/getComments/'+ evaluation,
                method: 'GET'
            });
        },
        getCommentsToEvaluation: function(evaluation, evaluator, evaluated, type)
        {
            return $http({
                url: 'data/Evaluation/getCommentsToEvaluation/'+ evaluation + '/' + evaluator + '/' + evaluated + '/' + type,
                method: 'GET'
            });
        },
        getCommentsByEvaluated: function(evaluation, evaluated)
        {
            return $http({
                url: 'data/Evaluation/getCommentsByEvaluated/'+ evaluation + '/' + evaluated,
                method: 'GET'
            });
        },
        getToEvaluate : function(user)
		{
            return $http({
                url: 'data/Evaluation/gettoevaluate/' + user,
                method: 'GET'
            });
        },
        getByEvaluated : function(user)
		{
            return $http({
                url: 'data/Evaluation/getbyevaluated/' + user,
                method: 'GET'
            });
        },
        getActive : function()
		{
            return $http({
                url: 'data/Evaluation/getActive',
                method: 'GET'
            });
        },
        evaluate : function(data)
		{
            return $http({
                url: 'data/evaluation/evaluate',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        selfassess : function(data)
		{
            return $http({
                url: 'data/evaluation/selfassess',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
		},
        updateComment : function(data){
            return $http({
                url: 'data/Evaluation/updatecomment',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        showToEvaluated : function(data){
            return $http({
                url: 'data/Evaluation/showToEvaluated',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        delete : function(data){
            return $http({
                url: 'data/Evaluation/delete',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        save : function(data){
            return $http({
                url: 'data/Evaluation/save',
                method: "POST",
                data : data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        getOptions : function(){
            return [
                { "scale": "", "value": ""},
                { "scale": "N/A", "value": "0"},
                { "scale": "1", "value": "1"},
                { "scale": "2", "value": "2"},
                { "scale": "3", "value": "3"},
                { "scale": "4", "value": "4"},
                { "scale": "5", "value": "5"},
                { "scale": "6", "value": "6"},
                { "scale": "7", "value": "7"},
                { "scale": "8", "value": "8"},
                { "scale": "9", "value": "9"},
                { "scale": "10", "value": "10"}]
        }
	}
});