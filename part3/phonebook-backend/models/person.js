const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  }
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
