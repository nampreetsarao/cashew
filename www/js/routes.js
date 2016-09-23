angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.tiles', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tiles.html',
        controller: 'tilesCtrl'
      }
    }
  })

  .state('cart', {
    url: '/page2',
    templateUrl: 'templates/cart.html',
    controller: 'cartCtrl'
  })

  .state('cloud', {
    url: '/page3',
    templateUrl: 'templates/cloud.html',
    controller: 'cloudCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.signup', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('account', {
    url: '/page7',
    templateUrl: 'templates/account.html',
    controller: 'accountCtrl'
  })

  .state('accountDetails', {
    url: '/page8',
    templateUrl: 'templates/accountDetails.html',
    controller: 'accountDetailsCtrl'
  })

  .state('menu.tags', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tags.html',
        controller: 'tagsCtrl'
      }
    }
  })

  .state('menu.moveMoney', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/moveMoney.html',
        controller: 'moveMoneyCtrl'
      }
    }
  })

  .state('menu.createVoucher', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/createVoucher.html',
        controller: 'createVoucherCtrl'
      }
    }
  })

  .state('menu.redeemVoucher', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/redeemVoucher.html',
        controller: 'redeemVoucherCtrl'
      }
    }
  })

  .state('menu.reminders', {
    url: '/page21',
    views: {
      'side-menu21': {
        templateUrl: 'templates/reminders.html',
        controller: 'remindersCtrl'
      }
    }
  })


  .state('menu.createReminder', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/createReminder.html',
        controller: 'remindersCtrl'
      }
    }
  })

  .state('menu.insights', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/insights.html',
        controller: 'insightsCtrl'
      }
    }
  })

  .state('menu.smartTools', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/smartTools.html',
        controller: 'smartToolsCtrl'
      }
    }
  })


  .state('menu.subscription', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/subscription.html',
        controller: 'subscriptionCtrl'
      }
    }
  })


  .state('menu.profile', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page4')

  

});