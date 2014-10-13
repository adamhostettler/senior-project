
app = angular.module('app', ['firebase']);

app.controller('AuthCtrl', [
  '$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
    var ref = new Firebase('https://fiery-fire-7623.firebaseio.com/');
    $rootScope.auth = $firebaseAuth(ref);

    $scope.signIn = function () {
      $rootScope.auth.$login('password', {
        email: $scope.email,
        password: $scope.password
      }).then(function(user) {
        var firebaseemail = $scope.email.split("@")[0];

        document.cookie= "storeid="+escape(firebaseemail);

        //window.location = "https://fiery-fire-7623.firebaseio.com/" + firebaseemail;
        $rootScope.alert.message = '';
        window.location = "cms.html";

      }, function(error) {
        if (error = 'INVALID_EMAIL') {
          console.log('email invalid or not signed up — trying to sign you up!');
		      $rootScope.alert.class = 'danger';
          $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        } else if (error = 'INVALID_PASSWORD') {
          console.log('wrong password!');
        } else {
          console.log(error);
        }
      });
    }

    $scope.signUp = function() {
      $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
        var firebaseemail = $scope.email.split("@")[0];
		
		if (firebaseemail.indexOf(".") > -1){
			var newfirebaseemail = firebaseemail.split('.').join('');
			document.cookie= "storeid="+escape(newfirebaseemail);
		}
		else{
			document.cookie= "storeid="+escape(firebaseemail);
			
		}
		
        window.location = "cms.html";
        if (!error) {
          $rootScope.alert.message = '';

        } else {
          $rootScope.alert.class = 'danger';
          $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        }
      });
    }
  }
]);

app.controller('AlertCtrl', [
  '$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.alert = {};
  }
]);
