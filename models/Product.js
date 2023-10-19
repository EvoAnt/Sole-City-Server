const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    brand: String,
    name: String,
    price: Number,
    size: {
      type: String,
      enum: [
        "6",
        "6.5",
        "7",
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
        "10.5",
        "11",
        "11.5",
        "12",
        "12.5",
        "13",
        "13.5",
        "14",
      ],
    },
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
