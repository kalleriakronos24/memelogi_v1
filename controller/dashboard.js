'use-strict';
const db = require('../database/models/video');
const p_db = require('../database/models/post');

module.exports.FetchAllVids = async (req,res) => {
    const vid = await db.find({});
    res.render('dashboard', {
        vid
    })
}

module.exports.DeleteVid = (req,res) => {
    const vid_id = db.findById({ _id : req.params.id }).remove().exec();
    res.redirect('back');

}

module.exports.DeletePic = (req, res) => {
    const pic_id = p_db.findById({ _id : req.params.id }).remove().exec();
    res.redirect('back');
}