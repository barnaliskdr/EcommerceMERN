import jsonwebtoken from "jsonwebtoken";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

// const showMessage = (req, res) => {
//     res.status(200).send(`Here is Your message:   ${req.params.message}`);
// }

// const register = async (req, res) => {
//     console.log(req.body);
//     const { name, email, password } = req.body;
//     // Validation
//     if (!name) return res.status(400).send('Name is required');
//     if (!email) return res.status(400).send('Email is required');
//     if (!password) return res.status(400).send('Password is required');
//     if (password.length < 6) return res.status(400).send('Password must be at least 6 characters');

//     // Check if user already exists
//     let userExist = await User.findOne({ email }).exec();
//     if (userExist) return res.status(400).send('Email is taken');

//     // Register the user
//     const newUser = new User(req.body); // Create a new User instance
//     try {
//         await newUser.save();
//         console.log('User created:', newUser);
//         return res.json({ ok: true });
//     } catch (err) {
//         console.log('Create user failed:', err);
//         return res.status(400).send('Error. Try again.');
//     }
// }

// const login = async (req, res) => {
//     // console.log(req.body);
//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email }).exec();
//         console.log("user exist -- ",user)
//         if (!user) res.status(400).send("USER NOT FOUND");
//         else{
//         // Assuming comparePassword is defined as a static method in your User model
//         user.comparePassword(password, (err, match) => {
            
//             if (!match || err) {
//                 console.log("Compare Password In login error", err);
                
//                 return res.status(400).send("PASSWORD DOES NOT MATCH");
//             } else {
//                 // Password matches, you can proceed with login logic
//                 // For example, you might generate a token here and send it back to the client
//                 let token = jsonwebtoken.sign({_id: user._id,email:user.email},process.env.JWT_SECRET,{
//                     expiresIn: "2d",
//                 })
//                 //sign menthod is used to create a token with the provided secret key of the ENV variable.
//                 console.log(token);
//                 res.json({token,user:{
//                     name: user.name,
//                     email:user.email,
//                     createdAt: user.createdAt,
//                     updatedAt: user.updatedAt,
//                 }});
//             }
//         });
//     }
//     } catch (err) {
//         console.log("LOGIN ERROR -- ", err);
//         res.status(400).send("SIGNIN FAILED");
//     }
// }

// module.exports= {showMessage,register,login};

export const register = async (req, res) => {
    console.log(req.body);
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        const hashedPswd = await bcrypt.hash(password, 10);
        const user = new User({
                name: name,
                email: email,
                phone: phone,
                password: hashedPswd,
            });
        const createdUser = await User.create(user);
        console.log(createdUser);
        res.status(200).json({createdUser});
     }
     catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }

}

export const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log("user exist -- ",user)
        if (!user) res.status(400).send("USER NOT FOUND");
        else{
        // Assuming comparePassword is defined as a static method in your User model
        user.comparePassword(password, (err, match) => {
            
            if (!match || err) {
                console.log("Compare Password In login error", err);
                
                return res.status(400).send("PASSWORD DOES NOT MATCH");
            } else {
                // Password matches, you can proceed with login logic
                // For example, you might generate a token here and send it back to the client
                let token = jsonwebtoken.sign({_id: user._id,email:user.email},process.env.JWT_SECRET,{
                    expiresIn: "2d",    
                })
                //sign menthod is used to create a token with the provided secret key of the ENV variable.
                console.log(token);
                res.json({token,user:{
                    name: user.name,
                    phone: user.phone,
                    email:user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }});
            }           
        });
    }   
    } catch (err) {
        console.log("LOGIN ERROR -- ", err);
        res.status(400).send("SIGNIN FAILED");
    }
}