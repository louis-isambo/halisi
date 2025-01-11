const {  DataTypes, Model } = require('sequelize');
const {DB} = require("./db")



const QEventModel = DB.define(
  'Event',
  {

    organizer : {
      type: DataTypes.STRING,
     
    },
    title: {
      type: DataTypes.STRING,
     
    },

    description : {
        type: DataTypes.STRING,
       
    },
    begindate : {
        type: DataTypes.DATE,
       
    },

    enddate : {
        type: DataTypes.STRING,
       
    },
    place : {
        type: DataTypes.STRING,
       
    },
    address : {
        type: DataTypes.STRING,
       
    },
    about : {
        type: DataTypes.STRING,
       
    },
    email : {
        type: DataTypes.STRING,
       
    },
    phone: {
        type: DataTypes.STRING,
       
    },
    link : {
        type: DataTypes.STRING,
       
    },

    Model : {
        type: DataTypes.STRING,
       
    },
    key : {
        type : DataTypes.STRING
    }
  },
  
);

const QGustModel = DB.define(
    'Gust',
    {
        name : {
            type : DataTypes.STRING,
        },
        key : {
            type : DataTypes.STRING,
        },
        idevent  : {
            type : DataTypes.STRING,
        },
    }
)


const QAdmin  = DB.define(
    'Admin',
    {
        email: {
            type : DataTypes.STRING,
        },
        password : {
            type : DataTypes.STRING,
        },
       
    }
)

// synchronize all tables 

 async function QSynch(){
    await DB.sync();
    console.log('All models were synchronized successfully.');
 }

module.exports = {
    QEventModel,
    QGustModel,
    QAdmin,
    QSynch
}