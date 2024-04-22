// require the libarary
const mongoose = require('mongoose');

// Error handling
main().catch(err => console.log('Error connecting to db', err));


// terhubung ke database 
async function main()
{
    await mongoose.connect(`mongodb://localhost/habitTrackers_db`);
}

// memperoleh koneksi (untuk memeriksa apakah koneksi berhasil)
const db = mongoose.connection;

db.once('open', function()
{
    console.log('Successfully connected to the database:: MongoDB');
});

module.exports = db;