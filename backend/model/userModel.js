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
    role:
    {
        type: String,
        required: true,
        default: 'customer'
    }

},{
    timestamps: true,
});


const User = mongoose.model('User', userSchema);
export default User;

// userSchema.pre('save',function(next)
// {
//     let user = this;
//     if(user.isModified('password'))
//     {
//         return bcrypt.hash(user.password,12,function(err,hash)   //12 is salt
//         {
//             if(err)
//             {
//                 console.log('Bcrypt has error',err);
//                 return next(err);
//             }
//             user.password = hash;
//             return next();
//         })	
//     }
//     else{
//         return next();
//     }
// })

// userSchema.methods.comparePassword = function(password,next){
//     bcrypt.compare(password,this.password, function(err,match){
//         if(err)
//         {
//             console.log('Bcrypt compare error',err);
//             return next(err,false); //next is the callback function which is being called in this 
//             //line, if there is a error...it will call the next fn with actual value i.e, err and false i.e, as the password mismatches it gives false.
//         }
//         else{
//        console.log("Match Password");}
//        return next(null, match);
//     });
// };


// const User = mongoose.model('User', userSchema);
// export default User;
