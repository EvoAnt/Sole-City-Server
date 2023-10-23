const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        price: Number,
        name: String,
        image: String,
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
            "14",
          ],
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
    owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", cartSchema);
