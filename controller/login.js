const User = require('../database/models/user');
const bcrypt = require('bcrypt');

module.exports = (req,res)  => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email }, (error,user) => {

        if(user){

        bcrypt.compare(password, user.password, (error, result) => {

            if(result){
                req.session.real_user_id = user.user_id
                req.session.userId = user._id
                req.session.img = user.profile_pic
                req.session.full_name = user.full_name
                res.redirect('back')
            }else{
               res.redirect('/');
            }
        })

        } else {
          console.log('user tidak ditemukan');
        }
    })
}