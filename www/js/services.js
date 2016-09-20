angular.module('app-constants', [])
.constant('apiUrl', '@@apiUrl')
.constant("server", "inmbz2239.in.dst.ibm.com")
.constant("port", "8085")
.constant("baseURL","/cashewapi/")

.factory('constantService', function ($http, server, port, baseURL) {
    return {
        server:server,
        port: port,
        baseURL: baseURL
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

//OAuth Service
.factory('OAuthService', function($resource,apiUrl){
	//the authorization token is base 64 encoding of client ID and client secret
    var data = $resource('http://inmbz2239.in.dst.ibm.com:8084/bigoauth2server/oauth/token' , {}, {
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


// Storage Service for token
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