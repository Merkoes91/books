/*global angular, BookListCtrl, BookDetailCtrl */


/**
 * @see http://docs.angularjs.org/guide/concepts
 */

var myApp = angular.module('myApp', ['myApp.services', 'ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
    // Get all books
        $routeProvider.when('/about', {
            templateUrl: './partials/about.html',
            controller: aboutMeCTRL
        });

        $routeProvider.when('/books', {
            templateUrl: './partials/book-list.html',
            controller: BookListCtrl
        });

     // Operations on 1 book
        $routeProvider.when('/books/:id', {
            templateUrl: './partials/book-detail.html',
            controller: BookDetailCtrl
        });

        // otherwise
        $routeProvider.otherwise({
            redirectTo: '/books'
        });

    }]);

