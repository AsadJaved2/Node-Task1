const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const checkBlogOwner = require('../middleware/middleware');

router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', checkBlogOwner, blogController.updateBlog);
router.delete('/:id', checkBlogOwner, blogController.deleteBlog);

module.exports = router;
