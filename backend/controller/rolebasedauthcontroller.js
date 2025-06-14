import jsonwebtoken from "jsonwebtoken";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req,res) =>
{
    try
    {
        const { name, email, phone, password } = req.body;
        if (!username || !password || !role) {
                return res.status(400).json({ message: "Username, password, and role are required." });
            }

            const hashedPswd = await bcrypt.hash(password, 10);
                const user = new User({
                        name: name,
                        email: email,
                        phone: phone,
                        password: hashedPswd,
                    });

            //const createdUser = await User.create(user);
            await user.save();
            res.status(201).json({ message: "User registered successfully", user });
//NOTE: If you use User.create(), you can't modify the document before saving. If you need to set properties or run logic before saving, use new User() + user.save().
//Let me know if you want code examples or more details!
            
    }
    catch(err)
    {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export const login = async(req, res) =>
{
    try
    {
        const { email, username, password } = req.body;
        const user = await User.findOne({ email, username });
        if (!user) {
            return res
            .status(404)
            .json({ message: `User ${email} not found` });
        }

        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch)
        {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { email: user.email, username: user.username, role: user.role }, 
            "jwt-secret-key ",
            {expiresIn: "1d"}
          );

        res.status(200).json({
            message: "Login successful",
            token: token,
            // user: {
            //     id: user._id,
            //     username: user.username,
            //     email: user.email,
            //     role: user.role
            // }
        })
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

