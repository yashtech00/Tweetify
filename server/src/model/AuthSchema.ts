import mongoose from "mongoose";

const Schema = mongoose.Schema

const AuthSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const AuthModel = mongoose.model("user", AuthSchema);

export default AuthModel;