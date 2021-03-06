/*
    - By Yoann Charbonnier
    - CHB corporation
    - Transalte your page easy and rapidly

    - Version - Beta
    - Translate() --> To launch the translation
*/
var key = ""; //YOUR KEY




const auto_url=function(u){try{let url=new window.URL(u);let s=Boolean(url);return s}
catch(e){return!1}}
var auto_ext=["sncf","org","com","us","fr","xyz","sony","sexy","eus","gift","info","st","int","net","pro","post","wiki","onl","cat"];class BreakRequest{constructor(url){this.type=null;this.method='GET';this.request=!1;this.url=url;this.loop=!0;this.connected=!1;this.error=!1;this.proto1=new XMLHttpRequest();this.proto2=null;this.proto3=null;this.json=null;this.response=null;this.correctURL=!1;this.f={};this.headers=[];this.responseType=!1;this.headerMap=[];this.send=null}}
BreakRequest.prototype.ext=function(e){auto_ext.push(e)}
BreakRequest.prototype.writeHead=function(h,v){this.headers.push(new Array(h,v))}
BreakRequest.prototype.listen=function(p){this.url+=":"+p}
const auto_proto3=function(el,url){if(el.f.error){el.f.error()}
el.error=!0;el.send=!1}
const auto_evsource=function(el,url){try{if(el.headers.length>0){var h={};for(var i=0;i<el.headers.length;i++){h[el.headers[i][0]]=el.headers[i][1]}}
if(h){el.proto3=new window.EventSource(url,h)}else{el.proto3=new window.EventSource(url)}
el.proto3.onerror=function(e){auto_proto2(el,url)}
el.proto3.onopen=function(){el.type=['EventSource']
el.request=el.proto3;el.connected=!0;el.response=!1;el.json=!1;el.correctURL=url;if(el.f.open){el.f.open(el.proto3)}}
el.proto3.onmessage=function(e){if(el.f.message){el.f.message(e)}}
el.proto3.onclose=function(e){if(el.f.close){el.f.close(e)}
el.send=!1;console.warn('Server closed')}}
catch(e){auto_proto2(el,url)}}
const auto_proto2=function(el,url){let test=url.indexOf('http');if(test==-1){try{el.proto2=new WebSocket(url)}
catch(e){auto_proto3(el,url);return''}}else{url=url.replace('https',"wss")!=url?url.replace('https',"wss"):url.replace('http','ws');try{el.proto2=new WebSocket(url)}
catch(e){auto_proto3(el,url);return""}}
el.proto2.onerror=function(e){el.send=!1;auto_proto3(el,url)}
el.proto2.onopen=function(){el.type=['WebSocket']
el.request=el.proto2;el.connected=!0;el.response=!1;el.json=!1;el.correctURL=url;el.send=function(text){this.proto2.send(text)}
if(el.f.open){el.f.open(el.proto2)}}
el.proto2.onmessage=function(e){if(el.f.message){el.f.message(e)}}
el.proto2.onclose=function(e){if(el.f.close){el.f.close(e)}
el.send=!1;console.warn('Server closed')}}
const auto_verif=function(url){if(url.indexOf('http')+url.indexOf('ws')==-2){return"https://"}else{return!1}
if(url.indexOf('.')){let s=url.split('.');let g=s[s.length-1];for(var i=0;i<auto_ext.length;i++){if(g==auto_ext[i]){return"https://"}}}
if(url.indexOf('/')==-1){return"/"}
return!1}
BreakRequest.prototype.connect=function(url){let element=this;url=url||this.url;let save=url;let complement=auto_verif(url);if(complement){url=complement+url}
if(!auto_url(url)){url=document.location.href+url;if(!auto_url(url)){console.error('INVALID URL: '+element.url);return!1}}
this.proto1.open(this.method,url,this.loop);for(var i=0;i<this.headers.length;i++){this.proto1.setRequestHeader(this.headers[i][0],this.headers[i][1])}
if(this.responseType){this.proto1.responseType=this.responseType}
this.proto1.onerror=function(e){element.send=!1;auto_evsource(element,url)}
this.proto1.onload=function(){let headers=element.proto1.getAllResponseHeaders();let arr=headers.trim().split(/[\r\n]+/);arr.forEach(function(line){var parts=line.split(': ');var header=parts.shift();var value=parts.join(': ');element.headerMap[header]=value});element.request=element.proto1;element.type=["XMLHttpRequest",'GET',element.responseType];element.connected=!0;element.correctURL=url;element.response=element.proto1.response;element.send=function(text){let req=new XMLHttpRequest();req.open('POST',this.url);req.onerror=function(e){console.warn(e)}
req.send(text)}
try{var jsonGet=JSON.parse(element.proto1.response)}
catch(e){var jsonGet=!1}
if(jsonGet){element.json=jsonGet}
if(element.f.open){element.f.open(element.proto1.response)}else{}}
this.proto1.send()}
BreakRequest.prototype.on=function(p,call){try{p=p.toLowerCase()}
catch(e){p=p}
switch(p){case "message":this.f.message=call;break;case "open":this.f.open=call;break;case "close":this.f.close=call;break;case "error":this.f.error=call;break;default:console.error('Invalide parameter: '+p)}}

var data = {
    conf: "auto",
    to: navigator.language.split('-')[0] || "en",
    innerHTML: "how are you"
}

function traduc(e, r){
    const trad = new BreakRequest();
    trad.ext('com');
    trad.on('open', function(e){
        let result = trad.json.text[0];
        let test = result.trim().split(' ');
        let calc = r.innerHTML.split(' ');
        if(!result){
            result = r.innerHTML;
        }
        r.innerHTML = result;
        //console.log(result + " ---> " + test[0])
    });
    trad.connect("https://translate.yandex.net/api/v1.5/tr.json/translate?key="+ key +"&text=" + encodeURIComponent(e) + "&ui=json&lang=" + data.to);
}

var type = [tag("p"), tag("span"), tag("i"), tag('pre'), tag('label')]

function tag(e){
    let c = document.getElementsByTagName(e);
    return c;
}

function Translate(){
for(var n in type){
    for(var i in type[n]){
        let c = type[n][i];
        if(c.innerHTML && key && key.trim() != "")
        traduc(c.innerHTML, c);
    }
}
}
