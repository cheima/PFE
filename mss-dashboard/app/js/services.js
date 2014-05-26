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
   
    return($resource(host+'/mss-dashboard-web/webresources/generic/alltraffic/:year/:month/:day',{year: '@year', month: '@month', day: '@day'},{
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
    return($resource(host+'/mss-dashboard-web/webresources/generic/allbsu/:year/:month/:day',{year: '@year', month: '@month', day: '@day'},{
      query:{method:'GET',isArray:false}  
    }));
});
//allmodulesforcpu
trafficServices.factory('allmodules',function($resource){
   // isArray:false because it is an oject with two attributes (sigu which is an array and times)
    return($resource(host+'/mss-dashboard-web/webresources/generic/mss/:mss/cart/:type',{mss:"@mss", type: '@type'},{
      query:{method:'GET',isArray:true}  
    }));
});

//trafficServices.factory('allcpu',function($resource){
//    return($resource(host+'/mss-dashboard-web/webresources/generic/allcpu/:type1/:year/:month/:day',{type1: '@type1', year: '@year', month: '@month', day: '@day'},{
//      query:{method:'GET',isArray:false}  
//    }));
//});
//
//trafficServices.factory('allcpu11',function($resource){
//    return($resource(host+'/mss-dashboard-web/webresources/generic/allcpu11/:list11/:year/:month/:day',
//    {list11: '@list11', year: '@year', month: '@month', day: '@day'
//    },{
//      query:{method:'GET',isArray:false}  
//    }));
//});

trafficServices.factory('allcpu12',function($resource){
    return($resource(host+'/mss-dashboard-web/webresources/generic/getnames/:list12',{list12: '@list12'},{
      query:{method:'GET',isArray:false}  
    }));
    
    //getall names by type
   // mss-dashboard-web/webresources/generic/getnames
});
//calendrier ,choisir les cpus from the list(one & range)
trafficServices.factory('detailsService',function($resource){
    return($resource(host+'/mss-dashboard-web/webresources/mss/:mss/:indi/:list11/:from/:to',{mss: '@mss', indi: '@indi', list11: '@list11', from: '@from', to: '@to'},{
      query:{method:'GET',isArray:false}  
    }));
});
//login
trafficServices.factory('login',function($resource){
    return($resource(host+'/mss-dashboard-web/webresources/rest/login/:username',{username: '@username'},{
      query:{method:'GET',isArray:true}  
    }));
});
//mss
trafficServices.factory('mss',function($resource){
    return($resource(host+'/mss-dashboard-web/webresources/rest/mss',{},{
      query:{method:'GET',isArray:true}  
    }));
});