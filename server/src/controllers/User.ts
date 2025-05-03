import AuthModel from "../model/AuthSchema";
import bcrypt from "bcryptjs";
import NotificationModel from "../model/notification";
import cloudinary from "../lib/Cloudinary";

export const getUserProfile = async (req: any, res: any) => {
  try {
    const { username } = req.params;
    console.log({ username });

    const user = await AuthModel.findOne({ username }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    console.log({ user }, "profile user");

    return res.status(200).json({ message: "fetch user", data: user });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching user details" });
  }
};

export const EditUserProfile = async (req: any, res: any) => {
  try {
    const { fullname, username, email, bio, link, profile_Image, Cover_Image } =
      req.body;
    const userId = req.user._id;
    console.log(userId, "user id");

    const user = await AuthModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    let profileImageUrlToUse = profile_Image;
    let coverImageUrlToUse = Cover_Image;

    if (profile_Image) {
      try {
        const uploadRes = await cloudinary.uploader.upload(profile_Image, {
          folder: "profile_images",
        });
        profileImageUrlToUse = uploadRes.secure_url;
      } catch (uploadError) {
        console.error(
          "Cloudinary upload error for profile image:",
          uploadError
        );
        return res
          .status(500)
          .json({ message: "Failed to upload profile image" });
      }
    }

    if (Cover_Image) {
      try {
        const uploadRes = await cloudinary.uploader.upload(Cover_Image, {
          folder: "cover_images",
        });
        coverImageUrlToUse = uploadRes.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error for cover image:", uploadError);
        return res
          .status(500)
          .json({ message: "Failed to upload cover image" });
      }
    }

    const updatedUser = await AuthModel.findByIdAndUpdate(
      userId,
      {
        fullname,
        username,
        email,
        bio,
        link,
        profile_Image: profileImageUrlToUse,
        Cover_Image: coverImageUrlToUse,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Updated successfully", data: updatedUser });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ message: "Internal server error while updating user details" });
  }
};

export const FollowUnfollow = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const UserModified = await AuthModel.findById(id);
    const currentUser = await AuthModel.findById(userId);

    if (id === userId) {
      return res.status(401).json({ message: "You cannot follow yourself" });
    }

    if (!UserModified || !currentUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      await AuthModel.findByIdAndUpdate(id, {
        $pull: { followers: userId },
      });
      await AuthModel.findByIdAndUpdate(userId, {
        $pull: { followers: id },
      });
    } else {
      await AuthModel.findByIdAndUpdate(id, { $push: { followers: userId } });
      await AuthModel.findByIdAndUpdate(userId, { $push: { following: id } });

      const newNotification = new NotificationModel({
        type: "follow",
        from: userId,
        to: UserModified._id,
      });
      await newNotification.save();
      return res.status(200).json({ message: "Followed successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log("error in follow or Unfollow User", error.message);
  }
};

export const getSuggestedUsers = async (req: any, res: any) => {
  try {
    const userId = req.user._id;
    const usersFollowedByMe = await AuthModel.findById(userId).select(
      "following"
    );

    const users = await AuthModel.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe?.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json(suggestedUsers);
  } catch (error: any) {
    console.log("Error in geting the sugestions", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
