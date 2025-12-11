import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  veg: {
    type: Boolean,
  },
  bestsellers: {
    type: String,
  },
  description: {
    type: String,
  },
  Avlqunatity: {
    type: Number,

    default: 10,
  },
});
const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
