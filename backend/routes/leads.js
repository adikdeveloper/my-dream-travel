const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/auth');

// POST /api/leads - Public: yangi lead qo'shish (website formadan)
router.post('/', async (req, res) => {
    try {
        const { name, phone, tourId, tourName, source } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ success: false, message: 'Ism va telefon raqam majburiy' });
        }
        const lead = new Lead({ name, phone, tourId, tourName, source: source || 'website' });
        const saved = await lead.save();
        res.status(201).json({ success: true, data: saved, message: "Xabaringiz qabul qilindi! Tez orada aloqaga chiqamiz." });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// GET /api/leads - Admin: barcha leadlarni olish
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = status ? { status } : {};
        const total = await Lead.countDocuments(query);
        const leads = await Lead.find(query)
            .populate('tourId', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json({ success: true, data: leads, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/leads/stats - Admin: statistika
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const total = await Lead.countDocuments();
        const yangi = await Lead.countDocuments({ status: 'yangi' });
        const tasdiqlangan = await Lead.countDocuments({ status: 'tasdiqlangan' });
        const bekor = await Lead.countDocuments({ status: 'bekor_qilindi' });

        // So'nggi 7 kun leadlari
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const thisWeek = await Lead.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        res.json({ success: true, data: { total, yangi, tasdiqlangan, bekor, thisWeek } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/leads/:id - Admin: bitta leadni olish
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).populate('tourId', 'name price');
        if (!lead) return res.status(404).json({ success: false, message: 'Lead topilmadi' });
        res.json({ success: true, data: lead });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT /api/leads/:id - Admin: lead statusini o'zgartirish
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lead) return res.status(404).json({ success: false, message: 'Lead topilmadi' });
        res.json({ success: true, data: lead });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE /api/leads/:id - Admin: leadni o'chirish
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ success: false, message: 'Lead topilmadi' });
        res.json({ success: true, message: "Lead o'chirildi" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
