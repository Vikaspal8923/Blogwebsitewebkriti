 // creating instance
const express = require('express');
const app = express();
const multer = require('multer');
//env
require("dotenv").config()
//multer
 

 
//fetch routes
const userroutes = require("./routes/user");
const profileroutes = require('./routes/profile');
const likeroutes = require("./routes/like");
const categoryroutes = require("./routes/category")
const  blogpostroutes = require("./routes/blogpost");
const sitemapRoutes = require('./routes/sitemap'); // Import the sitemap route

// db connection function 

const dbconnect = require("./config/database");

const cookieparser = require('cookie-parser');
const cors =require('cors');

//cloudinary connection
const  {cloudinaryconnect} = require("./config/cloudinary");
const fileupload = require("express-fileupload");

//port intialisation
const PORT = process.env.PORT 

//db connection call

dbconnect();

//middlewares
app.use(express.json()); 
// app.use(cookieparser());

app.use(
     
      cors({
               origin: [
                'https://blogfusion123.vercel.app',
                'http://127.0.0.1:5500'
                       
                       ],
               credentials:true
      })
)

app.use( 
               fileupload({
                       useTempFiles:true,
                    tempFileDir: "/tmp"
               })
)

//cloudinary connection call
cloudinaryconnect();

//routes
app.use("/api/v1/auth",userroutes);
app.use("/api/v1/profile",profileroutes)
app.use("/api/v1/like",likeroutes);
app.use("/api/v1/category",categoryroutes);
app.use('/api/v1/blog',blogpostroutes);
app.use( sitemapRoutes); // Use the sitemap route


// app.get('/sitemap.xml', async (req, res) => {
//     try {
//         // Fetch the dynamic sitemap from the backend
//         console.log(" sit map start")
//         const response = await fetch('https://blogfusion-backened8923.onrender.com/sitemap.xml');
//         console.log(" sit map start 2")
//         // Check if the response is ok (status code in the range 200-299)
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
            
//         // Read the sitemap data
//         const sitemap = await response.text();

//         // Set the appropriate headers for XML content
//         console.log(" sit map start 3")
//         res.setHeader('Content-Type', 'application/xml');
//         res.status(200).send(sitemap);
//     } catch (error) {
//         console.error('Error fetching sitemap:', error);
//         res.status(500).send('Error generating sitemap');
//     }
// });

 



app.listen(PORT,()=>{
           console.log(`app is running at ${PORT}`);
})
