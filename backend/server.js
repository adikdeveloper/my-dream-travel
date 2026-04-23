const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for admin panel
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/leads', require('./routes/leads'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'My Dream Travel API ishlayapti!', timestamp: new Date() });
});

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydreamtravel')
    .then(async () => {
        console.log('✅ MongoDB ga ulandi!');
        // Seed initial data if empty
        const Tour = require('./models/Tour');
        const count = await Tour.countDocuments();
        if (count === 0) {
            await seedTours();
        }
    })
    .catch(err => console.error('❌ MongoDB xatosi:', err));

async function seedTours() {
    const Tour = require('./models/Tour');
    const initialTours = [
        { name: "Dubai, BAA", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop", price: "$499", rating: 4.9, days: "5 kun", category: "Osiyo", description: "Dunyoning eng zamonaviy shahri Dubai sizni kutmoqda!" },
        { name: "Parij, Fransiya", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1920&auto=format&fit=crop", price: "$799", rating: 4.8, days: "7 kun", category: "Yevropa", description: "Sevgi va san'at shahri Parijda unutilmas dam oling." },
        { name: "Maldiv orollari", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1920&auto=format&fit=crop", price: "$1199", rating: 5.0, days: "6 kun", category: "Orollar", description: "Kristall musaffo dengiz va oq qumli plyajlar sizni kutmoqda." },
        { name: "Antaliya, Turkiya", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1920&auto=format&fit=crop", price: "$399", rating: 4.7, days: "7 kun", category: "Osiyo", description: "Turkiyaning eng mashhur kurort shahri." },
        { name: "Rim, Italiya", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1920&auto=format&fit=crop", price: "$850", rating: 4.9, days: "8 kun", category: "Yevropa", description: "Abadiy shahar Rimning tarixi va madaniyatini kashf eting." },
        { name: "Bali, Indoneziya", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&auto=format&fit=crop", price: "$950", rating: 4.9, days: "10 kun", category: "Orollar", description: "Xudolarning oroli Balida dam oling." },
        { name: "Nyu York, AQSH", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1920&auto=format&fit=crop", price: "$1500", rating: 4.8, days: "10 kun", category: "Amerika", description: "Uxlamaydiган shahar Nyu Yorkni his eting!" },
        { name: "Kappadokiya, Turkiya", image: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=1920&auto=format&fit=crop", price: "$550", rating: 4.9, days: "4 kun", category: "Osiyo", description: "Havo sharida parvoz - unutilmas tajriba." },
        { name: "Tokio, Yaponiya", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1920&auto=format&fit=crop", price: "$1200", rating: 4.8, days: "8 kun", category: "Osiyo", description: "Kelajak va an'ananing uyg'unligi — Tokio." },
    ];
    await Tour.insertMany(initialTours);
    console.log('🌱 Boshlang\'ich tur ma\'lumotlari qo\'shildi!');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} da ishlamoqda`);
    console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
});
