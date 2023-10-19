const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    cart: [{ type: Schema.Types.ObjectId, ref: "Cart" }],
    address: String,
    image: {
      type: String,
      default:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
