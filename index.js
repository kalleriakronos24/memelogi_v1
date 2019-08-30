// module and package

const express = require('express');
const app = new express();
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const home_page_controller = require('./controller/homePage');
const pictures_controller = require('./controller/pictures');
const video_controller = require('./controller/video');
const comment_controller = require('./controller/comment');
const dashboard_cont = require('./controller/dashboard');
const user_controller = require('./controller/user');
const login_controller = require('./controller/login');
const expressSession = require('express-session');
const auth = require('./middleware/auth');
const logout = require('./controller/logout');
const edge = require('edge.js');
const connectMongoo = require('connect-mongo');
const mongoStore = connectMongoo(expressSession);
const comment_middleware = require('./middleware/comment');
// --------------------------------------------------------------
 

// functions and database connection

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(expressEdge);

mongoose.connect('mongodb://localhost/Go-Blog')

app.use(expressSession({
    secret : 'secret',
    store : new mongoStore({
        mongooseConnection : mongoose.connection
    })

}))

app.use(fileUpload())

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId);
    next();
})

app.set('views', `${__dirname}/views`)

// ----------------------------------------------------------------------

// prevent empty value

const validateFormSubmit = (req, res, next) => {

    if(!req.body.username || !req.body.title || !req.body.description || !req.body.content){
      console.log('wkwkw')
    }
    next()
}
 
// --------------------------------------------------------
 
    
  
// Route 
 
app.get('/', home_page_controller)
app.get('/post/v/:id', video_controller.viewPost)
app.get('/post/p/all', pictures_controller.Show)
app.get('/c-pict', pictures_controller.DisplayPageCreate);
app.get('/post/v/all', video_controller.IndexVideo)
app.post('/posts/store/vid', video_controller.Create);
app.post('/posts/store/pic', pictures_controller.Create);
app.post('/posts/edit/pic', pictures_controller.Update);
app.get('/edit/pic/:id', pictures_controller.RenderEditPage);
app.get('/dashboard/vid', dashboard_cont.FetchAllVids);
app.get('/delete/vid/:id', dashboard_cont.DeleteVid);
app.get('/delete/pic/:id', dashboard_cont.DeletePic);
app.post('/user/sign-up', user_controller.Create);
app.post('/user/login', login_controller);
app.get('/user/logout', logout);
app.get('/c-vid', video_controller.DisplayPageCreate);
app.get('/dashboard/pic', pictures_controller.ShowOnDashboard);
 
app.post('/submit/comment', comment_controller);

app.get('/profile/:id/:name', (req, res) => {
    res.render('profile');
})
       
// -------------------------------------------------------
 
app.listen(3000,'localhost', () => { 
    console.log('App Is Linten InPort 3000');
})    