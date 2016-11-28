/**
 * Created by aayang on 10/26/16.
 */
'use strict';

angular.module('planner').controller('PlannerController', ['TravelPlan', '$scope', 'events', '$stateParams', '$location', 'Authentication',
    function (TravelPlan, $scope, events, $stateParams, $location, Authentication) {
        $scope.authentication = Authentication;

        $scope.isNavCollapsed = true;
        $scope.isCollapsed = true;
        $scope.isCollapsedHorizontal = true;

        $scope.editing = false;
        /*
        events.success(function(data){
          $scope.cityEvents = data;
        };*/

        $scope.travelPlans = TravelPlan.query();
        console.log(TravelPlan.query());

        // Create new Article
        $scope.create = function () {
            // Create new Article object
            var travelPlan = new TravelPlan({
                title: $scope.travelPlan.title,
                description: $scope.travelPlan.description
            });

            console.log(travelPlan);
            // Redirect after save
            travelPlan.$save(function (response) {

                // Clear form fields
                $scope.title = '';
                $scope.content = '';
                $scope.travelPlans = TravelPlan.query();

                console.log("successful");
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
                console.log("unsuccessful");
            });
        };

        // Update existing Article
        $scope.update = function (travelPlan) {
            console.log(travelPlan);

            travelPlan.$update(function () {
                console.log('successful update');

            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.deletePlan = function(travelPlan){
            if (travelPlan) {
                travelPlan.$remove();

                for (var i in $scope.travelPlans) {
                    if ($scope.travelPlans[i] === travelPlan) {
                        $scope.travelPlans.splice(i, 1);
                    }
                }
            } else {
                $scope.travelPlans.$remove(function () {
                    $location.path('travelPlan');
                });
            }
        };

        $scope.editPlan = function(plan){
            angular.forEach($scope.travelPlans, function (currentPlan) {
                currentPlan.editing = currentPlan === plan && !currentPlan.editing;
            });
        };

        $scope.formatDate = function(date){
            return 1;
        };

 
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-88114900-1', 'auto');
  ga('send', 'pageview');



  }
]);

function populateEvents($scope,$http) {
    var url = "/planner/client/event-data.json";
 
    $http.get(url).success( function(response) {
       $scope.events = response;
    });
}

/*global angular */
// (function (ng) {
//   'use strict';

//   var app = ng.module('ngLoadScript', []);

//   app.directive('script', function() {
//     return {
//       restrict: 'E',
//       scope: false,
//       link: function(scope, elem, attr) {
//         if (attr.type === 'text/javascript-lazy') {
//           var code = elem.text();
//           var f = new Function(code);
//           f();
//         }
//       }
//     };
//   });

// }(angular));
