import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});
const Review = mongoose.model("Review", reviewSchema);
export default Review;
