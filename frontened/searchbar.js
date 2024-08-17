let searchbaropen = false

 const searchbar = document.getElementById("searchbox");
 const  searchbutton = document.getElementById('search-icon')
 const blogPostsContainer = document.querySelector('.aa-all-search-blog');
 console.log(searchbar)

//
 let allPostByallUser2;
 const GETALLPOSTBYALLUSER_API2 = 'https://blogfusion-backened8923.onrender.com/api/v1/blog/allpostbyall'
 
 async function getAllPostByallUser1(){
  //  authloading = true;
  //  showloadingtoast(authloading);
 
   try {
    const response = await apiconnector("GET",GETALLPOSTBYALLUSER_API2);
 
    console.log("userAllPost API response ..........",response);
 
     if(!response){
          throw new Error(response.data.message);
     }
 
     allPostByallUser2 = response.data.randomBlogs;
 
     console.log(allPostByallUser2)
      //  toastr.success('all blog aa gye hai ','succes');
     
   } catch (error) {
     console.log(error)
     toastr.error(" all post by userId nhi aayi hai",'Error');
   }
  //  authloading = false;
  //  showloadingtoast(authloading);
 }

   

 

 searchbutton.addEventListener('click',async()=>{
                     
    await getAllPostByallUser1();


  if(searchbaropen===false){

     searchbaropen=true;


  }else{
            searchbaropen = false;
            
  }

  if(searchbaropen){

               searchbar.style.display="flex"

         
                  const displayBlogPosts = (posts) => {
                 
                 
                 // Clear previous posts and hide container if no search query
                 blogPostsContainer.innerHTML = '';
                 if (posts.length === 0) {
                     blogPostsContainer.style.display = 'none';

                     return;
                 }
                 if(blogPostsContainer.innerHTML === ''){
                   blogPostsContainer.style.display = 'none';
                 }
                 blogPostsContainer.style.display = 'flex';

                 blogPostsContainer.style.flexDirection = 'column';
             
                 // Loop through and display the filtered posts
                 posts.forEach(post => {
                     // Limit title to the first 10 words
                     const truncatedTitle = post.title.split(' ').slice(0, 10).join(' ') + (post.title.split(' ').length > 10 ? '...' : '');
                     
                     const postElement = document.createElement('div');
                     postElement.classList.add('blog-post');
                     
                     postElement.innerHTML = `<a style="text-decoration: none; font-size: 20px;" href="previewblog.html?postid=${post._id}">${truncatedTitle}</a>`;

                     console.log(" loda post id aa gi h",post._id);
                     blogPostsContainer.appendChild(postElement);

                 });
                 
             };

            

             searchbar.addEventListener('input', (event) => {
                 const query = event.target.value.toLowerCase();
             
                 // Filter blog posts based on the search query
                 const filteredPosts = allPostByallUser2.filter(post => 
                     post.title.toLowerCase().includes(query) || 
                     post.content.toLowerCase().includes(query)
                 );

                 // Display filtered blog posts
                 displayBlogPosts(filteredPosts);
                
             });

             searchbutton.addEventListener("click", () => {
              console.log("loda  div bnd nhi ho rha hai")
              blogPostsContainer.style.display = 'none';
             
               searchbar.value = '';
                
           });

            
  }else{    
   

       searchbar.style.display='none';
               
  }
  
})

 
 if(!searchbaropen){

   searchbar.style.display = "none";
 }