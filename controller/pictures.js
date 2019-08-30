const Post = require('../database/models/post')
const path = require('path');

module.exports.DisplayPageCreate = (req,res) => {
    res.render('c-pict');
} 


module.exports.Show = async (req,res) => {
    const user_id = req.session.userId
    const pp = req.session.img
    const user_name = req.session.full_name
    const userid = req.session.real_user_id
    const posts = await Post.find({})
    console.log(req.session);
    res.render('pictures',{
        posts,
        user_id,
        pp,
        user_name,
        userid
    })
} 

module.exports.ShowOnDashboard = async (req, res) => {
    const postp = await Post.find({});
    res.render('indexpic', {
        postp
    })
}

module.exports.Create = (req, res) => {

    let sampleFile;

    if(Object.keys(req.files).length == 0){
        res.status(400).send('No Files were uploaded');
        return res.redirect('back');
    }

    console.log('req.files >>>', req.files);

    sampleFile = req.files.imagez;

    sampleFile.mv(path.resolve(__dirname, '/Go-Blog/public/pictures', sampleFile.name), (err) => {
        
    Post.create({
        postp_id : req.body.post_id,
        uploader : req.body.uploader,
        caption : req.body.caption,
        source : req.body.source,
        time : req.body.posted_time,
        image: `/pictures/${sampleFile.name}`
    })
        if(err){
            return res.status(500).send(err);
        }
        res.status(200);
        res.redirect('back');
    })

  
}

module.exports.Update = (req, res) => {

   
    
    let sampleFile;

    if(Object.keys(req.files).length == 0){
        res.status(400).send('No Files were uploaded');
        return res.redirect('back');
    }

    console.log('req.files >>>', req.files);

    sampleFile = req.files.imagez;

    sampleFile.mv(path.resolve(__dirname, '/Go-Blog/public/pictures', sampleFile.name), (err) => {
    
    const update = Post.update({ _id : req.params.id }, {
        $set : {
            source : req.body.source,
            captioon : req.body.caption,
            image : `/pictures/${sampleFile.name}`
        }
    })
        if(err){
        return res.status(500).send(err);
         }
            res.status(200);
            res.redirect('back');
    })

    
}

module.exports.RenderEditPage = async (req, res) => {
    const fetch_pic_details = await Post.findById(req.params.id);
    res.render('e-pict', {
        fetch_pic_details
    })
}