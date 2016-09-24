// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','nvd3','ngResource','LocalStorageModule','ngCordova','ngStorage','chart.js', 'ionic.contrib.ui.cards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    } 
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(['$state', '$window',
    function($state, $window) {
        $window.addEventListener('LaunchUrl', function(event) {
            // gets page name from url
            var page =/.*:[/]{2}([^?]*)[?]?(.*)/.exec(event.detail.url)[1];

            alert(event.detail.url);
            // redirects to page specified in url
            //$state.go('tab.'+ page, {});
            $state.go('menu.moveMoney', {});
            
        });
    }
]);

function handleOpenURL(url) {
    setTimeout( function() {
      alert("url received:"+url);
        var event = new CustomEvent('LaunchUrl', {detail: {'url': url}});
        window.dispatchEvent(event);
    }, 0);
}