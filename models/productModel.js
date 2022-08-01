const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Please provide price value"],
      default: 0,
    },

    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlenght: [1000, "Description can not be more than 1000 characters"],
    },

    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },

    category: {
      type: String,
      required: [true, "Please provide category"],
      enum: ["office", "kitechen", "bedroom"],
    },

    company: {
      type: String,
      required: [true, "Please provide company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supportd",
      },
    },

    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    inventory: {
      type: Number,
      required: true,
      default: 15,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = new mongoose.model("Product", ProductSchema)
