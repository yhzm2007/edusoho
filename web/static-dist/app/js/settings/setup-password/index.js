!function(i){function e(e){for(var r,t,n=e[0],o=e[1],a=e[2],u=0,s=[];u<n.length;u++)t=n[u],Object.prototype.hasOwnProperty.call(c,t)&&c[t]&&s.push(c[t][0]),c[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(i[r]=o[r]);for(p&&p(e);s.length;)s.shift()();return f.push.apply(f,a||[]),l()}function l(){for(var e,r=0;r<f.length;r++){for(var t=f[r],n=!0,o=1;o<t.length;o++){var a=t[o];0!==c[a]&&(n=!1)}n&&(f.splice(r--,1),e=u(u.s=t[0]))}return e}var t={},c={282:0},f=[];function u(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return i[e].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.m=i,u.c=t,u.d=function(e,r,t){u.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(r,e){if(1&e&&(r=u(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)u.d(t,n,function(e){return r[e]}.bind(null,n));return t},u.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(r,"a",r),r},u.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},u.p="/static-dist/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var p=n;f.push([728,0]),l()}({17:function(e,r){e.exports=jQuery},728:function(e,r,t){"use strict";t.r(r);var n=t(4),o=$("#setup-password-form");o.validate({ajax:!0,rules:{currentDom:"#form-submit","form[newPassword]":{required:!0,minlength:5,maxlength:20},"form[confirmPassword]":{required:!0,equalTo:"#form_newPassword"}},submitSuccess:function(e){return Object(n.a)("success",Translator.trans(e.message)),"modal"==o.data("targeType")?$("#modal").load(o.data("goto")).modal("show"):window.location.href=e.data.targetPath,!1},submitError:function(e){Object(n.a)("danger",Translator.trans(e.responseJSON.message))}})}});