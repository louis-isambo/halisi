
(function(){

    leistrap.event.handle('fetch', function(event, url,method, body, listener){

      
        
        method = method || "POST"
       

        fetch(url, {
            headers: {
                "Content-Type": "application/json",
              },
            method,
            body : method.toLowerCase() == "get"? undefined : JSON.stringify(body)
          
            
        }).then( async function(res){
            const data = await res.json()
            if(data.status == "ok" || data.status == 200)
                listener(data)
            else{
               displayError(data.message)
            }
            
        }).catch(function(error){
           displayError(error)
            
        })
    })

    leistrap.event.handle("event:create", function(event, data, listener ){
        leistrap.event.invoke("fetch", null, "/event/create",null,  data, function(result){
            listener(result)
            
        })
    })

    leistrap.event.handle("event:addgust", function(event, data, listener ){
        leistrap.event.invoke("fetch", null, "/event/addgust",null,  data, function(result){
            listener(result)
            
        })
    })

    leistrap.event.handle("event:iv", function(event, listener ){

        const url = location.pathname.split("/")
        leistrap.event.invoke("fetch", null, "/invitation/"+url[url.length -1] , "GET",  null, function(result){
            listener(result)
           
        })
    })

    
    leistrap.event.handle("event:guests", function(event,  eventKey,  listener ){

        leistrap.event.invoke("fetch", null, "/event/gusts/"+eventKey,  "GET",  null, function(result){
            listener(result)
           
        })
    })

    leistrap.event.handle("events", function(event, listener ){

        leistrap.event.invoke("fetch", null, "/event/events",  "GET",  null, function(result){
            listener(result)
           
        })
    })

    leistrap.event.handle("login", function(event, data, listener ){
        
        leistrap.event.invoke("fetch", null, "/login/user/" , null,  data, function(result){
            listener(result)
           
        })
    })

    leistrap.event.handle("auth", function(event, data, listener ){
        
        leistrap.event.invoke("fetch", null, "/auth" , null,  data, function(result){
            listener(result)   
        })
    })

    leistrap.event.handle("redirect", function(event, url ){
       const link = document.getElementById("redirect")
       link.href = url
       link.click()
    })

    function displayError(error){
        let msgError = document.getElementById("msgError")
        if(msgError){
            msgError.innerText = "error : " +error
            document.getElementById("msgError").removeAttribute("hidden")
        }
    }
})()