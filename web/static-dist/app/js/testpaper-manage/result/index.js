!function(r){var a={};function n(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=r,n.c=a,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/static-dist/",n(n.s=699)}({699:function(e,t){var r=echarts.init(document.getElementById("line-data")),a=$.parseJSON($("#data").val());r.setOption({color:["#0E4D93","#687F92"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{bottom:"5%",containLabel:!0},xAxis:[{type:"category",name:Translator.trans("testpaper_manage.result_graph.score_distribution"),nameLocation:"middle",nameGap:25,data:a.xScore,axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value",name:Translator.trans("testpaper_manage.result_graph.person_num"),minInterval:1}],series:[{name:Translator.trans("testpaper_manage.result_graph.first_score_num"),type:"bar",data:a.yFirstNum},{name:Translator.trans("testpaper_manage.result_graph.max_score_num"),type:"bar",data:a.yMaxNum}]})}});