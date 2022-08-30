import { Schema, model } from "mongoose";

const certificate = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    day: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const certificateModel = model("Certificate", certificate);
export { certificateModel };
