

const express = require('express')
const router = express.Router();

const {isAuthentificationUser, authorizeRoles } = require('../middlewares/auth');
const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog, getAdminAllBlogs } = require('../controllers/blogController');


router.route('/admin/blog/new').post(isAuthentificationUser,authorizeRoles('admin'),createBlog);
router.route('/blogs').get(getAllBlogs)
router.route('/blogs/blog/:id').get(getSingleBlog)
router.route('/admin/blog/:id').put(isAuthentificationUser,authorizeRoles('admin'),updateBlog)
router.route('/admin/blog/:id').delete(isAuthentificationUser,authorizeRoles('admin'),deleteBlog)

router.route('/admin/blogs').get(isAuthentificationUser,authorizeRoles('admin'),getAdminAllBlogs)




module.exports = router;