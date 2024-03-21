import mongoose, { Schema } from "mongoose";

const BannerSchema = new Schema(
  {
    banner: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Banner = mongoose.model("Banner", BannerSchema);
export default Banner;
