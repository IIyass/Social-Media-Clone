const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const user =require('../Models/User');
const passport = require("passport");


router.route('/Register')
.post((req,res)=>{

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.Password, salt, function(err, hash) {
            const newUser = new user({
                Email:req.body.Email,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
              
                Password:hash
            })
            newUser.save()
            .then(newUser=>res.json(newUser))
            .catch(err=>console.log(err));
        });
    });
});


router.route('/login')
.post((req,res)=>{
    user.findOne({Email:req.body.Email}).
            then(user=>{

            if(user){
                bcrypt.compare(req.body.Password,user.Password).
                then(isMatch=>{
                    if(isMatch){
                           const token = jwt.sign({id:user._id} ,'secret', {expiresIn:"1d"},function(err,token){
                               return res.json({
                                   success:true,
                                   token:token
                               })
                                   
                               
                           });
                    }
                    else{
                        return res.status(404).json({message:"Password does not match"});
                    }

                })
        }
        else{  
            return res.status(404).json({message:"Email does not exist"});
        }
    })
});


router.route("/")
.get( passport.authenticate('jwt', { session: false }),(req, res) =>
 { 
     console.log("her");
        res.json({
            _id:req.user._id,
            Email:req.user.Email,
            firstname:req.user.firstname,
            lastname:req.user.firstname,
            followers:req.user.followers,
            following:req.user.following,
            Picture:req.user.Picture,
            likes:req.user.likes
        })
    }
);


router.route("/:UserId")
.get((req,res)=>{
    user.findById(req.params.UserId)
.then(user=>{
if(user){
return res.json({
    _id:user._id,
    firstname:user.firstname,
    lastname:user.lastname,
    followers:user.followers,
    following:user.following,
    Email:user.Email
    
})
}else{
    res.status(404).json("User Not Found")
}})})


router.route("/follow")
.post( passport.authenticate('jwt', { session: false }),(req, res) =>

 { 
    user.findOneAndUpdate({
        _id:req.user.id
    },{
            $push:{following:req.body.UserId}
    },
            {new:true})
            .then(User=>{
                user.findOneAndUpdate({
                    _id:req.body.UserId},{
                        $push:{followers: req.user.id}
                    },
                        {new:true})
                        .then(user=>{
                    res.json({UserId:req.body.UserId})
                        })
                        .catch(err=>{
                            console.log(err)
                        })
            })
            .catch(err=>console.log(err))


        });

router.route("/unfollow")
.post( passport.authenticate('jwt', { session: false }),(req, res) =>

 { 
    user.findOneAndUpdate({
        _id:req.user.id
    },{
            $pull:{following:req.body.UserId}
    },
            {new:true})
            .then(User=>{
                user.findOneAndUpdate({
                    _id:req.body.UserId},{
                        $pull:{followers: req.user.id}
                    },
                        {new:true})
                        .then(user=>{
                    res.json({UserId:req.body.UserId})
                        })
                        .catch(err=>{
                            console.log(err)
                        })
            })
            .catch(err=>console.log(err))


        });


router.route("/search")
.post((req,res)=>{
    user.findOne({
        $or:[
            {Email:req.body.term},
            {lastname:req.body.term}
        ]
    })
    .then(User=>
        res.json({UserId:User._id})
    )
    .catch(err=>res.status(404).json({msg:"User not Found"}))
});







module.exports= router;

