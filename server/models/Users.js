import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    animal : String,
    disease : String
})

const UserModel = mongoose.model("users", UserSchema);

export { UserModel };
