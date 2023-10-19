const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
    owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", cartSchema);
