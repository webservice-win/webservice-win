const { signup, login, profile_update } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const multer=require("multer")
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
// ------------file-upload----------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});

router.post('/login', loginValidation, login);
router.post('/signup',async(req,res)=>{
    try {
        const { name, email, password,whatsapp,telegram} = req.body;
        const user = await UserModel.findOne({ email });
        console.log(name,email,password)
        if (user) {
            return res.json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password,whatsapp,telegram});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.json({
                message: "Signup successfully",
                success: true
            })
        console.log(userModel)
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
            console.log(err)
    }
});
router.put("/update-profile",ensureAuthenticated,profile_update)
module.exports = router;