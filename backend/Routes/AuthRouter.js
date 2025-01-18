
const { signup, login, profile_update } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middlewares/Auth');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const multer=require("multer")
const router = require('express').Router();
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
router.post('/signup',uploadimage.single("file"), signup);
router.put("/update-profile",ensureAuthenticated,profile_update)
module.exports = router;