'use strict';

var trafficServices =angular.module('myApp.services', ['ngResource']);
var host = 'http://localhost:9999';

trafficServices.factory('trafficforsigu',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/:siguId',{siguId : '@siguId'},{
      query:{method:'GET',isArray:true}  
    }));
});

trafficServices.factory('getsigunames',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/getsiguname',{},{
      query:{method:'GET',isArray:true}  
    }));
});


trafficServices.factory('getalltraffic',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/traffic',{},{
      query:{method:'GET',isArray:true}  
    }));
});

//Display the graph of all sigus
trafficServices.factory('allgraphs',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/alltraffic',{},{
      query:{method:'GET',isArray:false}  
    }));
});

trafficServices.factory('siguranged',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/alltraffic/:list',{list: '@list'},{
      query:{method:'GET',isArray:false}  
    }));
});
