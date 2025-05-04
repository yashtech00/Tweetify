import mongoose from "mongoose";

const Schema = mongoose.Schema

const AuthSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required:true
    },
    fullname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default:[]
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            default:[]
        }
    ],
    bio: {
        type: String,
        default:""
    },
    link: {
        type: String,
        default:""
    },
  
    Cover_Image: {
        type: String,
        default:""
       
    },
    likedTweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tweet",
            default:[]
        }
    ],
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tweet",
            default:[]
        }
    ]
},{timestamps:true});

const AuthModel = mongoose.model("user", AuthSchema);

export default AuthModel;