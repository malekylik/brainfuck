!function(e){function t(t){for(var r,i,a=t[0],f=t[1],c=t[2],s=0,p=[];s<a.length;s++)i=a[s],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in f)Object.prototype.hasOwnProperty.call(f,r)&&(e[r]=f[r]);for(l&&l(t);p.length;)p.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var f=n[a];0!==o[f]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={0:0},u=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var a=("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")()).webpackJsonp=("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")()).webpackJsonp||[],f=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var l=f;u.push([150,1]),n()}({150:function(e,t,n){"use strict";n.r(t);n(151),n(376);function r(e,t,n,r,o,u,i){try{var a=e[u](i),f=a.value}catch(e){return void n(e)}a.done?t(f):Promise.resolve(f).then(r,o)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(o,u){var i=e.apply(t,n);function a(e){r(i,o,u,a,f,"next",e)}function f(e){r(i,o,u,a,f,"throw",e)}a(void 0)}))}}var u=null,i=document.getElementById("textarea"),a=document.getElementById("output"),f=document.getElementById("button");function c(){return(c=o(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("./worker.js");case 2:return e.next=4,e.sent.blob();case 4:t=e.sent,n=URL.createObjectURL(t),(u=new Worker(n)).addEventListener("message",(function(e){var t=e.data;"out"===t.type&&(a.value+=t.value),t.type})),f.addEventListener("click",(function(){u.postMessage({type:"start",src:i.value})}));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){c.apply(this,arguments)}()}});