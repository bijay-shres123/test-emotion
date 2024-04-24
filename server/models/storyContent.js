import mongoose from "mongoose";

const storySchema = mongoose.Schema({
    caption:{type:String, required:true},
    // username:{type:String,required:true},
    // userId:{type:String,required:true},
})

export default mongoose.model("Story", storySchema);
