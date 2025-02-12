import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  issues: {
    type: [String],
    enum: [
      "Less Quantity",
      "Taste Issue",
      "Not Cooked Well",
      "Behaviour Issue",
      "Not Served Well",
      "Late Delivered",
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
