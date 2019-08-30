const vidpost = require('../database/models/video')
const Post = require('../database/models/post');

module.exports = async (req, res) => {



    const vidpostz = await vidpost.find({});
    const posts = await Post.find({});

    const user_id = req.session.userId
    const pp = req.session.img
    const user_name = req.session.full_name
    const userid = req.session.real_user_id
    console.log(user_id);
    res.render('index',{
        vidpostz,
        user_id,
        pp,
        user_name,
        userid,
        posts
    })

};
 