angular.module('todoService', [])
	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}])
    .factory('CustomerCollection', ['$http', function ($http) {
    	    return {
    	        get: function () {
    	            return $http.get('/api/customercollection');
    	        },
    	        create: function (customerdata) {
    	            return $http.post('/api/customercollection', customerdata);
    	        },
    	        update: function (customerdata) {
    	            return $http.post('/api/update/customercollection/' + customerdata._id, customerdata);
    	        },
    	        delete: function (id) {
    	            return $http.delete('/api/customercollection/' + id);
    	        }
    	    }
    	}])
    .factory('SlambookCollection', ['$http', function ($http) {
            return {
                get: function () {
                    return $http.get('/api/customercollection');
                },
                sendMail: function (maildata) {
                    return $http.post('test', maildata);
                },
                createSlam: function (slamdata) {
                    return $http.post('/api/slambookollection', slamdata);
                },
                 getSlam: function () {
                    return $http.get('/api/slambookollection');
                },
                update: function (customerdata) {
                    return $http.post('/api/update/customercollection/' + customerdata._id, customerdata);
                },
                delete: function (id) {
                    return $http.delete('/api/customercollection/' + id);
                }
            }
        }])
    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])
    .filter('startFrom', function() {
        return function(input, start) {
            if(input && input.length) {
                start = +start; //parse to int
                return input.slice(start);
            }
            return [];
        }
    });


	