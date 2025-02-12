import mongoose from "mongoose";

const picsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  instaid: {
    type: String,
  },
});
const Pics = mongoose.model("Pics", picsSchema);
export default Pics;
