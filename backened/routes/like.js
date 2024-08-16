const express = require('express')
const router = express.Router();
 
 
 const{
    like,
    unlike,
    getalllikeofapost,
    likestatus,
    getallcountofapost
               
 }  = require('../controllers/like');
 const{
  getallcommentofapost,

  addcomment,
  getallcomment
 

 } = require('../controllers/comment')

   const{
    auth
   } = require('../middlewares/auth');

     router.post("/like",like);
     router.post("/unlike",unlike);
     router.post("/getlikesofapost",getalllikeofapost);
     router.post("/getcommentofapost",getallcommentofapost);
     router.post("/islike",likestatus);
     router.post("/addcomment",addcomment);
     router.post("/getcomments",getallcomment);
     router.post("/setview",getallcountofapost);

     
module.exports = router; 