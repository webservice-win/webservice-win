const mongoose=require("mongoose");

const website_schema=new mongoose.Schema({
    thumbnail:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
    ,
    technology:{
        type:String,
        required:true
    },
    note:{
               type:String,
        required:true
    }
    ,
    title:{
        type:String,
        required:true
    },
    tutorialLink:{
        type:String,
        required:true
    },
        tutorialLink2:{
        type:String,
        required:true
    },

        tutorialLink3:{
        type:String,
        required:true
    },
        tutorialLink4:{
        type:String,
        required:true
    },
    tutorialtitle:{
           type:String,
        required:true
    },
    demoFrontend:{
        type:String,
        required:true
    },
    demoBackend:{
        type:String,
        required:true
    },
    singleLicense:{
        type:Number,
        required:true
    },
    bettinglicense:{
   type:Number,
        required:true
    },
    tutorial_image:{
    type:String,
    required:true 
    },
    banner2:{
           type:String,
        required:true 
    }
    ,
    banner3:{
           type:String,
        required:true 
    }
    ,
    banner4:{
           type:String,
        required:true 
    }
    ,    banner5:{
             type:String,
        required:true  
    },
    banner6:{
           type:String,
        required:true 
    },
     unlimitedLicense:{
        type:Number,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        required:true
    }
    ,
    love:{
        type:Number,
        required:true
    },
    features: [String],
    unlimitedfeatures: [String],
    bettingfeatures: [String],
    zipFile: {
    type: String, // URL of the uploaded ZIP file
    required: true
  },
},{timestamps:true});

const website_model=mongoose.model("Website",website_schema);

module.exports=website_model;