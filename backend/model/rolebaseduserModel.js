import mongoose from "mongoose";
const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    CUSTOMER: 'customer'
};
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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
    role:
    {
        type: String,
        required: true,
        enum: ["admin", "manager", "customer"],
        default: ROLES.CUSTOMER
    }
},{
    timestamps: true,
});


const User = mongoose.model('User', userSchema);
export default User;