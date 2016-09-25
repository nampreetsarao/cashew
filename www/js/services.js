angular.module('app-constants', [])
.constant('apiUrl', '@@apiUrl')
.constant("server", "169.46.150.99")
.constant("port", "8085")
.constant("portForSignup", "8084")
.constant("baseURL","/cashewapi")
.constant("baseURLForOAuth","/bigoauth2server")
.constant("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImU4NDJhNjkzLWQ0NjUtNDQ3My1hZTAyLWNiOWY1YWIwZmUzNSIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0Nzk3MDQ1LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImIzOWZjYjE4LThmMDQtNDIzZi1hYjA5LTc1ZmNiMjEyOTE2MCIsImNsaWVudF9pZCI6ImU4NDJhNjkzLWQ0NjUtNDQ3My1hZTAyLWNiOWY1YWIwZmUzNSJ9.T5KoNyp8dBX7hMcZ6MYbrHPxBSOX_5Lan4QpPGqvgrc")

.factory('constantService', function ($http, server, port, baseURL, baseURLForOAuth, portForSignup,token) {
    return {
        server:server,
        port: port,
        baseURL: baseURL, 
        baseURLForOAuth: baseURLForOAuth, 
        portForSignup: portForSignup,
        token: token
    }
})


.factory('profileInfoService', function(){
    var profile = {};
    return {
        setToken : function(token){
            profile.token = token;
        },
        getToken :function(){
            return profile.token;
        }
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
      oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        allAccountDetails='First authenticate and then make this call.';
      }
      //$http.defaults.headers.common.Authorization=authorizationToken;
      $http.defaults.headers.common.Authorization=authorizationToken;
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
            template:'Error occured while calling the API:'+JSON.stringify(err)
          });
        });
        return deferred.promise;
    };
})


//Create Voucher service 
.service('voucherService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup, $ionicLoading) {
    var deferred = $q.defer();
    //service to generate the voucher
    this.createVoucher = function(voucherObj) {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoidGFubWF5LmFtYnJlQGluLmlibS5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDQ3ODEyNSwidXNlck5hbWUiOiJ0YW5tYXkuYW1icmVAaW4uaWJtLmNvbSIsInVzZXJJZCI6InRhbm1heS5hbWJyZUBpbi5pYm0uY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjI0MzAzNWZlLWViMjEtNGU0Ni1hZDUyLTVmMDExMThmNjJkYiIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.7PhF09gOPUbe7lrBf9jpWr3Yyfy5JRSYwf4LIkaGxgY';
      var oauthData = StorageServiceForToken.getAll();
      oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
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
      oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
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
            template:'Error occured while calling the API:'+JSON.stringify(err)+"."
          });
       });
        return deferred.promise;
    };
})

//Tag Service
.service('getTags', function($state, $http, $q, $ionicLoading,$ionicPopup, constantService, StorageServiceForToken){
  this.getAllTags = function(){
    $ionicLoading.show();
    var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NjQ5NzM5LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjI3ZjQ3MDVhLWU5NzQtNDJmMi1iY2Q5LTQzZTk5YjA5M2EwZSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.CGrIDlpkbgvNjS4vDjnXfiVXfLd3yA-6OhzQQUojUOg';
    var oauthData = StorageServiceForToken.getAll();
    oauthData =constantService.token;
    if(oauthData!=null ){
        authorizationToken = 'Bearer '+ oauthData;
    }else{
      voucherDetails='First authenticate and then make this call.';
    }
   return $q(function(resolve, reject){
      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/tags',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json',
               'Authorization' : authorizationToken,
            }
          }
          $http(req)
          .then(function(getAllTags) {
            $ionicLoading.hide();
            console.log(getAllTags);            
            // function to retrive the response
            if (getAllTags.status == 200) {
              resolve(getAllTags.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }  

  //getUserAddedTags
  this.getUserAddedTags = function(){
    $ionicLoading.show();
    var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NzI5NDg5LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImEwNmQyYmY3LWNiMDgtNGY2ZS04NjJhLThmZmNlNTVhNWM3MSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.anIkVxZAWXlutyaMo_bL0IAi1jIO-bk2B6hZfe7OPYQ';
    var oauthData = StorageServiceForToken.getAll();
    oauthData =constantService.token;
    if(oauthData!=null ){
        authorizationToken = 'Bearer '+ oauthData;
    }else{
      voucherDetails='First authenticate and then make this call.';
    }
    return $q(function(resolve, reject){
      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/profile',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json',
               'Authorization' : authorizationToken,
            }
          }
          $http(req)
          .then(function(getAllUserAddedTags) {
            $ionicLoading.hide();
            console.log(getAllUserAddedTags);            
            // function to retrive the response
            if (getAllUserAddedTags.status == 200) {
              resolve(getAllUserAddedTags.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  } 


})

.service('tagService', function($http, $q, $ionicLoading,$ionicPopup, constantService, StorageServiceForToken,StorageService){
    $ionicLoading.show();
    var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NjQ5NzM5LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjI3ZjQ3MDVhLWU5NzQtNDJmMi1iY2Q5LTQzZTk5YjA5M2EwZSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.CGrIDlpkbgvNjS4vDjnXfiVXfLd3yA-6OhzQQUojUOg';
    var oauthData = StorageServiceForToken.getAll();
    oauthData =constantService.token;
    if(oauthData!=null ){
        authorizationToken = 'Bearer '+ oauthData;
    }else{
      voucherDetails='First authenticate and then make this call.';
    }

    var profileInformation =StorageService.getAll();
       this.tagTransactionToApi = function(tagAccountId, tagBankId, tagTransactionId, tagValue){
      return $q(function(resolve, reject){
        $http({
          method: 'PATCH',
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/iceman@gmail.com/'+tagBankId+'/'+tagAccountId+'/transaction/'+tagTransactionId+'/tag/'+tagValue,
          headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizationToken
          }}).then(function(result) {
            console.log('Success', result); 
            
         }, function(err) {
            $ionicLoading.hide();
            console.error('ERR', err);
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error creating voucher',
              template:'Error occured while calling the API:'+err+"."
            });
         })
      });
    }

    /*
      Add Tags
      API : Add Tags
    */
    this.addTags = function(tagValue){
      return $q(function(resolve, reject){
        $ionicLoading.show();

        $http({
          method: 'PATCH',
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/tags',
          data: tagValue,
          headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizationToken
          }}).then(function(result) {
            console.log('Success', result); 
            $ionicLoading.hide();
            
         }, function(err) {
            console.error('ERR', err);
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Error creating voucher',
              template:'Error occured while calling the API:'+err+"."
            });
         })
      });
    }

})


//Reminders  service 
.service('reminderService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {
    var deferred = $q.defer();
    //service to retrieve the reminders set
    this.getReminders = function(fromDate, toDate) {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NjI0NTI1LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjAxZWJmYWExLTNjMWQtNGE3Yy1hMTM1LWI1NWM0YjNiNGFkNCIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.H8QKAgLwTGDv_aJMxY_msX_ID6pIHOgB4H0_6LYa6Qs';
      var oauthData = StorageServiceForToken.getAll();
      oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'GET',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/reminder',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken,
        'fromDate': '2016-10-08T00:00:00.000+0530',
        'toDate': '2016-10-09T00:00:00.000+0530'
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
            title: 'Error creating reminder',
            template:'Error occured while calling the API:'+err+"."
          });
       });
        return deferred.promise;
    };

  //Create reminder service  
  this.createReminder = function(reminderObj) {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NjI0NTI1LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjAxZWJmYWExLTNjMWQtNGE3Yy1hMTM1LWI1NWM0YjNiNGFkNCIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.H8QKAgLwTGDv_aJMxY_msX_ID6pIHOgB4H0_6LYa6Qs';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'PUT',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/reminder',
        data: reminderObj,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          voucherDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
          var alertPopup = $ionicPopup.alert({
            title: 'Reminder added sucessfully.',
            template:'Reminder added sucessfully'
          });
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error creating reminder',
            template:'Error occured while calling the API:'+err+"."
          });
       });
        return deferred.promise;
    };


  //delete reminder 
  this.deleteReminder = function(reminderId) {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NjI0NTI1LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjAxZWJmYWExLTNjMWQtNGE3Yy1hMTM1LWI1NWM0YjNiNGFkNCIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.H8QKAgLwTGDv_aJMxY_msX_ID6pIHOgB4H0_6LYa6Qs';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'DEL',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/reminder/'+reminderId,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          voucherDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
          var alertPopup = $ionicPopup.alert({
            title: 'Reminder deleted sucessfully.',
            template:'Reminder deleted sucessfully'
          });
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error deleting reminder',
            template:'Error occured while calling the API:'+JSON.stringify(err)+"."
          });
       });
        return deferred.promise;
    };
})


//Profile service 
.service('profileService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {
    var deferred = $q.defer();
    //service to generate the voucher
    this.getProfile = function(token) {
      $ionicLoading.show(); 
      var profileDetails='';
      var authorizationToken = token;
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
     // alert(JSON.stringify(oauthData));
      if(oauthData!=null){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
          profileDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'GET',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/profile',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken,
        }}).then(function(result) {
          console.log('Success', result); 
          profileDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
          console.log(result);
       }, function(err) {
          
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error fetching profile details',
            template:'Error occured while calling the API:'+JSON.stringify(err)+"."+" OAuth token: "+JSON.stringify(oauthData)
          });
       });
      return deferred.promise;
    };
})



//Account and account details Service
.service('accountTransactionAPI', function($http, $q, $ionicLoading,constantService, StorageServiceForToken, $ionicLoading){
  var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NjQ5NzM5LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjI3ZjQ3MDVhLWU5NzQtNDJmMi1iY2Q5LTQzZTk5YjA5M2EwZSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.CGrIDlpkbgvNjS4vDjnXfiVXfLd3yA-6OhzQQUojUOg';
    var oauthData = StorageServiceForToken.getAll();
   oauthData =constantService.token;
    if(oauthData!=null ){
        authorizationToken = 'Bearer '+ oauthData;
    }else{
      voucherDetails='First authenticate and then make this call.';
    }

     /*
    specific account transaction distribution details chart
    API : Get Transaction Distribution Graph
  */
  this.accountTransactionDistribution = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();  
      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/distribution',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken,
               'fromDate' : new Date(date.getFullYear(), date.getMonth(), 1).toString('yyyy-MM-dd')+"T00:00:00.000+0530", 
               'toDate' : (new Date(date.getFullYear(), date.getMonth()+1, 0)).toString('yyyy-MM-dd')+"T00:00:00.000+0530"
            },
              params: {                    
                  accountId: '7278',
                  bankId: 'IBMGB'
                }
          }
          $http(req)
          .then(function(accountTransactionDistributionData) {
            console.log(accountTransactionDistributionData);      
            $ionicLoading.hide();      
            // function to retrive the response
            if (accountTransactionDistributionData.status == 200) {
              resolve(accountTransactionDistributionData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }

  this.createTransactionRequest = function(fromAcc, makePaymentObj, $ionicPopup){

      $http.post("http://inmbz2239.in.dst.ibm.com:8085/cashewapi/iceman@gmail.com/IBMGB/"+fromAcc+"/payment", makePaymentObj, {
        }).success(function(responseData) {
            //do stuff with response
            $ionicLoading.hide();
            console.log('Success', responseData);
            var alertPopup = $ionicPopup.alert({
            title: 'Make a Payment',
            template:'Transaction successfully submitted.'
          });
        })
        
    }; 

  /*
    consolidated account transaction distribution details chart
    API : Get Transaction Distribution Graph
  */
  this.allAccountTransactionDistribution = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();

      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/distribution',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken,
               'fromDate' : new Date(date.getFullYear(), date.getMonth(), 1).toString('yyyy-MM-dd')+"T00:00:00.000+0530", 
               'toDate' : (new Date(date.getFullYear(), date.getMonth()+1, 0)).toString('yyyy-MM-dd')+"T00:00:00.000+0530"
            }
          }
          $http(req)
          .then(function(allAccountTransactionDistributionData) {
            console.log(allAccountTransactionDistributionData);            
            // function to retrive the response
            $ionicLoading.hide();
            if (allAccountTransactionDistributionData.status == 200) {
              resolve(allAccountTransactionDistributionData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
  /*
    Specific user bank account details
    API : Get User's Bank Account Details
  */
  this.specificBankAccountDetails = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();

      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/iceman@gmail.com/IBMGB/7278',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken
            }
          }
          $http(req)
          .then(function(specificBankAccountDetailsData) {
            console.log(specificBankAccountDetailsData);  
            $ionicLoading.hide();          
            // function to retrive the response
            if (specificBankAccountDetailsData.status == 200) {
              resolve(specificBankAccountDetailsData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
  
  /*
    consolidated user bank account details
    API : Get User's Bank Account Details
  */
  this.allBankAccountDetails = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();

      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/iceman@gmail.com/accounts',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken
            }
          }
          $http(req)
          .then(function(allBankAccountDetailsData) {
            $ionicLoading.hide();
            console.log(allBankAccountDetailsData);            
            // function to retrive the response
            if (allBankAccountDetailsData.status == 200) {
              resolve(allBankAccountDetailsData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
  /*
    specific account transaction data
    API : Get User's Bank Account Transactions
  */
  this.accountTransactions = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();

      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/iceman@gmail.com/transactions',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken
            },
              params: {                    
                  accountId: '7278',
                  bankId: 'IBMGB'
                }
          }
          $http(req)
          .then(function(accountTransactionsData) {
            $ionicLoading.hide();
            console.log(accountTransactionsData);            
            // function to retrive the response
            if (accountTransactionsData.status == 200) {
              resolve(accountTransactionsData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
  /*
    Consolidated account transaction data
    API : Get User's Bank Account Transactions
  */
  this.allAccountTransactions = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();

      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/iceman@gmail.com/transactions',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken
            }
          }
          $http(req)
          .then(function(allAccountTransactionsData) {
            $ionicLoading.hide();
            console.log(allAccountTransactionsData);            
            // function to retrive the response
            if (allAccountTransactionsData.status == 200) {
              resolve(allAccountTransactionsData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }

  /*
    consolidated Avg. transaction expenses for past 3 months
    API : Get User Avg Transaction Expense
  */
  this.allAccountAverageTransactionExpenses = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();
      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/histogram',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken,
               'fromDate' : Date.parse('t - 3m').toString('yyyy-MM-d')+"T00:00:00.000+0530", 
               'toDate' : (new Date(date.getFullYear(), date.getMonth(), -1)).toString('yyyy-MM-dd')+"T00:00:00.000+0530"
            }
          }
          $http(req)
          .then(function(allAccountAverageTransactionExpensesData) {
            console.log(allAccountAverageTransactionExpensesData);            
            // function to retrive the response
            $ionicLoading.hide();
            if (allAccountAverageTransactionExpensesData.status == 200) {
              resolve(allAccountAverageTransactionExpensesData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }

  /*
    consolidated Avg. transaction expenses for this month
    API : Get User Avg Transaction Expense
  */
  this.allAccountAverageTransactionForMonthExprenses = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();
      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/histogram',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken,
               'fromDate' : (new Date(date.getFullYear(), date.getMonth(), 1)).toString('yyyy-MM-dd')+"T00:00:00.000+0530", 
               'toDate' : (new Date(date.getFullYear(), date.getMonth() + 1, 0)).toString('yyyy-MM-dd')+"T00:00:00.000+0530"
            }
          }
          $http(req)
          .then(function(allAccountAverageTransactionExpensesData) {
            console.log(allAccountAverageTransactionExpensesData);  
            $ionicLoading.hide();          
            // function to retrive the response
            if (allAccountAverageTransactionExpensesData.status == 200) {
              resolve(allAccountAverageTransactionExpensesData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
  /*
    specific account Avg. transaction expenses for past 3 months
    API : Get User Avg Transaction Expense
  */
  this.specificAccountAverageTransactionExpenses = function(){
    return $q(function(resolve, reject){
      var date = new Date();
      $ionicLoading.show();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/histogram',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken,
               'fromDate' : Date.parse('t - 3m').toString('yyyy-MM-d')+"T00:00:00.000+0530", 
               'toDate' : (new Date(date.getFullYear(), date.getMonth(), -1)).toString('yyyy-MM-dd')+"T00:00:00.000+0530"
            },
              params: {                    
                  accountId: '7278',
                  bankId: 'IBMGB'
                }
          }
          $http(req)
          .then(function(specificAccountAverageTransactionExpensesData) {
            console.log(specificAccountAverageTransactionExpensesData);   
            $ionicLoading.hide();         
            // function to retrive the response
            if (specificAccountAverageTransactionExpensesData.status == 200) {
              resolve(specificAccountAverageTransactionExpensesData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
  /*
    specific account Avg. transaction expenses for past 3 months
    API : Get User Avg Transaction Expense
  */
  this.specificAccountAverageTransactionExpenses = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();

      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/histogram',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken,
               'fromDate' : Date.parse('t - 3m').toString('yyyy-MM-d')+"T00:00:00.000+0530", 
               'toDate' : (new Date(date.getFullYear(), date.getMonth(), -1)).toString('yyyy-MM-dd')+"T00:00:00.000+0530"
            },
              params: {                    
                  accountId: '7278',
                  bankId: 'IBMGB'
                }
          }
          $http(req)
          .then(function(specificAccountAverageTransactionExpensesData) {
            console.log(specificAccountAverageTransactionExpensesData);   
            $ionicLoading.hide();         
            // function to retrive the response
            if (specificAccountAverageTransactionExpensesData.status == 200) {
              resolve(specificAccountAverageTransactionExpensesData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
  /*
    specific Avg. transaction expenses for this month
    API : Get User Avg Transaction Expense
  */
  this.specificAccountAverageTransactionForMonthExprenses = function(){
    return $q(function(resolve, reject){
      $ionicLoading.show();
      var date = new Date();
      var req = {
          url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/histogram',
            method:'GET',
            headers : {
               'Accept' : 'application/json',
               'Content-Type':'application/json', 
               'Authorization' : authorizationToken,
               'fromDate' : (new Date(date.getFullYear(), date.getMonth(), 1)).toString('yyyy-MM-dd')+"T00:00:00.000+0530", 
               'toDate' : (new Date(date.getFullYear(), date.getMonth() + 1, 0)).toString('yyyy-MM-dd')+"T00:00:00.000+0530"
            },
              params: {                    
                  accountId: '7278',
                  bankId: 'IBMGB'
                }
          }
          $http(req)
          .then(function(specificAccountAverageMonthTransactionExpensesData) {
            $ionicLoading.hide();
            console.log(specificAccountAverageMonthTransactionExpensesData);            
            // function to retrive the response
            if (specificAccountAverageMonthTransactionExpensesData.status == 200) {
              resolve(specificAccountAverageMonthTransactionExpensesData.data.response);
            } else {
              reject('Update Expertise Failed!');
            }
          },
          function(err) {
            reject(err);
          });
    });
  }
})


//get All Account details service
.service('getAllAccountsDetailsService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {
    
    //$http.defaults.headers.common.Authorization=authorizationToken;
      $http.defaults.headers.common.Authorization='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NzI5NDg5LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImEwNmQyYmY3LWNiMDgtNGY2ZS04NjJhLThmZmNlNTVhNWM3MSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.anIkVxZAWXlutyaMo_bL0IAi1jIO-bk2B6hZfe7OPYQ';

    //to fetch all acounts
    var accDeferred = $q.defer();
    this.getAllAccounts = function() {
      $ionicLoading.show(); 
      var allAccountDetails=[];
      var authorizationToken = '';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }
      $http.defaults.headers.common.Authorization=authorizationToken;      
      //alert('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts');
      $http.get('http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/iceman@gmail.com/accounts').then(function(resp){
          console.log('Success', resp); // JSON object
          //allAccountDetails=resp;
          accDeferred.resolve(resp);
          $ionicLoading.hide(); 
        }, function(err){
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Show all accounts: Alert',
            template:'Error occured while calling the API:'+err
          });
        });
        return accDeferred.promise;
    };


        //to fetch all payees acounts
    var payeeDeferred = $q.defer();
    this.getPayeeAccounts = function() {
      $ionicLoading.show(); 
      var allAccountDetails=[];
      $http.defaults.headers.common.Authorization='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NzI5NDg5LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImEwNmQyYmY3LWNiMDgtNGY2ZS04NjJhLThmZmNlNTVhNWM3MSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.anIkVxZAWXlutyaMo_bL0IAi1jIO-bk2B6hZfe7OPYQ';
      var authorizationToken = '';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        allAccountDetails='First authenticate and then make this call.';
      }
      //$http.defaults.headers.common.Authorization=authorizationToken;
      $http.defaults.headers.common.Authorization=authorizationToken;
      //alert('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts');
      $http.get('http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/iceman@gmail.com/IBMGB/7278/payees').then(function(resp){
          console.log('Success', resp); // JSON object
          //allAccountDetails=resp;
          payeeDeferred.resolve(resp);
          $ionicLoading.hide(); 
        }, function(err){
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Show all accounts: Alert',
            template:'Error occured while calling the API:'+err
          });
        });
        return payeeDeferred.promise;
    };


    var reminderDeferred = $q.defer();
    //service to generate the voucher
    this.getReminders = function() {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NzI5NDg5LCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImEwNmQyYmY3LWNiMDgtNGY2ZS04NjJhLThmZmNlNTVhNWM3MSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.anIkVxZAWXlutyaMo_bL0IAi1jIO-bk2B6hZfe7OPYQ';
      var oauthData = StorageServiceForToken.getAll();
      if(oauthData!=null && oauthData.length>0){
          authorizationToken = 'Bearer '+ oauthData[0].access_token;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'GET',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/tanmay.ambre@in.ibm.com/accounts',// (http://%27+constantService.server+%27:%27+constantService.port+constantService.baseURL+%27/reminder%27) ,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          voucherDetails=result;
          reminderDeferred.resolve(result);
          $ionicLoading.hide(); 
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error fetching get all accounts',
            template:'Error occured while calling the API:'+JSON.stringify(err)+"."
          });
       });
        return reminderDeferred.promise;
    };

})


//get All Insights service
.service('InsightsService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {   

    //to fetch all insights
    var insightsDeferred = $q.defer();
    this.getAllInsights = function() {
      $ionicLoading.show(); 
      var allAccountDetails=[];
      
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoidGFubWF5LmFtYnJlQGluLmlibS5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDU1NDcyMCwidXNlck5hbWUiOiJ0YW5tYXkuYW1icmVAaW4uaWJtLmNvbSIsInVzZXJJZCI6InRhbm1heS5hbWJyZUBpbi5pYm0uY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6Ijk5ZjIzYWE1LTE5MWMtNGI0Zi04NzcxLWQ3ZTY0Nzk1YzRhZSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.sFm3uBrD0bv_qb2dCFPgDwz24w5-LLAS2znzTmracr8';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }
      //$http.defaults.headers.common.Authorization=authorizationToken;
      $http.defaults.headers.common.Authorization=authorizationToken;

      //alert('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts');
      $http.get('http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/expenseInsightsForAgeGroup').then(function(resp){
          console.log('Success', resp); // JSON object
          //allAccountDetails=resp;
          insightsDeferred.resolve(resp);
          $ionicLoading.hide(); 
        }, function(err){
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Show all accounts: Alert',
            template:'Error occured while calling the API:'+err
          });
        });
        return insightsDeferred.promise;
    };
})


//get All Account details service
.service('remindersService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {  


    var deferred = $q.defer();
    //service to generate the voucher
    this.getAllReminders = function() {
      $ionicLoading.show(); 
      var voucherDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoidGFubWF5LmFtYnJlQGluLmlibS5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDU1NDcyMCwidXNlck5hbWUiOiJ0YW5tYXkuYW1icmVAaW4uaWJtLmNvbSIsInVzZXJJZCI6InRhbm1heS5hbWJyZUBpbi5pYm0uY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6Ijk5ZjIzYWE1LTE5MWMtNGI0Zi04NzcxLWQ3ZTY0Nzk1YzRhZSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.sFm3uBrD0bv_qb2dCFPgDwz24w5-LLAS2znzTmracr8';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        voucherDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'GET',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/reminder',// (http://%27+constantService.server+%27:%27+constantService.port+constantService.baseURL+%27/reminder%27) ,
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
            title: 'Error fetching get all accounts',
            template:'Error occured while calling the API:'+JSON.stringify(err)+"."
          });
       });
        return deferred.promise;
    };

})


.service('dummyService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) { 

var deferred = $q.defer();
    //service to generate the voucher
    this.subscribeUser = function(userId, subscriptionReqObj ) {
      $ionicLoading.show(); 
      var subscriptionDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoidGFubWF5LmFtYnJlQGluLmlibS5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDU1NDcyMCwidXNlck5hbWUiOiJ0YW5tYXkuYW1icmVAaW4uaWJtLmNvbSIsInVzZXJJZCI6InRhbm1heS5hbWJyZUBpbi5pYm0uY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6Ijk5ZjIzYWE1LTE5MWMtNGI0Zi04NzcxLWQ3ZTY0Nzk1YzRhZSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.sFm3uBrD0bv_qb2dCFPgDwz24w5-LLAS2znzTmracr8';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        subscriptionDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'PUT',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/'+userId+'/account/subscriptionRequest',
        data: subscriptionReqObj,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          subscriptionDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error fetching get all accounts',
            template:'Error occured while calling the API:'+JSON.stringify(err)+"."
          });
       });
        return deferred.promise;
    };
 })
//get All Account details service
.service('subscriptionService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {  


    var deferred = $q.defer();
    //service to generate the voucher
    this.subscribeUser = function(userId, subscriptionReqObj ) {
      $ionicLoading.show(); 
      var subscriptionDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoibmlzaGEuYmhhZ2RldkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDY1MDUzOCwidXNlck5hbWUiOiJuaXNoYS5iaGFnZGV2QGdtYWlsLmNvbSIsInVzZXJJZCI6Im5pc2hhLmJoYWdkZXZAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImJkZDcyNjY5LTAyNzgtNDI4My04MGFiLTk3YmQ1MDhiODMyMyIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.lgA3-lCTGfdi-aPdriGU7f8w24GxljkyrF0GBwYddZw';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        subscriptionDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'PUT',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/'+userId+'/account/subscriptionRequest',
        data: subscriptionReqObj,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          subscriptionDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error fetching get all accounts',
            template:'Error occured while calling the API:'+JSON.stringify(err)+". OAuthToken: "+oauthData
          });
       });
        return deferred.promise;
    };


    this.answerSubscriptionChallenge = function(userId, challengeObj) {

       $ionicLoading.show(); 
      var subscriptionDetails='';
      var authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoibmlzaGEuYmhhZ2RldkBnbWFpbC5jb20iLCJzY29wZSI6WyJyZWFkIl0sImV4cCI6MTQ3NDY1MDUzOCwidXNlck5hbWUiOiJuaXNoYS5iaGFnZGV2QGdtYWlsLmNvbSIsInVzZXJJZCI6Im5pc2hhLmJoYWdkZXZAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImJkZDcyNjY5LTAyNzgtNDI4My04MGFiLTk3YmQ1MDhiODMyMyIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.lgA3-lCTGfdi-aPdriGU7f8w24GxljkyrF0GBwYddZw';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        subscriptionDetails='First authenticate and then make this call.';
      }

      $http({
        method: 'PATCH',
        url: 'http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/'+userId+'/account/subscription/challenge',
        data: challengeObj,
        headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationToken
        }}).then(function(result) {
          console.log('Success', result); 
          subscriptionDetails=result;
          deferred.resolve(result);
          $ionicLoading.hide(); 
           console.log(result);
       }, function(err) {
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error fetching get all accounts',
            template:'Error occured while calling the API:'+JSON.stringify(err)+"."
          });
       });
        return deferred.promise;
      // body...
    }

})


//get All Insights service
.service('InsightsService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {   
    //to fetch all insights
    var insightsDeferred = $q.defer();
    this.getAllInsights = function() {
      $ionicLoading.show(); 
      var allAccountDetails=[];
      var authorizationToken = '';
      var oauthData = StorageServiceForToken.getAll();
     oauthData =constantService.token;
      if(oauthData!=null ){
          authorizationToken = 'Bearer '+ oauthData;
      }else{
        allAccountDetails='First authenticate and then make this call.';
      }
      //$http.defaults.headers.common.Authorization=authorizationToken;
      $http.defaults.headers.common.Authorization=authorizationToken;

      //alert('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts');
      $http.get('http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/expenseInsightsForAgeGroup').then(function(resp){
          console.log('Success', resp); // JSON object
          //allAccountDetails=resp;
          insightsDeferred.resolve(resp);
          $ionicLoading.hide(); 
        }, function(err){
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Error calling insights service: Alert',
            template:'Error occured while calling the API:'+JSON.stringify(err)
          });
        });
        return insightsDeferred.promise;
    };
})


//get All Goals service
.service('goalsService', function($state,$http,$q,$ionicLoading,constantService,StorageServiceForToken,$ionicPopup) {   

    //to fetch all insights
    var goalsDeferred = $q.defer();
    this.getLastTransactions = function(fromDate, toDate) {
      $ionicLoading.show(); 
      var allAccountDetails=[];
      var authorizationToken = 'Bearer '+constantService.token;
      var oauthData = StorageServiceForToken.getAll();
      if(oauthData!=null && oauthData.length>0){
          authorizationToken = 'Bearer '+ oauthData[0].access_token;
      }else{
        allAccountDetails='First authenticate and then make this call.';
      }
      $http.defaults.headers.common.Authorization=authorizationToken;
      //$http.defaults.headers.common.Authorization='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NzQ1MjAxLCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjA2NTMyZmU3LWViZTYtNDkyYy05NTUxLTYzOTI4NGIxODAwZSIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.Yw4AypCK-a9MF7fuk2BrkQqWDbsUfOK4mzINWGaaxik';
      $http.defaults.headers.common.fromDate = fromDate;
      $http.defaults.headers.common.toDate = toDate;
      //alert('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts');
      $http.get('http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/user/iceman@gmail.com/transactions/histogram').then(function(resp){
          console.log('Success', resp); // JSON object
          //allAccountDetails=resp;
          goalsDeferred.resolve(resp);
          $ionicLoading.hide(); 
        }, function(err){
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Show all transactions: Alert',
            template:'Error occured while calling the API:'+err
          });
        });
        return goalsDeferred.promise;
    };


    var goalsPromise = $q.defer();
    this.getAllGoals = function(){
      $ionicLoading.show(); 
      var allAccountDetails=[];
      var authorizationToken = 'Bearer '+constantService.token;
      var oauthData = StorageServiceForToken.getAll();
      if(oauthData!=null && oauthData.length>0){
          authorizationToken = 'Bearer '+ oauthData[0].access_token;
      }else{
        allAccountDetails='First authenticate and then make this call.';
      }
      $http.defaults.headers.common.Authorization=authorizationToken;
      //$http.defaults.headers.common.Authorization='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCIsInByb3ZpZGVyIjoiQmlnT2F1dGgyU2VydmVyIiwidXNlcl9uYW1lIjoiaWNlbWFuQGdtYWlsLmNvbSIsInNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDc0NjQ2MjcxLCJ1c2VyTmFtZSI6ImljZW1hbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJpY2VtYW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImUyOGVhMTg0LWI3ZjAtNGRkYi1iYzdjLTY5MmRmZDFkNWYyMCIsImNsaWVudF9pZCI6IjRhNGIwMjgxLTQ5YjEtNDUzMy1iM2FjLWVlZTExZjFmNmJkOCJ9.nt3y5-FaLiKXyiRHcHs_Wq8am0W_gV5VIY_ycXmjAUI';

      //alert('http://'+constantService.server+':'+constantService.port+'/psd2api/my/banks/BARCGB/accounts');
      $http.get('http://'+constantService.server+':'+constantService.port+constantService.baseURL+'/goals').then(function(resp){
          console.log('Success', resp); // JSON object
          //allAccountDetails=resp;
          goalsPromise.resolve(resp);
          $ionicLoading.hide(); 
        }, function(err){
          console.error('ERR', err);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Show all transactions: Alert',
            template:'Error occured while calling the API:'+err
          });
        });
        return goalsPromise.promise;
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
                  'authorization': 'Basic ZTg0MmE2OTMtZDQ2NS00NDczLWFlMDItY2I5ZjVhYjBmZTM1OiQyYSQxMCQwd2czdWpnYW5JQ2xPaTgvalJYTm5lSGxaTUtCT1luYUkxNEJsTXpEQTBEeTRnUmZIRS9OYQ=='
              }
            }
        });
    return data;
})



// For to store isSetupInformation
.factory ('StorageServiceForIsSetup', function ($localStorage, $window) {
    $localStorage = $localStorage.$default({
      isSetupComplete: []
    });

    var _getAll = function () {
      return $localStorage.isSetupComplete;
    };

    var _add = function (thing) {
      $localStorage.isSetupComplete.push(thing);
    };

    var _remove = function (thing) {
      $localStorage.isSetupComplete.splice($localStorage.isSetupComplete.indexOf(thing), 1);
    };

    var _removeAll = function (thing) {
      //do nothing
      $window.localStorage.clear();
    };

    return {
        getAll: _getAll,
        add: _add,
        remove: _remove, 
        removeAll: _removeAll
      };
})


// factory for profile
.factory ('StorageService', function ($localStorage, $window) {
    $localStorage = $localStorage.$default({
      profileInformation: []
    });

    var _getAll = function () {
      return $localStorage.profileInformation;
    };

    var _add = function (thing) {
      $localStorage.profileInformation.push(thing);
    };

    var _remove = function (thing) {
      $localStorage.profileInformation.splice($localStorage.profileInformation.indexOf(thing), 1);
    };

    var _removeAll = function (thing) {
      //do nothing
      $window.localStorage.clear();
    };

    return {
        getAll: _getAll,
        add: _add,
        remove: _remove, 
        removeAll: _removeAll
      };
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