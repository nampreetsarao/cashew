angular.module('app.controllers', [])
  
.controller('tilesCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

	$scope.total = "1,50,000";

  $scope.options = {  
  chart: {
  	pie: {
      dispatch: {
          elementClick: function(e) { 
          	var account = e.data.key;
          	console.log("details");
          	$state.go("accountDetails");
          	e.event.stopPropagation();
          },
          chartClick: function(e) {

          	console.log("DASHBOARD");
          	$state.go("account");
          }
      }
    },
    type: 'pieChart',
    height: 210,
    x: function(d){return d.key;},
    y: function(d){return d.y;},
    showLabels: true,
    duration: 500,
    labelThreshold: 0.01,
    labelSunbeamLayout: true,
    width: 250,
    title: $scope.total,
    donut: true,
    tooltips: true,
    legendPosition: 'top',
    showLegend: false
  }
};

  $scope.data = [  
  {
    key: "Barclays",
    y: 500
  },
  {
    key: "HSBC",
    y: 200
  },
  {
    key: "ICICI",
    y: 900
  },
  {
    key: "AXIS",
    y: 700
  },
  {
    key: "RBS",
    y: 400
  },
  {
    key: "Tesco",
    y: 300
  },
  {
    key: "Halifax",
    y: 50
  }
];

	

}])
   
.controller('cartCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cloudCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
// .controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams) {
// }])

//, subscribeService
//OAuth implementation
.controller('loginCtrl', function($scope, OAuthService,$http, $state,$interval, $cordovaInAppBrowser,StorageServiceForToken, $ionicPopup) {
    
    $scope.loginOAuth =  function(){
    var ref = cordova.InAppBrowser.open('http://inmbz2239.in.dst.ibm.com:8084/bigoauth2server/oauth/authorize?client_id=4a4b0281-49b1-4533-b3ac-eee11f1f6bd8&redirect_uri=http://localhost/callback&scope=read&response_type=code', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes,toolbar=yes');
    ref.addEventListener('loadstart', function(event) {
    if ((event.url).startsWith("http://localhost/callback")) {
          $scope.requestToken = (event.url).split("code=")[1];
          $scope.oAuth=[];
          //alert("requestToken.."+$scope.requestToken);
          //alert("Calling nexxt service for token");
         //Fetch general Information details from the API
         OAuthService.general(
             {
               grant_type: 'authorization_code',
               redirect_uri: 'http://localhost/callback',
               state: '4281938',
               code:  $scope.requestToken
            },
            {

            },
            function(message) {
               $scope.oauthData=message;
               ref.close();
               alert("done.."+$scope.oauthData);
               //Persisting the token data in local storage
               StorageServiceForToken.remove($scope.oauthData);
               StorageServiceForToken.add($scope.oauthData) ;
              alert('before calling subscription service '); 
               //check subscription
               var subscriptionDetails = {};
               // var promise = subscribeService.getSubscriptionInfo();
               //  promise.then(function(resp) {
               //      subscriptionDetails = resp.data;
               //      //alert('subscriptionDetails: '+subscriptionDetails.length);
               //      if(subscriptionDetails.length && subscriptionDetails.length>0){
               //          var accountID = subscriptionDetails[0].accountId;
               //          localStorage.setItem("accountID", accountID);
               //          //alert('GetAccountId: '+localStorage.getItem("accountID"));
               //          //$state.go('menu.aboutPSD22');
               //      }else{
               //          $state.go('menu.subscription');
               //      }
               //  });               
            },function(message) {
        $scope.signupResponse=message;
      });
       };
     });

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }
   };
 })

   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('accountCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('accountDetailsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tagsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('moveMoneyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('createVoucherCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('redeemVoucherCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('remindersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('insightsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('smartToolsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 