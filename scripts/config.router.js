'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
  .run(
    [           '$rootScope', '$state', '$stateParams',
      function ( $rootScope,   $state,   $stateParams ) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
      function ( $stateProvider,   $urlRouterProvider,  MODULE_CONFIG ) {
            var layout = 'views/layout.html';
            var aside  = 'views/aside.html';
            var content= 'views/content.html';

        $urlRouterProvider
          .otherwise('/app/home');
        $stateProvider
          .state('app', {
            abstract: true,
            url: '/app',
            views: {
              '': {
                templateUrl: layout
              },
              'aside': {
                templateUrl: aside
              },
              'content': {
                templateUrl: content
              }
            }
          })
            .state('app.dashboard', {
              url: '/home',
              templateUrl: 'views/pages/dashboard.html',
              data : { title: 'Evaluaciones'},
              resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/evaluation.js',
                      'scripts/controllers/dashboard.js'
                      ]
                    });
                  }
                }
            })
            .state('app.evaluation', {
              url: '/e',
              templateUrl: 'views/evaluation/list.html',
              data : { title: 'Listado de evaluaciones'},
              resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/evaluation.js',
                      'scripts/controllers/evaluation.js'
                      ]
                    });
                  }
              }
            })
            .state('app.create', {
              url: '/e/new',
              templateUrl: 'views/evaluation/create.html',
              data : { title: 'Evaluación' },
              resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/evaluation.js',
                      'scripts/factories/evaluation-type.js',
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/factories/question-template.js',
                      'scripts/factories/comment-template.js',
                      'scripts/factories/employee.js',
                      'scripts/controllers/evaluation/create.js'
                      ]
                    });
                  }
                }
            })
            .state('app.type', {
              url: '/e/type',
              templateUrl: 'views/evaluation/type.html',
              data : { title: 'Tipos de evaluación' },
              resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    files: [
                      'scripts/factories/comment-template.js',
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/factories/evaluation-type.js',
                      'scripts/factories/question-template.js',
                      'scripts/factories/response-type.js',                      
                      'scripts/controllers/evaluation/type.js'
                      ]
                    });
                  }
                }
            })
            .state('app.type.list', {
              url: '/{id:[0-9]{1,4}}',
              templateUrl: 'views/evaluation/type-list.html',
            })
            .state('app.progress', {
                url: '/e/progress/{id:[0-9]{1,4}}',
                templateUrl: 'views/evaluation/progress.html',
                data : { title: 'Evaluaciones'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/employee.js',
                      'scripts/factories/evaluation.js',
                      'scripts/controllers/evaluation/progress.js'
                      ]
                    });
                  }
                }
            })
            .state('app.progress.detail', {
                url: '/{evaluated:[0-9]{1,4}}',
                templateUrl: 'views/evaluation/progress.detail.html',
                data : { title: 'Resumen de la Evaluación'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/controllers/evaluation/progress-detail.js'
                      ]
                    });
                  }
                }
            })
            .state('app.evaluationdetail', {
                url: '/e/detail/{id:[0-9]{1,4}}/{evaluator:[0-9]{1,4}}/{evaluated:[0-9]{1,4}}',
                templateUrl: 'views/evaluation/detail.html',
                data : { title: 'Detalle de evaluación'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/employee.js',
                      'scripts/factories/evaluation.js',
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/controllers/evaluation/detail.js'
                      ]
                    });
                  }
                }
            })
            .state('app.selfevaluationdetail', {
                url: '/e/detail/{id:[0-9]{1,4}}/{evaluated:[0-9]{1,4}}',
                templateUrl: 'views/evaluation/detail-s.html',
                data : { title: 'Detalle de autoevaluación'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/employee.js',
                      'scripts/factories/evaluation.js',
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/controllers/evaluation/detail-s.js'
                      ]
                    });
                  }
                }
            })
            .state('app.evaluationevaluateds', {
                url: '/evaluation/{id:[0-9]{1,4}}',
                templateUrl: 'views/evaluator/evaluation.detail.html',
                data : { title: 'Evaluados'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/employee.js',
                      'scripts/factories/evaluation.js',
                      'scripts/controllers/evaluation.js'
                      ]
                    });
                  }
                }
            })
            .state('app.evaluate', {
                url: '/e/evaluate/{id:[0-9]{1,4}}/{evaluated:[0-9]{1,4}}',
                templateUrl: 'views/evaluator/evaluate.html',
                data : { title: 'Evaluación'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/employee.js',
                      'scripts/factories/evaluation.js',
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/controllers/evaluator/evaluate.js'
                      ]
                    });
                  }
                }
            })
            .state('app.selfEvaluation', {
                url: '/ev/evaluate/{id:[0-9]{1,4}}',
                templateUrl: 'views/evaluated/self-evaluation.html',
                data : { title: 'Autoevaluación'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/employee.js',
                      'scripts/factories/evaluation.js',
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/controllers/evaluated/self-evaluation.js'
                      ]
                    });
                  }
                }
            })
            .state('app.evevaluator', {
                url: '/ev/{id:[0-9]{1,4}}',
                templateUrl: 'views/evaluated/evaluators.html',
                data : { title: 'Evaluaciones'},
                resolve: {
                auth : function(authFactory)
                {
                    return authFactory.proccessNoAuth();
                },
                load: function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                    name: "app",
                    files: [
                      'scripts/factories/employee.js',
                      'scripts/factories/evaluation.js',
                      'scripts/factories/evaluation-criteria.js',
                      'scripts/controllers/evaluated/evaluators.js',
                      'scripts/controllers/evaluated/evaluation-detail.js'
                      ]
                    });
                  }
                }
            })
            .state('app.evevaluator.detail', {
                url: '/{evaluator:[0-9]{1,4}}',
                templateUrl: 'views/evaluated/detail.html',
                data : { title: 'Detalle de evaluación'},
            })
          .state('page', {
            url: '/page',
            views: {
              '': {
                templateUrl: layout
              },
              'aside': {
                templateUrl: aside
              },
              'content': {
                templateUrl: content
              }
            }
          })
          .state('404', {
            url: '/404',
            templateUrl: 'views/pages/404.html'
          })
          .state('505', {
            url: '/505',
            templateUrl: 'views/pages/505.html'
          })
          .state('access', {
            url: '/access',
            template: '<div class="grey-900 bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
          })
          .state('access.signin', {
            url: '/signin',
            templateUrl: 'views/pages/signin.html',
            controller: 'loginCtrl',
            resolve: {
              auth : function(authFactory)
              {
                  return authFactory.proccessAuth();
              },
              load: function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name: "app",
                  files: [
                    'scripts/factories/usuario.js',
                    'scripts/controllers/usuario/login.js'
                    ]
                  });
                }
              }
          });
      }
    ]
  );
