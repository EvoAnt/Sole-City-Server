const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    brand: String,
    name: String,
    price: Number,
    description: String,
    image: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
