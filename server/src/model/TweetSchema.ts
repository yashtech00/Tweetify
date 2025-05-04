import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TweetSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      maxlength: 280,
      trim: true,
      required: true,
    },
    

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        content: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const TweetModel = mongoose.model("tweet", TweetSchema);

export default TweetModel;
