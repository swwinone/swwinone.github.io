##简单的Ajax原生js 封装
###get方法封装
>function ajax_get(url,data){
   var ajax=new XMLHttpRequest();
   if(data){
       url+='?';
       url+=data;
   }
> ajax.open('get',data);

>   ajax.send();
   
>   ajax.onreadystatechange()=function(){
       if(ajax.readyState==4&&ajax.status==200)
           console.log(ajax.responseText());
      }
   }
}

###post方法封装
>function post(url,data){
     var ajax=new XMLHttpRequest();

>    ajax.open('post',data);

>    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

>    ajax.send(data);

>    ajax.onreadyStatechange()=function(){
        if(ajax.readyState==4&&ajax.status=200)
            console.log(ajax.responseText);
     }
>}

###tool方法封装
/*
    url:请求的url
    data:发送的数据
    method:请求的方法
    success:请求成功以后 调用的函数
*/
>function post(option){
     var ajax=new XMLHttpRequest();

>     if(option.method=='get'){
        if(data){
            url+='?';
            url+=data;
        }
        ajax.open(option.method,option.url);
        ajax.send();
     }
>     if(option.method=='post'){
        ajax.open(option.method,option.url);
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.send(data);
     }  

>    ajax.onreadyStatechange()=function(){
        if(ajax.readyState==4&&ajax.status=200)
            option.success(ajax.responseText);
     }
>}

