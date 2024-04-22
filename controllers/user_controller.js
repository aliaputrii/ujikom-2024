const User = require('../models/user');

// ini untuk masuk sebagai pengguna
module.exports.signIn = async function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/home');
     }
    res.render('sign_in', {
        title: "Sign In page"
    });
}
// ini untuk mendaftarkan pengguna

module.exports.signUp = async function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect('/home');
     }
    res.render('sign_up', {
        title: "Sign Up Page"
    });
}


// ini untuk membuat pengguna setelah mendaftar
module.exports.create = async function (req, res) {
    try {
        let user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (user) {
            console.log('Already Registered');
            return res.redirect('back');
        }
        else {
            if (req.body.password != req.body.confirm_password) {
                console.log('Passwords do not match');
                return res.redirect('back');
            } else {
                console.log(req.body.username);
                let user = await new User({
                    username : req.body.username,
                    password : req.body.password
                });
                user.save();
                // console.log(user);
                console.log("User created!!");

                return res.redirect('/');
            }
        }
    } catch (err) {
        console.log('Error in creatiing user', err);
    }
}

// ini untuk membuat sesi setelah masuk dari pasport

module.exports.createSession =  function (req, res) {
    res.redirect('/habit');
}


// ini untuk destroy sesssion(menghapus)
module.exports.destroySession = function (req, res) {
    req.logout(err => {
        console.log(err);
    });
    return res.redirect('/');
} 


