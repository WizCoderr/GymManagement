import { Schema, model } from "mongoose";

const BatchSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    trainer: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    currentMembers: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: "member"
    }],
    gym: {
        type: Schema.Types.ObjectId,
        ref: "gym",
        required: true
    }
}, {timestamps: true})

const BatchModel = model("batch", BatchSchema);
export default BatchModel;