const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/db",{

}).then(()=>{
console.log("database connected")
}).catch((e)=>{
    console.log("err",e)
})