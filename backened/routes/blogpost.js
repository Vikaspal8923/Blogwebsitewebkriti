const express = require('express')
const router = express.Router();
 
 
 const{
  createblogpost,
  updateblogpost,
  getblogpost,
  getlatestblogpost,
  getTrendingBlogPosts,
  getRandomBlogPosts,
  getallpostbyalluser,
  getBlogPostByUser,
  deletePost
    
               
 }  = require('../controllers/blogpost');

   const{
    auth
   } = require('../middlewares/auth');

     router.post("/createpost",auth,createblogpost);
     router.post("/updatepost",auth,updateblogpost);
     router.post("/getpost",getblogpost); 
     router.get("/getlatest",getlatestblogpost);
     router.get("/gettrending",getTrendingBlogPosts);
     router.get("/getrandom",getRandomBlogPosts);
    router.get("/allpostbyall",getallpostbyalluser);
    router.post("/allpost",getBlogPostByUser);
    router.post('/deletepost',deletePost);
module.exports = router; 