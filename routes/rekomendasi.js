const express = require('express');
const router = express.Router();

// Contoh data rekomendasi habits (biasanya dari database)
const habits = [
    { name: 'Morning Exercise', description: 'Start your day with some stretching and light exercises.', image: 'https://example.com/morning_exercise.jpg' },
    { name: 'Reading', description: 'Allocate some time each day to read a book or an article.', image: 'https://example.com/reading.jpg' },
    { name: 'Meditation', description: 'Practice mindfulness and meditation for mental well-being.', image: 'https://hips.hearstapps.com/hmg-prod/images/running-track-1667904802.jpg?crop=0.668xw:1.00xh;0.0737xw,0&resize=1200:*' }
];

// Menggunakan router.get untuk rute "/rekomendasi" sesuai dengan contoh kode sebelumnya
router.get('/', (req, res) => {
    res.render('rekomendasi', { habits });
});

module.exports = router;
