import { Schema, model } from "mongoose";
import { DEFAULT_PROFILE_IMAGE } from "../../constants/constants";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    likes: {
      type: Array,
      required: false,
      default: [],
    },
    profileImage: {
      type: Schema.Types.Mixed,
      required: false,
      default: DEFAULT_PROFILE_IMAGE,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ name: "text", email: "text", description: "text" });

const UserModel = model("User", UserSchema);

export { UserModel };
