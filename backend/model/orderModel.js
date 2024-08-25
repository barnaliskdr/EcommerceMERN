import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  //defines from which collection this property is coming from as its a foreign key
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'  //defines from which collection this property is coming from as its a foreign key
            }
        }
    ],
    DeliveryAddress: 
    {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    tax: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingCharge: {
        type: Number,
        required: true,
        default: 0.0
    },
    total: {
        type: Number,
        required: true, 
        default: 0.0    
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
},
{
    timestamps: true
});


const Order = mongoose.model('Order', orderSchema);
export default Order;