'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
angular.module('app')
.run(['$rootScope', '$state', '$stateParams',function ($rootScope, $state, $stateParams){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}])
.config(['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',function ( $stateProvider, $urlRouterProvider, MODULE_CONFIG){
  var layout = 'views/layout.html';
  var aside  = 'views/aside.html';
  var content= 'views/content.html';
  $urlRouterProvider.otherwise('/app/home');
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
  .state('app.cliente', {
    url: '/cliente',
    templateUrl: 'views/cliente/lista.html',
    data : { title: 'Listado de clientes'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/cliente.js',
            'scripts/controllers/cliente/cliente.js'
            ]
          });
        }
    }
  })
  .state('app.crearCliente', {
    url: '/cliente/nuevo',
    templateUrl: 'views/cliente/crear.html',
    data : { title: 'Nuevo cliente'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/cliente.js',
            'scripts/factories/documento.js',
            'scripts/factories/ubigeo.js',
            'scripts/factories/zona.js',
            'scripts/controllers/cliente/nuevo.js'
            ]
          });
        }
    }
  })
  .state('app.lote', {
    url: '/lote',
    templateUrl: 'views/lote/list.html',
    data : { title: 'Listado de Lotes'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/lote.js',
            'scripts/controllers/lote/lote.js'
            ]
          });
        }
    }
  })
  .state('app.crearLote', {
    url: '/lote/nuevo',
    templateUrl: 'views/lote/crear.html',
    data : { title: 'Nuevo Lote'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/lote.js',
            'scripts/controllers/lote/nuevo.js'
            ]
          });
        }
      }
    })
    .state('app.proforma', {
    url: '/proforma',
    templateUrl: 'views/proforma/lista.html',
    data : { title: 'Listado de Proformas'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/proforma.js',
            'scripts/controllers/proforma/lista.js'
            ]
          });
        }
      }
    })
    .state('app.crearProforma', {
    url: '/proforma/nuevo',
    templateUrl: 'views/proforma/crear.html',
    data : { title: 'Nueva Proforma'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/cliente.js',
            'scripts/factories/lote.js',
            'scripts/factories/proforma.js',
            'scripts/controllers/proforma/nuevo.js'
            ]
          });
        }
      }
    })
    .state('app.factura', {
    url: '/factura',
    templateUrl: 'views/factura/lista.html',
    data : { title: 'Listado de Facturas'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/factura.js',
            'scripts/factories/proforma.js',
            'scripts/controllers/factura/lista.js'
            ]
          });
        }
      }
    })
    .state('app.crearFactura', {
    url: '/factura/nuevo/{id:[0-9]{1,4}}',
    templateUrl: 'views/factura/crear.html',
    data : { title: 'Nueva Factura'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/proforma.js',
            'scripts/factories/factura.js',
            'scripts/controllers/factura/nuevo.js'
            ]
          });
        }
      }
    })
    .state('app.pago', {
    url: '/pago',
    templateUrl: 'views/pago/lista.html',
    data : { title: 'Listado de Pagos'},
    resolve: {
      auth : function(authFactory)
      {
          return authFactory.proccessNoAuth();
      },
      load: function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name: "app",
          files: [
            'scripts/factories/pago.js',
            'scripts/controllers/pago/lista.js'
            ]
          });
        }
      }
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
              'scripts/factories/empleado.js',
              'scripts/controllers/empleado/login.js'
              ]
            });
          }
        }
    });
  }]);
