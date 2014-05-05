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

trafficServices.factory('getbsunames',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/getbsuname',{},{
      query:{method:'GET',isArray:true}  
    }));
});


trafficServices.factory('display',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/display',{},{
      query:{method:'GET',isArray:true}  
    }));
});

trafficServices.factory('toptraffic',function($resource){
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/toptraffic',{},{
      query:{method:'GET',isArray:true}  
    }));
});

trafficServices.factory('allbsu',function($resource){
   // isArray:false because it is an oject with two attributes (sigu which is an array and times)
    return($resource(host+'/mss-dashboard-web/webresources/generic/allbsu',{},{
      query:{method:'GET',isArray:false}  
    }));
});