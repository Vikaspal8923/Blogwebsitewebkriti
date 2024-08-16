const User = require('../models/user')
const Blogpost = require("../models/blogpost")
const Comment = require('../models/comment');


// add comment
// delete comment
// edit comment

exports.addcomment = async(req,res)=>{

    try{

   
               console.log(' before comemnt req.body')
              //fetch data from reqest ki body
              const {comment1,postid,userid} = req.body;
              console.log('comemnt req.body')


              // if(!comment || !postid){
                             
              //         return res.status(402).json({
              //                success:false,
              //                message:'empty-field'
              //         })
              // }


              //check user exit or not

        // const user = await User.findById(userid);

        // if(!user){
             
        //      return res.status(402).json({
        //          success:false,
        //          message:'Not-register'
        //      })
        // }
     
         // check post exit or not

        //  const post = await Blogpost.findById(postid);

        //  if(!post){
               
        //      return res.status(402).json({
        //             success:false,
        //             message:'post-not-found'
        //      })
        //  }
         //check alreadycomment or not

        //   const checkcomment = await  Comment.findOne({post:postid,user:userid})

        //    if(!checkcomment){
               
        //     return res.status(402).json({
        //         success:false,
        //         message:'already-comment'
        //  })

        //    }
         // create comment
         console.log(' before comemnt add ho chuka hai')
         const commentresponse1 = await  Comment.create({commentdesc:comment1,post:postid,user:userid });

         const commentresponse = await  Comment.findOne({commentdesc:comment1,post:postid,user:userid }).populate('user');
              const blogpost = await Blogpost.findByIdAndUpdate(postid,{ $push:{comment:commentresponse._id} },{new:true})
                console.log('comemnt add ho chuka hai',commentresponse)
              return res.status(200).json({
                         
                success:true,
                message:'comment-successfully',commentresponse
        })



    }catch(error){
              
        return  res.status(402).json({
                   
                        success:false,
                        message:'comment-api-fail'
        })
}





}

 

// exports.editcomment = async(req,res)=>{
        
//     try{

   
               
//         //fetch data from reqest ki body
//         const {updatedcomment,postid} = req.body;
//         const userid = req.user.id;


//         if(!updatedcomment || !postid){
                       
//                 return res.status(402).json({
//                        success:false,
//                        message:'empty-field'
//                 })
//         }


//         //check user exit or not

//   const user = await User.findById(userid);

//   if(!user){
       
//        return res.status(402).json({
//            success:false,
//            message:'Not-register'
//        })
//   }

//    // check post exit or not

//    const post = await Blogpost.findById(postid);

//    if(!post){
         
//        return res.status(402).json({
//               success:false,
//               message:'post-not-found'
//        })
//    }
        
    

//    // update comment

//    const commentresponse = await  Comment.findOneAndUpdate({post:postid,user:userid},{comment:updatedcomment},{new:true});

    

          
//         return res.status(200).json({
                   
//           success:true,
//           message:'edit-comment-successfully'
//   })



// }catch(error){
        
//   return  res.status(402).json({
             
//                   success:false,
//                   message:'editcomment-api-fail'
//   })
// }
// }


// exports.deletecomment = async(req,res)=>{

//      try{


                          
//                       const{comment,postid}= req.body;
//                       const userid = req.user.id;

//                       if(!comment || !postid ){
//                          return res.status(402).json({
                                      
//                             success:false,
//                             message:'empty-field'
//                          })
//                       }


//                       //check user exist or not

//                       const user = await User.findById(userid);

//                       if(!user){
                           
//                          return res.status(402).json({
                                      
//                                   success:false,
//                                   message:'Not-register'
//                          })
//                       }


//                       const deletecomment = await Comment.findOneAndDelete({comment:comment,post:postid,user:userid});
                       
//                       const blogpost =await Blogpost.findByIdAndUpdate(postid,{$pull:{comment:deletecomment._id}},{new:true});


//                       return res.status(200).json({
//                           success:true,
//                           message:"comment-deleted-successfully"
//                       })


//                     }catch(error){
                 
//                       return res.status(402).json({
                                   
//                                    success:true,
//                                    message:'deletecomment-api-fail'
         
//                       })
//               }
// }


exports.getallcommentofapost = async(req,res)=>{

  try{

  
                     
                     const{postid}=req.body;
                     
                
                      if(!postid){
                            return res.status(402).json({
                                    success:false,
                                    message:'empty-field'
                            })
                      }

                   
                      const  allcomment = await  Comment.countDocuments({post:postid});
                    //  console.log(" all comment successfully");
                      return res.status(200).json({
                                    
                              success:true,
                              message:"getallcomment-successfully",
                              allcomment
                      })

                  }catch(error){
                      console.log('Error occur while fetching alllikes on a post : ',error);
                       
                       return  res.status(402).json({
                                      
                                success:false,
                                message:'likesonapost-api-fail'
                       })

                  }
}


exports.getallcomment = async(req,res)=>{

  try{
    console.log(" before all comment post id hai")
  
                     
                     const{postid}=req.body;
                     
                    console.log(" all comment post id hai:",postid)
                      if(!postid){
                            return res.status(402).json({
                                    success:false,
                                    message:'empty-field'
                            })
                      }

                      console.log("  before all commentedvery successfully");
                      const  allcomments = await  Comment.find({post:postid}).sort({ createdat:-1}).populate("user");
                     console.log(" all commentedvery successfully");
                      return res.status(200).json({
                                    
                              success:true,
                              message:"getallcomment-successfully",
                              allcomments
                      })

                  }catch(error){
                      console.log('Error occur while fetching allcomments on a post : ',error);
                       
                       return  res.status(402).json({
                                      
                                success:false,
                                message:'commentonapost-api-fail'
                       })

                  }
}