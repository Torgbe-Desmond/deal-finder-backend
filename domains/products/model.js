import mongoose from "mongoose";

const SelectorsSchema = new mongoose.Schema({
  name: { type: String, default: null },
  product__container: { type: String, default: null },
  product__image: { type: String, default: null },
  product__price: { type: String, default: null },
  product__location: { type: String, default: null },
  product__description: { type: String, default: null },
  product__status: { type: String, default: null },
  product__site__link: { type: String, default: null },
});

const Selectors = mongoose.model("Selectors", SelectorsSchema);

export default Selectors;
