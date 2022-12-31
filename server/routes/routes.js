const express = require('express');
const User = require('../models/users');
const Categories = require('../models/categories');
const Article = require('../models/article');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;
const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', async(req, res) => {
    
    let {name, phone, email, password} = req.body
    let userType = 'user';
    if(password){
        password = await bcrypt.hash(password,salt);
    }
    User.findOne({email: email}).then(user=>{
        if(user){
            res.status(400).json({
                success: false,
                error:{
                    name: 'Register',
                    message: 'Email already exists'
                }
            })
        }else{
            let user = new User({name, phone, email, password, userType})
            user.save().then(
                (user) => {
                res.status(201).json({
                    success: true,
                    message: 'User Created successfully!',
                    data: user
                });
                }
            ).catch(
                (error) => {
                res.status(400).json({
                    error: error,
                    success: false,
                });
                }
            );
        }
    })
    
})


router.post('/login', async(req,res) => {
    const {email,password}= req.body;
    
    // we made a function to verify our user login
    const response = await verifyUserLogin(email, password);
    if(response.status===true){
        // storing our JWT web token as a cookie in our browser
        res.status(201).json({
            success: response.status,
            name: 'Login',
            message: 'User Login Successfully!',
            data: response.data
        });
    }else{
        res.json(response);
    }
})

router.post('/add-article', async(req, res) => {
    
    if(req.body){
        let article = new Article(req.body)
        article.save().then(
            (article) => {
            res.status(201).json({
                success: true,
                message: 'Article Created successfully!',
                data: article
            });
            }
        ).catch(
            (error) => {
            res.status(400).json({
                error: error,
                success: false,
            });
            }
        );
    }
})

router.get('/all-categories', function(req, res) {
    Categories.find({}, function(err, categories){
      if (err)
          return done(err);
  
      if (categories) {
        res.status(201).json({
            success: true,
            message: 'Categories Get successfully!',
            data: categories
        });
      }
    });
});

const verifyUserLogin = async (email,password)=>{
    
    try {
        const user = await User.findOne({email}).lean()
        
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(password,user.password)){
            
            // creating a JWT token
            token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})

            return {
                status: true,
                token: token,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    token: token,
                }
            }
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

module.exports = router;