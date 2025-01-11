const Route = require("express").Router
const {QEventModel,  QSynch, QGustModel, QAdmin} = require('../models/models')
const { uuid } = require("./assets/uuid")
const path = require("path")
const { VerifyState } = require("./loginLogout")

const router = Route()

QSynch()

//event creation 
router.get("/even/create", (eq, res)=> res.end("ok"))
router.post("/event/create", async  function(req, res){
    
   try {

        req.body.key = uuid()
        const QEv =  QEventModel.build(req.body)
        await QEv.save()
        res.end( JSON.stringify({status : 200, data : QEv.dataValues}))
           
   } catch (error) {
    res.end( JSON.stringify({status :  "errot"}))
 
   }
})


// add gust
router.get("/event/addgust", (req, res)=> res.end("ok"))

router.post("/event/addgust", async function(req, res){

    try {

        const QGu =  await QEventModel.findAll({
            where : {key : req.body.key}
        })
  
        QGu.every ( async (item)=>{
            const Qg = QGustModel.build({
                key : uuid(),
                name : req.body.name,
                idevent : item.dataValues.id
            })

            await Qg.save()
            res.end( JSON.stringify({status :  200, data : Qg.dataValues}))
            return
            
        })
      
       if(!QGu.length){
         res.end( JSON.stringify({
            status :  "errot",
            message : "event does not exist"
        }))
       }
        
  
   } catch (error) {
    res.end( JSON.stringify({status :  "error", message : "an Error occurs"}))
 
   }
})

router.get("/event/events", async function(req, res){
    try {
        
        const eventList = await QEventModel.findAll()
        const eventListShare = []
        eventList.forEach(function(item, index){
            eventListShare.push(item.dataValues)
            
            
        })
        res.end( JSON.stringify({status :  200, data : eventListShare}))
        
    } catch (error) {
        res.end( JSON.stringify({status :  "error", message : "an Error occurs"}))
    }
})

router.get("/event/gusts/:eventKey", async function(req, res){
    try {
        
        const eventKey = await QEventModel.findAll({
            where : {key : req.params.eventKey}
        })
        
        eventKey.every( async function(item){
           const eventGusts = []
           const gustList = await QGustModel.findAll({
            where : {idevent : item.dataValues.id}
           })

           gustList.forEach(function(gust){
            gustList.push(gust.dataValues)
           })
           res.end( JSON.stringify({status :  200, data : gustList}))
        })
        
        if(!eventKey.length)
            res.end( JSON.stringify({status :  "error", message : "event does not exist"}))

    } catch (error) {
        res.end( JSON.stringify({status :  "error", message : "an Error occurs"}))
    }
})

//event invitation view

router.get("/invitation/:key", async function(req, res){
    try {
        
        const key = req.params.key
        
        const Qg = await QGustModel.findAll({
            where : {key}
        })

        
        Qg.every ( async (item)=>{
            const QEV = await QEventModel.findAll({
                where : {id : item.dataValues.idevent}
            })

            QEV.every( ev=>{
                res.end( JSON.stringify({
                    status :  200, 
                    data : {
                        gust : item.dataValues,
                        event : ev.dataValues
                    }
                }))
            })
            
            if(!QEV.length){
                res.end( JSON.stringify({
                    status :  "errot",
                    message : "impossible to access tje event"
                }))
            }
          
            
        })
        if(!Qg.length){
            res.end( JSON.stringify({
                status :  "errot",
                message : "no existing gust"
            }))
        }
        
        
    } catch (error) {
    
    }
   
})

router.post("/auth", function(req, res){
  
    VerifyState(req.cookies, {
        SU : async function(){

            try {
                const ad =   QAdmin.build(req.body)
                await ad.save()
           
                
                res.end( JSON.stringify({status : 200, data : ad.dataValues}))

            } catch (error) {
                res.end( JSON.stringify({status :  "error", message : "error"}))
            }
        },
        redirect : function(){
             res.redirect("/notFound")
            }
    })
})
module.exports = {router}