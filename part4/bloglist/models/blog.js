const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  url: String,
  title: String,
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: Number
});

blogSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
