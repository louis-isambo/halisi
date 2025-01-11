const Server = require("http").Server
const express = require("express")
const QRCode = require("qrcode")
const path = require("path")
const app = express()
const cors  = require("cors")
const server = new  Server(app)
const {router} = require("./routes/route")
const { loginLogout, VerifyState } = require("./routes/loginLogout")
const cookieParser = require('cookie-parser');


const config = {
    port : 4140,

}

server.listen(config.port, function(){
    console.log(`server started`);
    
})


// app.use(cors({
//     origin : `*`,
//     methods : ["GET", 'POST', "PUT", "DELETE"],
//     allowedHeaders : "Content-type, Authorization"
// }))

app.use(express.json())
app.use(cookieParser());
app.use("/",  express.static(path.join(__dirname, "public")))

app.use(router)
app.use(loginLogout)

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "views/home.html"))
})

app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "views/login.html"))
})

app.get("/signup", function(req, res){
    res.sendFile(path.join(__dirname, "views/signup.html"))
})


app.get("/scan", function(req, res){
    res.sendFile(path.join(__dirname, "views/qr.html"))
})

app.get("/services", function(req, res){

    VerifyState(req.cookies, {
        SU : function(){
            res.sendFile(path.join(__dirname, "views/index.html"))
        },

        redirect : function(){
            res.redirect("/login")
        },
        SE : function(){
            res.sendFile(path.join(__dirname, "views/index.html"))
        }
    })
 

   
})

app.get("/services/event/:key", function(req, res){
    res.sendFile(path.join(__dirname, "views/addGust.html"))
})

app.get("/iv/:key", function(req, res){
    res.sendFile(path.join(__dirname, "views/invitation.html"))
})


app.get("/qrcode", function(req, res){
    QRCode.toDataURL( req.query.c, function (err, url) {
        if(err) res.end("error")
        else {res.send(url)}
    })
})


app.get("/admins", function(req, res){
    VerifyState(req.cookies, {
        SU : function(){
            res.sendFile(path.join(__dirname, "views/admin.html"))
        },

        SE : function(){
            res.sendFile(path.join(__dirname, "views/admin.html"))
        },

        redirect : function(){
            res.redirect("/notFound")
        }
    })
})

app.get("/SU_auth", function(req, res){
    VerifyState(req.cookies, {
        SU : function(){
            res.sendFile(path.join(__dirname, "views/SU.html"))
        },

        redirect : function(){
            res.redirect("/notFound")
        }
    })
})

app.get("/clearData", function(req, res){
    if(req.cookies){
        const cookies = Object.keys(req.cookies);

        cookies.forEach(function(item){
            res.clearCookie(item)
        })
        
    }
    
    res.redirect("/login")
})
