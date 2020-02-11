const router = require('express').Router();
const post =require('../Models/Post');
const passport = require("passport");



router.route("/add")
.post( passport.authenticate('jwt', { session: false }),(req, res) =>
 { 
     
    const text = req.body.text.trim();
    
           console.log(text);
            
            const NewPost = new post({
                user:{
                    id:req.user.id,
                    firstname:req.user.firstname,
                    lastname:req.user.firstname
                },
                text,
                
            })
            NewPost.save()
            .then(post=>res.json(post))
            .catch(err=>console.log(err))
  }
);

router.route("/")
.get( passport.authenticate('jwt', { session: false }),(req, res) =>
 { 
       post.find()
       .sort({Date: -1})
       .then(Posts=> res.json(Posts))
       .catch(err=>console.log(err))
 })


 router.route("/:UserId")
 .get((req,res)=>{
     post.find({"user.id":req.params.UserId})
     .sort({Date: -1})
     .then(Posts=> res.json(Posts))
     .catch(err=>console.log(err))
 
 })



 router.route("/like")
 .post( passport.authenticate('jwt', { session: false }),(req, res) =>
  { console.log(req.body.UserId)
 
    // findByIdAndUpdate
      post.findOneAndUpdate(req.body.postId, 
          {$push: {likes: req.body.UserId}}, {new: true})
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: "error pff"
          })
        }
        res.json(result)
      })
    })

    
  
  router.route("/Dislike")
  .post( passport.authenticate('jwt', { session: false }),(req, res) =>
   { console.log(req.body.UserId)
    post.findOneAndUpdate(req.body.postId, 
        {$pull: {likes: req.body.UserId}}, {new: true})
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "pff error"
        })
      }
      res.json(result)
    })
  })






  // router.route("/like")
  // .post( passport.authenticate('jwt', { session: false }),(req, res) =>
  //  { console.log(req.body.postId)
  
  //    // findByIdAndUpdate
  //      post.findOneAndUpdate(req.body.postId, 
  //          {$push: {likes: req.body.UserId}}, {new: true})
  //      .exec((err, result) => {
  //        if (err) {
  //          return res.status(400).json({
  //            error: "error pff"
  //          })
  //        }
  //        res.json(result)
  //      })
  //    })
   
  //  router.route("/Dislike")
  //  .post( passport.authenticate('jwt', { session: false }),(req, res) =>
  //   { console.log(req.body.UserId)
  //    post.findOneAndUpdate(req.body.postId, 
  //        {$pull: {likes: req.body.UserId}}, {new: true})
  //    .exec((err, result) => {
  //      if (err) {
  //        return res.status(400).json({
  //          error: "pff error"
  //        })
  //      }
  //      res.json(result)
  //    })
  //  })
  
  
  





module.exports= router;

