const passport = require('passport');

const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication menggunakan passport
passport.use(new LocalStratergy({
    usernameField: 'username',
    passReqToCallback: true
},
    async function (req, username, password, done) {
        // menemukan pengguna dan menetapkan identitas  
        try{   
        let user = await User.findOne({ username: username });
                if (!user|| password!= user.password ) {
                    // req.flash('success', 'Invalid Password');
                    return done(null, false);
                }
                return done(null, user);
            }
            catch(err) {
                // req.flash('error', err);
                console.log(err);
                return done(err);
            };
    }
));

// membuat serializing pengguna untuk memutuskan kunci mana yang akan disimpan dalam cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});



// memisahkan pengguna dari kunci di dalam cookie
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(
            user => {
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }
                return done(null, user);
                // return done(null, user);
            }
        )
        .catch(err => {
            console.log('Error in finding user--->Passport');
            return done(err);
        });
});


// memeriksa apakah pengguna telah diautentikasi
passport.checkAuthentication = function (req, res, next) {
    // jika pengguna masuk, maka teruskan permintaan ke fungsi berikutnya (controller's action)

    if (req.isAuthenticated()) {
        return next();
    }
    // jika pengguna tidak masuk ke halaman ('/')
    return res.redirect('/');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user berisi pengguna yang masuk saat ini dari cookie sesi dan kami hanya mengirimkannya kepada penduduk setempat untuk dilihat
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;



