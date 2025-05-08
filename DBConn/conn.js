import { connect } from "mongoose";

connect('mongodb+srv://kourraspreet67:J7zVMEwVwxr2dV2U@cluster0.gwbiobu.mongodb.net/gymBackend')
.then(() => console.log('DB connection successful!')).catch(err=>{
    console.log(err)
});