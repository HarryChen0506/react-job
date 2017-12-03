//整理api

import http from './http.js';
function formatParams(data) {
    var arr = [];
    for (var key in data) {
         if(!!data[key] || data[key]===0||data[key]===false){
            if(Array.isArray(data[key])){
                for(var i=0; i<data[key].length; i++){
                    arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key][i]))
                }
            }else{
               arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            }
        }       
    }
    arr.push("time=" + new Date().getTime());
    return arr.join("&");
}
function getUrl(url, params){   
    var prefix = "";
    if(url.indexOf("?")>0){
        prefix = "&";
    }else{
        prefix = "?";
    }
    url = url+ prefix + formatParams(params);
    return url;
} 


const demo = {
    get: function(url,params){
        url = getUrl(url,params)
        return http.httpGet(url)
    },
    post: function(url, data){
         url = getUrl(url)
        return http.httpPost(url,data)
    },
    postForm: function(url,data){
        return http.httpPostForm(url,data)
    }
}
const user = {
    info: function(params){
        const api = '/api/user'
        const url = getUrl(api, params)
        return http.httpGet(url)
    },
    register: function(data){
        const api = '/api/user/register';
        const url = getUrl(api);
        return http.httpPost(url,data)
    },
    login: function(data){
        const api = '/api/user/login';
        const url = getUrl(api);
        return http.httpPost(url,data)
    }
}

export default  {
    demo,
    user
}
