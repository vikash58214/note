import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  UserName: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
});
const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
