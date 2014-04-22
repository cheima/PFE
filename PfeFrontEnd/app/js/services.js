'use strict';

var trafficServices =angular.module('myApp.services', ['ngResource']);

trafficServices.factory('trafficforsigu',function($resource){
   
    return($resource('http://localhost:9999/upa-test-web/webresources/generic/:siguId',{siguId : '@siguId' },{
      query:{method:'GET',isArray:true}  
    }));
});

trafficServices.factory('getsigunames',function($resource){
   
    return($resource('http://localhost:9999/upa-test-web/webresources/generic/getsiguname',{},{
      query:{method:'GET',isArray:true}  
    }));
});