angular.module('DashboardCtrl', [])
.controller('DashboardController', ['$scope', 'Todos', '$http', 'filterFilter', '$filter', 'ngTableParams', 'CustomerCollection', function ($scope, Todos, $http, filterFilter, $filter, ngTableParams, CustomerCollection) {
    $scope.formData = {};
    $scope.loading = true;


///////////////////////////////////
///Hello this is  a power block  //
///////////////////////////////////
/**
 * [CustomerCollectionData description]@   
 * @author 
 * @class 
 * @function
 * @var {[type]} [description]
 * @description [description]
 * @deprecated [description]
 * 
 */

    $scope.CustomerCollectionData = function () {
        CustomerCollection.get()
     .success(function (data) {
         $scope.todos = data;
         $scope.loading = false;
         $scope.entryLimit = 10;
         $scope.currentPage = 1; //current page
         $scope.maxSize = 5; //pagination max size
         $scope.noOfPages = Math.ceil($scope.todos.length / $scope.entryLimit);
         $scope.$watch('search', function (term) {
             // Create $scope.filtered and then calculat $scope.noOfPages, no racing!
             $scope.todoFiltered = filterFilter($scope.todos, term);
             $scope.noOfPages = Math.ceil($scope.todoFiltered.length / $scope.entryLimit);
         });
     });
    }
    $scope.CustomerCollectionData();


    $scope.customerData = {};
    $scope.createCustomerEntry = function () {
        if ($scope.customerData) {
            $scope.loading = true;
            CustomerCollection.create($scope.customerData)
                .success(function (data) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data; // assign our new list of todos
                    $('#myModal').modal('toggle')
                    $scope.CustomerCollectionData();
                });
        }
    };

    //delete customer entry
    $scope.deleteCustomerData = function (id) {
        $scope.loading = true;
        CustomerCollection.delete(id)
            // if successful creation, call our get function to get all the new todos
            .success(function (data) {
                $scope.loading = false;
                $scope.todos = data; // assign our new list of todos
                $scope.CustomerCollectionData();
            });
    };

    $scope.updateCustomerData = function () {
        $scope.loading = true;
        CustomerCollection.update($scope.customerData)
            // if successful creation, call our get function to get all the new todos
            .success(function (data) {
                $scope.loading = false;
                $scope.todos = data; // assign our new list of todos
                $scope.CustomerCollectionData();
            });
    };


     /*minor functions*/

    $scope.clearCustomerData = function () {
        $scope.customerData = {};
    }

    $scope.editCustomerEntry = function (data) {
        $('#myModal').modal('toggle');
        $scope.customerData.name = data.name;
        $scope.customerData.phone = data.phone;
        $scope.customerData.mobile = data.mobile;
        $scope.customerData.email = data.email;
        $scope.customerData.dob = data.dob;
        $scope.customerData.address = data.address;
        $scope.customerData._id = data._id;
    }

    $scope.insertCustomEntry = function () {
        $scope.customerData = {};
        $('#myModal').modal('toggle');
    }
}]);