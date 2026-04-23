const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tur nomi majburiy'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Rasm URL majburiy'],
  },
  price: {
    type: String,
    required: [true, 'Narx majburiy'],
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 4.5,
  },
  days: {
    type: String,
    required: [true, 'Kunlar soni majburiy'],
  },
  category: {
    type: String,
    required: [true, 'Kategoriya majburiy'],
    enum: ['Osiyo', 'Yevropa', 'Amerika', 'Orollar', 'Afrika', 'Boshqa'],
  },
  description: {
    type: String,
    default: '',
  },
  highlights: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
