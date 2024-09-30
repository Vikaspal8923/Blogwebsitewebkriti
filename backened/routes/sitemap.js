const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const Blogpost = require('../models/blogpost'); // Adjust the path to your Blogpost model
const router = express.Router();


// Route to generate sitemap
router.get('/sitemap.xml', async (req, res) => {
    try {
        // Create a stream to write to
        const sitemapStream = new SitemapStream({ hostname: 'https://blogfusion123.vercel.app' });

        // Fetch all blog posts from your database
        const blogPosts = await Blogpost.find(); // Ensure this returns all the necessary blog post URLs

        // Add each blog post to the sitemap
        blogPosts.forEach((post) => {
            sitemapStream.write({
                url: `/previewblog.html?postid=${post._id}`, // Adjusting URL structure based on your blog's URL format
                changefreq: 'daily',
                priority: 0.7,
                lastmod: post.updatedat // Assuming you have a timestamp for when the post was last updated
            });
        });

        // End the stream
        sitemapStream.end();

        // Convert the stream to a string and send it as a response
        const sitemap = await streamToPromise(sitemapStream);
        res.header('Content-Type', 'application/xml');
        res.send(sitemap.toString());
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Error generating sitemap');
    }
});

module.exports = router;