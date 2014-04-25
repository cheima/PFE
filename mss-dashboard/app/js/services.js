'use strict';

var trafficServices =angular.module('myApp.services', ['ngResource']);

trafficServices.factory('trafficforsigu',function($resource){
   
    return($resource('http://localhost:9999/mss-dashboard-web/webresources/generic/:siguId',{siguId : '@siguId'},{
      query:{method:'GET',isArray:true}  
    }));
});

trafficServices.factory('getsigunames',function($resource){
   
    return($resource('http://localhost:9999/mss-dashboard-web/webresources/generic/getsiguname',{},{
      query:{method:'GET',isArray:true}  
    }));
});


trafficServices.factory('getalltraffic',function($resource){
   
    return($resource('http://localhost:9999/mss-dashboard-web/webresources/generic/traffic',{},{
      query:{method:'GET',isArray:true}  
    }));
});


trafficServices.factory('courbes',function($resource){
   
    return($resource('http://localhost:9999/mss-dashboard-web/webresources/generic/ch',{},{
      query:{method:'GET',isArray:true}  
    }));
});
