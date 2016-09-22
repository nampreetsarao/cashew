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
     
  //OAuth implementation for login
  .controller('loginCtrl', function($scope, OAuthService,$http, $state,$interval, $cordovaInAppBrowser,StorageServiceForToken, $ionicPopup) {
      
      $scope.loginOAuth =  function(){
        // 
      var ref =cordova.InAppBrowser.open('http://inmbz2239.in.dst.ibm.com:8084/bigoauth2server/oauth/authorize?client_id=4a4b0281-49b1-4533-b3ac-eee11f1f6bd8&redirect_uri=http://localhost/callback&scope=read&response_type=code', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes,toolbar=yes');
      ref.addEventListener('loadstart', function(event) {
      //alert('event url'+event.url);
      if ((event.url).startsWith("http://localhost/callback")) {
            $scope.requestToken = (event.url).split("code=")[1];
            $scope.oAuth=[];
           //Fetch general Information details from the API
           OAuthService.general(
               {
                 grant_type: 'authorization_code',
                 redirect_uri: 'http://localhost/callback',
                 state: '4281938',
                 code:  $scope.requestToken
              },{},
              function(message) {
                 $scope.oauthData=message;
                 ref.close();
                 //alert("token received:"+ $scope.oauthData);

                 //Persisting the token data in local storage
                 StorageServiceForToken.remove($scope.oauthData);
                 StorageServiceForToken.add($scope.oauthData) ;
                 $state.go('menu.tiles');             
              },function(message) {
                //alert("failure:"+ JSON.stringify(message));
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

     
  .controller('signupCtrl', function ($scope, $stateParams,$state, SignUpService, $ionicPopup) {
    $scope.signUpUser =  function(){
      //calling sign up service api
      SignUpService.signup(
        {  }, {email: this.emailId,
          userId: this.emailId,
          password: this.password,
          name:  this.firstName+' '+this.lastName,
          phone: this.mobile,
          pwd: this.password,
          authProvider: 'BigOauth2Server',
          authProviderClientId: '4a4b0281-49b1-4533-b3ac-eee11f1f6bd8'
        },
        function(message) {
          $scope.signupResponse=message;
          // function to retrive the response
          if($scope.signupResponse.status=='SUCCESS'){
            var alertPopup = $ionicPopup.alert({
              title: 'Signup',
              template:'User added successfully. Please login now.'
            });
            $state.go('login');
          }
        },function(message) {
          $scope.signupResponse=message;
        }
      );
    }
  })
     
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
     
  .controller('createVoucherCtrl', function ($scope, $stateParams,$state, voucherService, $ionicPopup, $cordovaSocialSharing) {
    var j = document.createElement('script');
    j.type = 'text/javascript';
    j.src = 'lib/scratchcard/scratchcard.js';
    document.getElementsByTagName('head')[0].appendChild(j);

    // ScratchCard(document.getElementById('sceatchable'));
    $scope.voucherDetails={};
    $scope.shareVoucher =  function(){
      $cordovaSocialSharing.share("Here is your voucher Code: "+$scope.voucherDetails.data.response.code+".You can redeem it at Cashew.", "", "", "http://www.risehackathon.com/");
    }
   // ScratchCard(document.getElementById('sceatchable'));
    $scope.createVoucher =  function(){
    var voucherObj=     {
                "acctFrom":[
                {
                      "bankId":"IBMGB",
                      "accountId": this.accountNumber,
                 "value":{
                    "currency":"GBP",
                    "amount":this.amount
                  }
                  }],
                "description":this.description,
                "amount":{
                    "currency":"GBP",
                    "amount": this.amount
                  }
            };
      //calling the voucher service
      

      var promise = voucherService.createVoucher(voucherObj);
      promise.then(function(data) {
          $scope.voucherDetails = data;
          $scope.showVoucher=true;
      });

    }
  })

     
  .controller('redeemVoucherCtrl', function ($scope, $stateParams,$state, voucherService, $ionicPopup) {
   // ScratchCard(document.getElementById('sceatchable'));
    $scope.redeemVoucher =  function(){
    var redeemVoucherObj=    {
                              "redeemedTo":[
                              {
                                    "bankId":"BARCGB",
                                    "accountId":this.account,
                               "value":{
                                  "currency":"GBP",
                                  "amount":"400"
                                }
                                }],
                              "description":"gift vocher",
                              "amount":{
                                  "currency":"GBP",
                                  "amount":"400"
                                },
                                
                                   "code": this.voucherCode
                              };
      //calling the voucher service to redeem the voucher
      voucherService.redeemVoucher(redeemVoucherObj);
    }
  })
     
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
   