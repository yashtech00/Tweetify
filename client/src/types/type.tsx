export interface UserProp {
  username: string;
  fullname: string;
  bio: string;
  link: string;
  email: string;
  _id: string;
  Cover_Image: string;
  followers: string[];
}


export interface AuthProp {
  username: string;
  fullname: string;
  password: string;
  email: string;
  Cover_Image: string;
}

export interface Comment {
  _id: string;
  content: string;
  user: {
    fullname: string;
    username: string;
    profile_Image: string;
  };
}
export interface tweetProp {
  _id: string;
  content: string;
  image: string;
  user: {
    _id: string;
    username: string;
    fullname: string;
    profile_Image: string;
  };
  comments: Comment[];
  likes: string[];
  Bookmark: string[],
  Retweet: string[]
  createdAt: Date;
  updatedAt: Date;
}

export interface From {
  _id: string;
  username: string;
  profileImg: string;
}

export interface Notification {
  _id: string;
  from: From;
  type: "follow" | "like";
}



export interface ProfileProp {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  bio: string;
  link: string;
  profile_Image: string;
  Cover_Image: string;
  following: [];
  followers: [];
  likedTweets: [];
  tweets: {
      content: string;
      likes: [];
      comment: [];
  };
}
