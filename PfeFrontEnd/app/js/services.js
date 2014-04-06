'use strict';

var trafficServices =angular.module('myApp.services', ['ngResource']);
trafficServices.factory('trafficforsigu',function($resource){
    return($resource('http://localhost:9999/trafficIN/webresources/pfe.cheima.trafficin.trafficforsigu',{},{
      query:{method:'GET',isArray:true}  
    }));
});