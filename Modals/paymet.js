import { Schema, model } from "mongoose";

const PaymentSchema = Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'member',
        required: true
    },
    batch: {
        type: Schema.Types.ObjectId,
        ref: 'batch'
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['membership', 'batch'],
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['cash', 'card', 'upi'],
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'gym',
        required: true
    }
}, {timestamps: true})

const PaymentModel = model("payment", PaymentSchema);
export default PaymentModel;