//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
     return (arr[2]);
    else
     return null;
   }
   
   //设置cookie,增加到vue实例方便全局调用
   export function setCookie (name, value, seconds) {
    seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
      var expires = "";
      if (seconds != 0 ) {      //设置cookie生存时间
     var date = new Date();
     date.setTime(date.getTime()+(seconds*1000*60*60*24));//天为单位
     expires = "; expires="+date.toGMTString();
     }
     document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
   };
   
   //删除cookie
   export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
   };
   //导入方法:import {getCookie,setCookie,delCookie} from "../../api/cookie.js";