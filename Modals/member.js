import mongoose from "mongoose";
const { Schema, model } = mongoose;

const memberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    membership: {
        type: Schema.Types.ObjectId,
        ref: 'membership',
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'gym',
        required: true
    },
    profilePic: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: "Active"
    },
    lastPayment: {
        type: Date,
        default: Date.now
    },
    nextBillDate: {
        type: Date,
    }
}, { timestamps: true });

const Member = model("member", memberSchema);

export default Member;