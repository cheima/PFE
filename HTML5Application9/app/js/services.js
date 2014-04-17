'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.


angular.module('myApp.services', []).
  value('version', '0.1');

/*var trafficServices =angular.module('myApp.services', ['ngResource']);
trafficServices.factory('trafficforsigu',function($resource){
    return($resource('http://localhost:9999/trafficIN/webresources/generic/traffic',{},{
      query:{method:'GET',isArray:true}  
    }));
});*/