/*global  angular HomepageController RegisterController DashboardController BuyController FindController  DepositController*/
angular.module('cdfinance', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
  
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/main.html',
      controller: HomepageController,
      controllerAs: 'vm',
      access: {
        restricted : false
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/profile', {
      templateUrl: 'angular-app/profile/profile.html',
      controller: profileController,
      controllerAs: 'vm',
      access: {
        restricted: false // add from profile controller
      }
    })
    .when('/dashboard', {
      templateUrl: 'angular-app/dashboard/dashboard.html',
      controller: DashboardController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .when('/buy', {
      templateUrl: 'angular-app/buy/buy.html',
      controller: BuyController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .when('/find', {
      templateUrl: 'angular-app/find/find.html',
      controller: FindController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    }) 
    .when('/deposit', {
      templateUrl: 'angular-app/deposit/deposit.html',
      controller: DepositController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}