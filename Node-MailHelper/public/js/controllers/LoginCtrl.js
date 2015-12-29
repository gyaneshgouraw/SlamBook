angular.module('LoginModuleCtrl', [])
	.controller('LoginController', ['$scope', '$stateParams', '$route', '$routeParams', 'filterFilter', function ($scope, $stateParams, $route, $routeParams, filterFilter) {

	    if ($route)
	        console.log("refrencecode", $route)
	    startApp();
	    var auth2 = {};
	    var helper = (function () {
	        return {
	            onSignInCallback: function (authResult) {
	                if (authResult.isSignedIn.get()) {
	                    $('#authOps').show('slow');
	                    $('#gConnect').hide();
	                    helper.profile();
	                    helper.people();
	                    $(".login").addClass("login-show");
	                } else if (authResult['error'] ||
                        authResult.currentUser.get().getAuthResponse() == null) {
	                    // There was an error, which means the user is not signed in.
	                    // As an example, you can handle by writing to the console:
	                    console.log('There was an error: ' + authResult['error']);
	                    $('#authResult').append('Logged out');
	                    $('#authOps').hide('slow');
	                    $('#gConnect').show();
	                }
	                console.log('authResult', authResult);
	            },


	            disconnect: function () {
	                // Revoke the access token.
	                auth2.disconnect();

	            },

	            people: function () {
	                gapi.client.plus.people.list({
	                    'userId': 'me',
	                    'collection': 'visible'
	                }).then(function (res) {
	                    console.log("people", res);
	                    //$scope.people = res.result;
	                    //console.log("Peopkle", $scope.people)
	                    $scope.renderFriends(res.result);
	                    $scope.$apply();

	                });
	            },
	            profile: function () {
	                gapi.client.plus.people.get({
	                    'userId': 'me'
	                }).then(function (res) {
	                    var profile = res.result;
	                    console.log(profile);
	                    $('#profile').empty();
	                    $('#profile').append(
                            $('<p><img src=\"' + profile.image.url + '\"></p>'));
	                    $('#profile').append(
                            $('<p>Hello ' + profile.displayName + '!<br />Tagline: ' +
                            profile.tagline + '<br />About: ' + profile.aboutMe + '</p>'));
	                    $scope.username = profile.displayName;

	                    $scope.$apply(function () {
	                        $scope.username = profile.displayName;
	                    });
	                    console.log("my user name", $scope.username);

	                    if (profile.emails) {
	                        $('#profile').append('<br/>Emails: ');
	                        for (var i = 0; i < profile.emails.length; i++) {
	                            $('#profile').append(profile.emails[i].value).append(' ');
	                        }
	                        $('#profile').append('<br/>');
	                    }
	                    if (profile.cover && profile.coverPhoto) {
	                        $('#profile').append(
                                $('<p><img src=\"' + profile.cover.coverPhoto.url + '\"></p>'));
	                    }
	                }, function (err) {
	                    var error = err.result;
	                    $('#profile').empty();
	                    $('#profile').append(error.message);
	                });
	            }
	        };
	    })();

	    /**
         * jQuery initialization
         */
	    $(document).ready(function () {
	        $('#disconnect').click(helper.disconnect);
	        $('#loaderror').hide();
	        if ($('meta')[0].content == 'YOUR_CLIENT_ID') {
	            alert('This sample requires your OAuth credentials (client ID) ' +
                    'from the Google APIs console:\n' +
                    '    https://code.google.com/apis/console/#:access\n\n' +
                    'Find and replace YOUR_CLIENT_ID with your client ID.'
                );
	        }
	    });

	    /**
         * Handler for when the sign-in state changes.
         *
         * @param {boolean} isSignedIn The new signed in state.
         */
	    var updateSignIn = function () {
	        console.log('update sign in state');
	        if (auth2.isSignedIn.get()) {
	            console.log('signed in');
	            helper.onSignInCallback(gapi.auth2.getAuthInstance());
	        } else {
	            console.log('signed out');
	            helper.onSignInCallback(gapi.auth2.getAuthInstance());
	        }
	    }

	    $scope.Logout = function () {
	        auth2.disconnect();
	        window.location.href = '/';
	    }

	    /**
         * This method sets up the sign-in listener after the client library loads.
         */
	    function startApp() {
	        gapi.load('auth2', function () {
	            gapi.client.load('plus', 'v1').then(function () {
	                gapi.signin2.render('signin-button', {
	                    scope: 'https://www.googleapis.com/auth/plus.login',
	                    fetch_basic_profile: false
	                });
	                gapi.auth2.init({
	                    fetch_basic_profile: false,
	                    scope: 'https://www.googleapis.com/auth/plus.login'
	                }).then(
                          function () {
                              console.log('init');
                              auth2 = gapi.auth2.getAuthInstance();
                              auth2.isSignedIn.listen(updateSignIn);
                              auth2.then(updateSignIn());
                          });
	            });
	        });
	    }

	    $scope.renderFriends = function (data) {
	        $scope.people = data.items;
	        $scope.loading = false;
	        $scope.entryLimit = 5;
	        $scope.currentPage = 1; //current page
	        $scope.maxSize = 5; //pagination max size
	        $scope.noOfPages = Math.ceil($scope.people.length / $scope.entryLimit);
	        $scope.$watch('search', function (term) {
	            // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
	            $scope.peopleFiltered = filterFilter($scope.people, term);
	            $scope.noOfPages = Math.ceil($scope.peopleFiltered.length / $scope.entryLimit);
	        });

	    }
/** [openMailmodal This contains description for mail to be sent]
*@var {[type]} [description]
 */
	    $scope.openMailmodal = function (data) {
	        $('#myMailModal').modal('toggle');
	    }

	}]);