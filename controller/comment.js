const db = require('../database/models/comments');

module.exports = (req,res) => {
    db.create({
        name : req.body.usr_name,
        post_id : req.body.post_ids,
        text : req.body.comment_text,
        timez : req.body.comment_time,
        profile_pic : req.body.profile_p
    }, (err, db) => {
        res.redirect('back');
    })
}