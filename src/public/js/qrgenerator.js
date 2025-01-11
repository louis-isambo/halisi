
(function(){
   
    leistrap.event.handle("generateQR", function(e, content, listener){
        const url = "/qrcode/?c="+content
        console.log("ok");
        
        fetch(url).then(async function(data){
            const dataUrl = await data.text()
            const img = leistrap.create("img", {src : dataUrl })

            async function CBlob(){
                const res = await fetch(dataUrl)
                return res
            }
            function download(name){
               CBlob().then( async function(res){
                const blob = await res.blob()
                const href = URL.createObjectURL(new Blob([blob], {type : "image/png"}))
                const link = leistrap.create("a", {
                    href ,
                    download : name || "qrcode"
                })._conf.click()
                
               })
                
                
            }
           listener({dataUrl, img, download})
        })
    })
})()