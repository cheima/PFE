'use strict';

var trafficServices =angular.module('myApp.services', ['ngResource']);

trafficServices.factory('trafficforsigu',function($resource){
   
    return($resource('http://localhost:9999/upa-test-web/webresources/generic/:siguName',{siguName : '@siguName' },{
      query:{method:'GET',isArray:true}  
    }));
});