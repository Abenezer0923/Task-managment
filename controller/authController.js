const User = require('../models/user');
const bcrypt = require('bcrypt');
const {createAccessToken} = require("../utils/token");
const {validateEmail} = require('../utils/validation');


exports.signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({msg: "please fill all the blank filds "})
        }
        if (typeof name !=='string' || typeof email !== 'string' || typeof password !== "string"){
            return res.status(400).json({msg: "please send string values "})
        }

        if(password.length < 4){
            return res.status(400).json({msg: " the password length must be grater then four "})
        }

        if (!validateEmail(email)) {
            return res.status(400).json({msg: "invalid Email "})
        }

        const user = await User.findOne({email})
        if (user){
            return res.status(400).json({msg: "This email is already registered!! "})
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        await User.create({name, email, password:hasedPassword})
        res.status(200).json({msg: "Account is created!!! "})


    }catch(err) {
        console.error(err);
        return res.status(400).json({msg: "server error: ", err})
    }
}


exports.login = async (req, res) => {
    try{
        const { email, password} = req.body;
        console.log("the emaail is" ,email)

        if(!email || !password){
            return res.status(400).json({msg: "please fill email and password!!! "})
        }

        const user = await User.findOne({ email })
        // const users = await User.find();
        // console.log("why", users);

        if (!user){
            return res.status(400).json({msg: "This email is not registered!!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Wrong password!!"})
            
        }

        const token = createAccessToken({id:user._id});
        delete user.password;

        res.status(200).json({token,user, status:true,msg: "Login successfull!!!"})



    }catch(err) {
        console.error("this is server err:", err);
    }
}