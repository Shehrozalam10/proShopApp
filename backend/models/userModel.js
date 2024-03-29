import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    // console.log("enteredPassword",enteredPassword);
    // console.log("this.password",this.password);
    return await bcrypt.compare(enteredPassword, this.password);
    };

userSchema.pre("save", async function (next) {
    // console.log("this.isModified('password')",this.isModified("password"));
    if (!this.isModified("password")) {
        next();
    }
    // console.log("this.password",this.password);
    const salt = await bcrypt.genSalt(10);
    // console.log("salt",salt);
    this.password = await bcrypt.hash(this.password, salt);
    // console.log("this.password",this.password);
    next();
    });


const User = mongoose.model("User", userSchema);
export default User;
