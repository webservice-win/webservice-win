const app=require("expresss");
const { model } = require("mongoose");
const user_route=app();


// -----------------------user dashboard--------------------
user_route.get("/dashboard",(req,res)=>{
    try {
        
    } catch (err) {
         console.log(err)
    }
});
// ------------------------------

module.exports=user_route;