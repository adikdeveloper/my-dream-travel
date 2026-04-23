const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const authMiddleware = require('../middleware/auth');

// GET /api/tours - Public: barcha turlarni olish
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, data: tours });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/tours/all - Admin: hamma turlarni olish (nofaol ham)
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const tours = await Tour.find().sort({ createdAt: -1 });
        res.json({ success: true, data: tours });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/tours/:id - Public: bitta turni olish
router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ success: false, message: 'Tur topilmadi' });
        res.json({ success: true, data: tour });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/tours - Admin: yangi tur qo'shish
router.post('/', authMiddleware, async (req, res) => {
    try {
        const tour = new Tour(req.body);
        const saved = await tour.save();
        res.status(201).json({ success: true, data: saved });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT /api/tours/:id - Admin: turni tahrirlash
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tour) return res.status(404).json({ success: false, message: 'Tur topilmadi' });
        res.json({ success: true, data: tour });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE /api/tours/:id - Admin: turni o'chirish
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        if (!tour) return res.status(404).json({ success: false, message: 'Tur topilmadi' });
        res.json({ success: true, message: "Tur muvaffaqiyatli o'chirildi" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
