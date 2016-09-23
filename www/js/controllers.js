  angular.module('app.controllers', [])
    
  .controller('tilesCtrl', ['$scope', '$stateParams', '$state', 'getAllAccountsDetailsService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams, $state, getAllAccountsDetailsService) {

   
   $scope.allAccounts = {};
      //calling all Accounts    

      var promise = getAllAccountsDetailsService.getAllAccounts();
      promise.then(function(data) {
          $scope.allAccounts = data;
      });



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
        // cordova.InAppBrowser
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
     
 .controller('moveMoneyCtrl', ['$scope', '$stateParams', '$ionicModal', 'getAllAccountsDetailsService', 'accountTransactionAPI', '$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,  $ionicModal, getAllAccountsDetailsService, accountTransactionAPI, $ionicLoading) {


    $scope.allAccounts = {};
    $scope.payeeAccounts = {};

    $scope.fromAcc = "";
    $scope.toAcc = "";
    $scope.toAccId = "";
    $scope.type = "";
      //calling all Accounts    

      var accPromise = getAllAccountsDetailsService.getAllAccounts();
      accPromise.then(function(data) {
          $scope.allAccounts = data.data.response;

          var elements = "";
          //Create
          for(var idx=0;idx<$scope.allAccounts.length;idx++){
              var acc = $scope.allAccounts[idx];
              var elem = "<div class='grid__item'><i class='fa fa-fw fa-image'></i>"+
                              "<label data='"+acc.id+"' style='color:white;'><b>"+acc.bankId+"</b></label><br/>"+
                              "<label data='"+acc.id+"'>("+acc.id+")</label><br/>"+
                              "<label>Balance: "+acc.balance.amount+"</label>"+
                            "</div>";
              elements = elements + elem;
          }
          $("#grid").html(elements);
          console.log($scope.allAccounts[0].bankId +", "+$scope.allAccounts[0].balance.amount);
          $scope.initiateDragNDrop();
      });
  
  // Get All Payee Accounts
    var payeePromise = getAllAccountsDetailsService.getPayeeAccounts();
      payeePromise.then(function(data) {
          $scope.payeeAccounts = data.data.response;
          console.log($scope.payeeAccounts[0].source.bankId);
      });

  $scope.callitgo = function(){
      var popup = document.getElementById( 'popup-area' );
      classie.remove( popup, 'show' );  
  };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  $scope.fromAcc = "";
  $scope.makePaymentObj = {
                            "to":{
                                  "bankId": $scope.toAcc,
                                  "accountId": ""
                              },  
                            "value":{
                                "currency":"GBP",
                                "amount":""
                              },
                            "description":"",

                             "transactionRequestType": $scope.type
                        } ;


  $scope.moveMoney = function(){
    $scope.modal.remove();
    $scope.makePaymentObj.to.accountId = $scope.toAccId;
    $scope.makePaymentObj.to.bankId = $scope.toAcc;
    $scope.makePaymentObj.transactionRequestType = $scope.type;
    accountTransactionAPI.createTransactionRequest($scope.fromAcc, $scope.makePaymentObj);   
  };

  $scope.initiateDragNDrop = function(){

    var body = document.body;
    var dropArea = document.getElementById( 'drop-area' );
    var droppableArr = [];
    var dropAreaTimeout;

    classie.add( dropArea, 'show' );
      //** Drag-n-Drop functionality **//
    // initialize droppables
        [].slice.call( document.querySelectorAll( '#drop-area .drop-area__item' )).forEach( function( el ) {
          droppableArr.push( new Droppable( el, {

            onDrop : function( instance, draggableEl ) {
              // show checkmark inside the droppabe element
              classie.add( instance.el, 'drop-feedback' );
              $(instance.el).toggleClass("clicked");
              clearTimeout( instance.checkmarkTimeout );
              $scope.toAcc = $scope.elem = $($(instance.el).children()[0]).attr('data');              
              $scope.toAccId = $($(instance.el).children()[1]).attr("data");
              $scope.type = $(instance.el).attr("data");


              $scope.fromAcc = $($(draggableEl).children()[1]).attr('data');
              $scope.elem = $(instance.el);
              instance.checkmarkTimeout = setTimeout( function() { 
                classie.remove( instance.el, 'drop-feedback' );
              }, 800 );

              // ...
            }
          } ) );
        } );

        // initialize draggable(s)
        [].slice.call(document.querySelectorAll( '#grid .grid__item' )).forEach( function( el ) {
          new Draggable( el, droppableArr, {
            draggabilly : { containment: document.body },
            onStart : function(el) {
              // add class 'drag-active' to body
              classie.add( body, 'drag-active' );
              // clear timeout: dropAreaTimeout (toggle drop area)
              clearTimeout( dropAreaTimeout );
              // show dropArea
              classie.add( dropArea, 'show');
            },
            onEnd : function(wasDropped ) {
              var afterDropFn = function() {
                // hide dropArea
                //classie.remove( dropArea, 'show' );
                // remove class 'drag-active' from body
                classie.remove( body, 'drag-active' );
                $($scope.elem).removeClass("clicked");

                $scope.makePaymentObj.value.amount = '';
                $scope.makePaymentObj.description = '';
                //Payment popup
                $ionicModal.fromTemplateUrl('my-modal.html', {
                  scope: $scope,
                  animation: 'jelly'
                }).then(function(modal) {
                  $scope.modal = modal;
                  $scope.modal.show();

                });

                 /////open popup to make a payment
                  //$(instance.el).toggleClass("clicked");
              };

              if( !wasDropped ) {
                afterDropFn();
              }
              else {
                // after some time hide drop area and remove class 'drag-active' from body
                clearTimeout( dropAreaTimeout );
                dropAreaTimeout = setTimeout( afterDropFn, 1400 );
              }
            }
          } );
        } );
  }

  
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


  .controller('remindersCtrl', function ($scope, $stateParams,$state, reminderService, $ionicPopup) {
      
      var toDate= new Date();
      var fromDate= new Date();
      $scope.reminders = [];
      //calling the reminder service to fetch all the reminders for a month
      var promise = reminderService.getReminders(toDate, fromDate);
      promise.then(function(data) {
          $scope.groups = $scope.reminders = data.data.response;
      });
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
          if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
          } else {
            $scope.shownGroup = group;
          }
        };
        $scope.isGroupShown = function(group) {
          return $scope.shownGroup === group;
        };

        //Function called for creating the reminder
        //this.reminderDate + this.reminderTime

      $scope.createReminder =  function(){
        //alert("date"+this.reminderDate + " time:"+this.reminderTime);
         
         if(this.isChecked){
            var paymentObj= {
                              "reminderType": "Payment",
                                    "reminderDate": "2016-10-08T00:00:00.000+0530", 
                                    "description": this.description,
                              "from":{
                                        "bankId":"BARCGB",
                                        "accountId": this.fromAccount
                                      }, 
                              "to":{
                                       "bankId":"BARCGB",
                                        "accountId": this.toAccount
                                    }, 
                              "amount":{
                                       "currency":"GBP",
                                       "amount": this.amount
                                    }
                            };
            reminderService.createReminder(paymentObj);      
         }else{
          var createReminderObj= {
                                    "reminderType": "General",
                                    "reminderDate": "2016-10-08T00:00:00.000+0530", 
                                    "description": this.description,
                                 };
          reminderService.createReminder(createReminderObj);    
         }
      }  

      $scope.deleteReminder =  function(reminderId){
        reminderService.deleteReminder(reminderId);

      }


      $scope.updateReminder =  function(reminderId){
        $state.go('menu.createReminder');

      }
  })
     
  .controller('insightsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $stateParams) {

      var pics = ['img/insight1.jpg', 'img/insight2.jpg', 'img/insight3.jpg', 'img/insight4.jpg', 'img/insight5.jpg'];

          var cardTypes = [{
            title: 'Insight1',
            desc: 'details of Insight1',
            image: pics[Math.floor(Math.random()*pics.length)]
          }, {
            title: 'Insight2',
            desc: 'details of Insight2',
            image: pics[Math.floor(Math.random()*pics.length)]
          }, {
            title: 'Insight3',
            desc: 'details of Insight3',
            image: pics[Math.floor(Math.random()*pics.length)]
          }, {
            title: 'Insight4',
            desc: 'details of Insight4',
            image: pics[Math.floor(Math.random()*pics.length)]
          }, {
            title: 'Insight5',
            desc: 'details of Insight5',
            image: pics[Math.floor(Math.random()*pics.length)]
          }];

          $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

          $scope.cardSwiped = function(index) {
            $scope.addCard();
          };

          $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
          };

          $scope.addCard = function() {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
          }

           $scope.goAway = function() {
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
          };

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
   