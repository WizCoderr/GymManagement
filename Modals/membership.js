import { Schema, model } from "mongoose";


const MembershipSchema = Schema({
    months:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    gym:{
        type:Schema.Types.ObjectId,
        ref:"gym",
        required:true
    }
},{timestamps:true})

const modalMembership = model("membership",MembershipSchema);

export default modalMembership;