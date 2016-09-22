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
                 alert("Token received:"+ JSON.stringify($scope.oauthData));

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
     
    
.controller('accountCtrl', function ($scope, $stateParams,$ionicPopup, accountTransactionAPI) {

  $scope.total = "1,50,000";
  $scope.options = {  
    chart: {
      type: 'pieChart',
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      height: 280,
      width: 250,
      title: $scope.total,
      donut: true,
      tooltips: false,
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

  $scope.labelsLine = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.seriesLine = ['Series A', 'Series B'];
  $scope.dataLine = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
  ];

  //All account transaction date chart
  $scope.allAccountTransactionData = accountTransactionAPI.allAccountTransactionDistribution()
    .then(function(allAccountTranData){      
      var allAccountTranLabel = [];
      var allAccountTranSeries = [];
      var data1 = [];
      var sumAmt = "0";
      for(var i=0;i<allAccountTranData[0].buckets.length;i++){
        var a=[];
        allAccountTranLabel.push(allAccountTranData[0].buckets[i].key_as_string);
        //loop for getting value with bucket                  
        for(var j=0;j<allAccountTranData[0].buckets[i].aggregations.length;j++){
          a.push(allAccountTranData[0].buckets[i].aggregations[j].value);  
          var k = allAccountTranData[0].buckets[i].key_as_string;
          var y = allAccountTranData[0].buckets[i].aggregations[j].value;
          sumAmt = parseInt(sumAmt) + parseInt(allAccountTranData[0].buckets[i].aggregations[j].value);
          var obj = {
            "key": k,
            "y": y
          };
        }

        data1.push(obj);
      }
      $scope.allAccountTransactionOptions = {  
        chart: {
          type: 'pieChart',
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: true,
          duration: 500,
          labelThreshold: 0.01,
          labelSunbeamLayout: true,
          height: 280,
          width: 250,
          title: sumAmt,
          donut: true,
          tooltips: false,
          legendPosition: 'top',
          showLegend: false
        }
      };
      //loop for names from bucket, which to take only once
      for(var h=0;h<allAccountTranData[0].buckets[h].aggregations.length;h++){
        allAccountTranSeries.push(allAccountTranData[0].buckets[h].aggregations[h].name);            
      }
      $scope.allAccountTranLabel = allAccountTranLabel;
      $scope.allAccountTranSeries = allAccountTranSeries;         
      var realignBurndownData = _.unzip(data1);    
      $scope.allAccountTranData = data1;
      console.log($scope.allAccountTranData);
    }, function(err){
    var alertPopup = $ionicPopup.alert({
        title: 'Search Failed!',
        template: 'There was some problem with server.'
    });
  });
})
   
.controller('accountDetailsCtrl', function ($scope, $stateParams,$ionicPopup, accountTransactionAPI) {

  $scope.total = "1,50,000";
  $scope.options = {  
    chart: {
      type: 'pieChart',
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      height: 280,
      width: 250,
      title: $scope.total,
      donut: true,
      tooltips: false,
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

  $scope.labelsLine = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.seriesLine = ['Series A', 'Series B'];
  $scope.dataLine = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19]
  ];

  //specific account transaction data chart
  $scope.accountTransactionData = accountTransactionAPI.accountTransactionDistribution()
    .then(function(accountTranData){      
      var accountTranLabel = [];
      var accountTranSeries = [];
      var data1 = [];
      var sumAmt = "0";
      for(var i=0;i<accountTranData[0].buckets.length;i++){
        var a=[];
        accountTranLabel.push(accountTranData[0].buckets[i].key_as_string);
        //loop for getting value with bucket                  
        for(var j=0;j<accountTranData[0].buckets[i].aggregations.length;j++){
          a.push(accountTranData[0].buckets[i].aggregations[j].value);  
          var k = accountTranData[0].buckets[i].key_as_string;
          var y = accountTranData[0].buckets[i].aggregations[j].value;
          sumAmt = parseInt(sumAmt) + parseInt(accountTranData[0].buckets[i].aggregations[j].value);
          var obj = {
            "key": k,
            "y": y
          };
        }

        data1.push(obj);
      }
      $scope.accountTransactionOptions = {  
        chart: {
          type: 'pieChart',
          x: function(d){return d.key;},
          y: function(d){return d.y;},
          showLabels: true,
          duration: 500,
          labelThreshold: 0.01,
          labelSunbeamLayout: true,
          height: 280,
          width: 250,
          title: sumAmt,
          donut: true,
          tooltips: false,
          legendPosition: 'top',
          showLegend: false
        }
      };
      //loop for names from bucket, which to take only once
      for(var h=0;h<accountTranData[0].buckets[h].aggregations.length;h++){
        accountTranSeries.push(accountTranData[0].buckets[h].aggregations[h].name);            
      }
      $scope.accountTranLabel = accountTranLabel;
      $scope.accountTranSeries = accountTranSeries;         
      var realignBurndownData = _.unzip(data1);    
      $scope.accountTranData = data1;
      console.log($scope.accountTranData);
    }, function(err){
    var alertPopup = $ionicPopup.alert({
        title: 'Search Failed!',
        template: 'There was some problem with server.'
    });
  });

  //Specific account transaction data
  $scope.accountTransactionsData = accountTransactionAPI.accountTransactions()
    .then(function(accountTransData){
      var accountTransDataList = [];
      for(var i=0;i<accountTransData.length;i++){
        var accountTransactionsStruc={
          id : accountTransData[i].otherAccount.id,
          bankName : accountTransData[i].otherAccount.bank.name,
          detailsDescription : accountTransData[i].details.description,
          detailsValue : accountTransData[i].details.value.amount,
          postedDate : accountTransData[i].details.posted
        };
        accountTransDataList.push(accountTransactionsStruc);
      }
      $scope.accountTransactionsList = accountTransDataList;

    }, function(err){
    var alertPopup = $ionicPopup.alert({
      title: 'Search Failed!',
      template: 'There was some problem with server.'
    });
  });
})

     
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
   