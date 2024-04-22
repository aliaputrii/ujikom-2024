const Habit = require('../models/habit');


// ini untuk halaman beranda ketika pengguna telah masuk
module.exports.home = async function(req, res){
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }

        let habits = await Habit.find({user: req.user});

        
        res.render('home',{
            title :"home" , 
            habits : habits
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

