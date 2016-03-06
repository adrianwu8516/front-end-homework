'use strict';

angular.module('confusionApp')

      .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
              $scope.tab = 1;
              $scope.filtText = "";
              $scope.showDetails = false;
              $scope.showMenu = true;
              $scope.message = "Loading...";

              $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

              $scope.select = function(setTab) {
                  $scope.tab = setTab;
                  if (setTab === 2) {
                      $scope.filtText = "appetizer";
                  }
                  else if (setTab === 3) {
                      $scope.filtText = "mains";
                  }
                  else if (setTab === 4) {
                      $scope.filtText = "dessert";
                  }
                  else {
                      $scope.filtText = "";
                  }
              };
              $scope.isSelected = function (checkTab) {
                  return ($scope.tab === checkTab);
              };
              $scope.toggleDetails = function() {
                  $scope.showDetails = !$scope.showDetails;
              };
          }])

      .controller('ContactController', ['$scope', function($scope) {

              $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                 agree:false, email:"" };
              var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

              $scope.channels = channels;
              $scope.invalidChannelSelection = false;
          }])

      .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

              $scope.sendFeedback = function() {
                      console.log($scope.feedback);
                      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                              $scope.invalidChannelSelection = true;
                              console.log('incorrect');
                      }else {
                              $scope.feedbacks = feedbackFactory.getFeedback().query(
                                  function(response) {
                                      $scope.feedbacks = response;
                                      console.log('A correct');
                                      console.log($scope.feedbacks);
                                  },
                                  function(response) {
                                      console.log('incorrect');
                                  });
                              $scope.feedbacks.push($scope.feedback);
                              console.log('B correct');
                              console.log($scope.feedbacks);
                              feedbackFactory.getFeedback().update($scope.feedbacks, $scope.feedbacks);
                              console.log('C correct');
                              console.log($scope.feedbacks);
                              $scope.invalidChannelSelection = false;
                              $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                         agree:false, email:"" };
                              $scope.feedback.mychannel="";
                              $scope.feedbackForm.$setPristine();
                  }
              };

          }])
      .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
              $scope.dish = {};
              $scope.showDish = true;
              $scope.message="Loading ...";

              $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                  .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                  );

              $scope.star = function(rating){
                rating = Number(rating);
                if(rating===0)
                  return("");
                else if(rating===1)
                  return("★");
                else if(rating===2)
                  return("★★");
                else if(rating===3)
                  return("★★★");
                else if(rating===4)
                  return("★★★★");
                else
                  return("★★★★★")
              }
          }])

      .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
              //Step 1: Create a JavaScript object to hold the comment from the form
              $scope.comment = {rating:"5", comment:"", author:"", date:""};

              $scope.submitComment = function () {
                  //Step 2: This is how you record the date
                  $scope.comment.date = new Date().toISOString();
                  // Step 3: Push your comment into the dish's comment array
                  $scope.dish.comments.push($scope.comment);
                  menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                  console.log($scope.dish);
                  //Step 4: reset your form to pristine
                  $scope.commentForm.name.$setPristine()
                  $scope.commentForm.feedback.$setPristine()
                  //Step 5: reset your JavaScript object that holds your comment
                  $scope.comment = {rating:"5", comment:"", author:"", date:""};
              }

          }])

      // implement the IndexController and About Controller here


      .controller('AboutController', ['$scope','corporateFactory', function($scope, corporateFactory) {
              $scope.showLeaders = false;
              $scope.message="Loading ...";
              $scope.leaders = corporateFactory.getLeaders().query(
                        function(response) {
                            $scope.leaders = response;
                            $scope.showLeaders = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        });
          }])

      .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
              $scope.showDish = false;
              $scope.showPromotions = false;
              $scope.showExecutiveChef = false;
              $scope.message="Loading ...";

              $scope.dish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );

              $scope.promotions = menuFactory.getPromotion().query(
                        function(response) {
                            $scope.promotions = response;
                            $scope.showPromotions = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        });

              $scope.executiveChef = corporateFactory.getLeaders().get({id:3})
                        .$promise.then(
                            function(response){
                                $scope.executiveChef = response;
                                $scope.showExecutiveChef = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
          }])
