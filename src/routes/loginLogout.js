const Route = require("express").Router
const {QEventModel,  QSynch, QGustModel, QAdmin} = require('../models/models')
const { uuid } = require("./assets/uuid")
require('dotenv').config();





const router = Route()
router.post("/login/user", function(req, res){
   if(req.body){
        const data = {userEmail : req.body.email, userPassword : req.body.password }
        VerifyState(data, {
            SU : function(){
                setCookies(res, data.userEmail, data.userPassword)
                res.send( {status : "200", data:{redirect : "/SU_auth"}})
            },
            redirect : function(){
                res.send( {status : "200", data:{redirect : "/login"}})
            },

            SE : function(){
                setCookies(res, data.userEmail, data.userPassword)
                res.send( {status : "200", data:{redirect : "/services"}})
            },
            error : function(){
                res.send( {status : "200", data:{redirect : "/error"}})
            }
            
        })
   
   }

   else{
    res.send( {status : "error", message: "user not exist"})
   }
})


async function VerifyState(cookies, listeners){
    if(!listeners) listeners = {}
    if(!cookies) cookies = {}

    if(cookies.userEmail && cookies.userPassword){
       
      
        
        if(cookies["userPassword"] == process.env.SUP && cookies["userEmail"] == process.env.SUE){
              
        console.log(process.env.SUP, process.env.SUE);
            if(listeners.SU) listeners.SU()
        }
        
        else{

            try {
               
                
                const admin = await QAdmin.findAll({
                    where : {
                        email: cookies.userEmail,
                        password : cookies.userPassword
                    }
                })
                
                const user = {
                    password : null,
                    email : null
                }

                admin.every(function(item){
                    user.email = item.dataValues.email
                    user.password = item.dataValues.password
                })
                
                if(user.email && user.password){
                    
                    if(user.password === cookies.userPassword && user.email  === cookies.userEmail && typeof listeners.SE == "function"){
                       
                        listeners.SE()
                    }
                    else { if(listeners.redirect ) listeners.redirect()}

                }
                else{
                    if(listeners.redirect ) listeners.redirect()
                }
            } catch (error) {
                console.log(error);
                
                if(listeners.error) listeners.error()
                
            }
           
        }
    }

    else{
        listeners.redirect()
    }

}

function setCookies(res, email, password){
    res.cookie('userEmail', email, { maxAge: 3600000 }); 
    res.cookie('userPassword',password, { maxAge: 3600000 });
}
module.exports.loginLogout = router
module.exports.VerifyState = VerifyState
