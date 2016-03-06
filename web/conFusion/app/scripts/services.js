'use strict';

angular.module('confusionApp')
          .constant("baseURL","http://localhost:3000/")
          .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

              this.getDishes = function(){
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
              };
              this.getPromotion = function () {
                    return $resource(baseURL+"promotions", null, {'update':{method:'PUT' }});
              };
            }])


        　.service('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

              this.getLeaders = function(){
                    return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
              };
          }])

          .service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

              this.getFeedback = function(){
                    return $resource(baseURL+"feedbacks",null,  {'update':{method:'PUT' }});
              };
          }])

          ;
