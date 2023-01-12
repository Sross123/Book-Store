const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/bookStore";

const ConnectDB = () =>{
    return mongoose.connect(URI).then(()=>{
        console.log("Database Connected");
    }).catch((error)=>{
        console.log(error, "error");
    })
    
}

module.exports = ConnectDB;