
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
router.post('/signup',uploadimage.single("file"),async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password,image:req.file.filename});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.json({
                message: "Signup successfully",
                success: true
            })
        console.log(name)
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