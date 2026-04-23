const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ism majburiy'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Telefon raqam majburiy'],
        trim: true,
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        default: null,
    },
    tourName: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['yangi', 'korib_chiqilmoqda', 'tasdiqlangan', 'bekor_qilindi'],
        default: 'yangi',
    },
    note: {
        type: String,
        default: '',
    },
    source: {
        type: String,
        default: 'website',
    },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
