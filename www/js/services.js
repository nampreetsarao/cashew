angular.module('app-constants', [])
.constant('apiUrl', '@@apiUrl')
.constant("server", "inmbz2239.in.dst.ibm.com")
.constant("port", "8085")
.constant("portForSignup", "8084")
.constant("baseURL","/cashewapi")
.constant("baseURLForOAuth","/bigoauth2server")

.factory('constantService', function ($http, server, port, baseURL, baseURLForOAuth, portForSignup) {
    return {
        server:server,
        port: port,
        baseURL: baseURL, 
        baseURLForOAuth: baseURLForOAuth, 
        portForSignup: portForSignup
    }
});




angular.module('app.services', ['app-constants'])

//Profile service 
.service('accountsService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {
    //to fetch all acounts
    var deferred = $q.defer();
    this.getAccounts = function() {
      $ionicLoading.show(); 
      var allAccountDetails=[];
      var authorizationToken = '';
      var oauthData = StorageServiceForToken.getAll();
      if(oauthData!=null && oauthData.length>0){
          authorizationToken = 'Bearer '+ oauthData[0].access_token;
      }else{
        allAccountDetails='First authenticate and then make this call.';
      }
      $http.defaults.headers.common.Authorization=authorizationToken;
      //$http.defaults.headers.common.Authorization='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0Njc4OTUzODQsInVzZXJfbmFtZSI6Im5zaW5naCIsImF1dGhvcml0aWVzIjpbIlVTRVIiXSwianRpIjoiMTExMWRhNzMtMWY3ZC00NDA1LTk3ZDEtM2FjNGNiNmM5MzllIiwiY2xpZW50X2lkIjoicG9zdG1hbiIsInNjb3BlIjpbIndyaXRlIl19.XtM6MjWkbVlaudZRWXHvTlhpzTU9Q64qF7UdR-BB5Zs';
      //alert('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts');
      $http.get('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts').then(function(resp){
          console.log('Success', resp); // JSON object
          //allAccountDetails=resp;
          deferred.resolve(resp);
          $ionicLoading.hide(); 
        }, function(err){
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Show all accounts: Alert',
            template:'Error occured while calling the API:'+err
          });
        });
        return deferred.promise;
    };
})


//Create Voucher service 
.service('voucherService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {
    var deferred = $q.defer();
    //service to generate the voucher
    this.createVoucher = function(voucherObj) {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoidGFubWF5LmFtYnJlQGluLmlibS5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDQ3ODEyNSwidXNlck5hbWUiOiJ0YW5tYXkuYW1icmVAaW4uaWJtLmNvbSIsInVzZXJJZCI6InRhbm1heS5hbWJyZUBpbi5pYm0uY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjI0MzAzNWZlLWViMjEtNGU0Ni1hZDUyLTVmMDExMThmNjJkYiIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.7PhF09gOPUbe7lrBf9jpWr3Yyfy5JRSYwf4LIkaGxgY';
      var oauthData = StorageServiceForToken.getAll();
      if(oauthData!=null && oauthData.length>0){
          authorizationToken = 'Bearer '+ oauthData[0].access_token;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'POST',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/voucher',
        data: voucherObj,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          voucherDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error creating voucher',
            template:'Error occured while calling the API:'+err+"."
          });
       });
        return deferred.promise;
    };

    //Service to redeem the voucher
    this.redeemVoucher = function(voucherObj) {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoidGFubWF5LmFtYnJlQGluLmlibS5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDQ2NDU5MywidXNlck5hbWUiOiJ0YW5tYXkuYW1icmVAaW4uaWJtLmNvbSIsInVzZXJJZCI6InRhbm1heS5hbWJyZUBpbi5pYm0uY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjUxNjE1N2VhLWJiNzMtNDZlMy04ZGQ1LTA0M2FlMjk5YjJlNyIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.Nw5qIN3uzpoKfOUSbiBrqRSCtwylFqII7BM31sfHMDM';
      var oauthData = StorageServiceForToken.getAll();
      if(oauthData!=null && oauthData.length>0){
          authorizationToken = 'Bearer '+ oauthData[0].access_token;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'PATCH',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/voucher',
        data: voucherObj,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          voucherDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error creating voucher',
            template:'Error occured while calling the API:'+err+"."
          });
       });
        return deferred.promise;
    };
})

// //Factory for Voucher services
// .factory('VoucherService', function($resource, constantService){
//     var data = $resource('http://'+constantService.server+':'+constantService.port+constantService.baseURL+constantService.baseURLForOAuth+'/vocher' , {}, {
//         createVoucher:{
//             method:'POST', 
//             headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': 'Bearer '
//               }
//             }
//         });
//    return data;
// })


//Factory for sign up service
.factory('SignUpService', function($resource, constantService){
    var data = $resource('http://'+constantService.server+':'+constantService.portForSignup+constantService.baseURLForOAuth+'/user' , {}, {
        signup:{
            method:'PUT',
            headers: {
                  'Content-Type': 'application/json'
              }
            }
        });
   return data;
})

//Factory for OAuth token Service
.factory('OAuthService', function($resource,apiUrl, constantService){
	//the authorization token is base 64 encoding of client ID and client secret
    var data = $resource('http://'+constantService.server+':'+constantService.portForSignup+constantService.baseURLForOAuth+'/oauth/token' , {}, {
        general:{
            method:'POST',
            headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'authorization': 'Basic NGE0YjAyODEtNDliMS00NTMzLWIzYWMtZWVlMTFmMWY2YmQ4OiQyYSQxMCROSmg0Sm9scDlXQURBY0l2MVlPcG11NTdrSThqTWVRVDd0cnNSZm5HWHdxRS9LYkdSYnV6aQ=='
              }
            }
        });
    return data;
})

// Factory for Storage Service for token (fetching, deleting)
.factory ('StorageServiceForToken', function ($localStorage) {
    $localStorage = $localStorage.$default({
      tokenInformation: []
    });

    var _getAll = function () {
      return $localStorage.tokenInformation;
    };

    var _add = function (thing) {
      $localStorage.tokenInformation.push(thing);
    };

    var _remove = function (thing) {
      $localStorage.tokenInformation.splice($localStorage.tokenInformation.indexOf(thing), 1);
    };

    return {
        getAll: _getAll,
        add: _add,
        remove: _remove
      };
});