import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        minlength: 10,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 10
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

},{
    timestamps: true,
});


const User = mongoose.model('User', userSchema);
export default User;
