import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  //defines from which collection this property is coming from as its a foreign key
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});


const productSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  //defines from which collection this property is coming from as its a foreign key
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    portion:{
            type: String,
            required: false
    },
    brand: {
        type: String,
        required: true
    },
    reviews: [reviewSchema]
},
{
    timestamps: true
});


const Product = mongoose.model('Product', productSchema);
export default Product;