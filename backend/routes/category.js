
const express = require('express')
const router = express.Router();
const { isAuthentificationUser, authorizeRoles} = require('../middlewares/auth');

const { getAllCategories, newCategory, getSingleCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/categories').get(getAllCategories);
router.route('/category/new' ).post(isAuthentificationUser,authorizeRoles('admin'),newCategory);
router.route('/category/:id').get(isAuthentificationUser,authorizeRoles('admin'),getSingleCategory);
router.route('/category/:id').put(isAuthentificationUser,authorizeRoles('admin'),updateCategory);
router.route('/category/:id').delete(isAuthentificationUser,authorizeRoles('admin'),deleteCategory);


module.exports = router;