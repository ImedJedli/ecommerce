const express = require('express');
const router = express.Router();

const {isAuthentificationUser, authorizeRoles } = require('../middlewares/auth')
router.get('/avatars/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../public/avatars', req.params.filename);
    res.sendFile(filePath);
  });


const { registerUser ,loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails, updateUser, deleteUser} = require('../controllers/usersController');
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthentificationUser,logout);
router.route('/me').get(isAuthentificationUser,getUserProfile);
router.route('/password/forgot').post(isAuthentificationUser,forgotPassword);
router.route('/password/reset/:token').put(isAuthentificationUser,resetPassword);


router.route('/password/update').put(isAuthentificationUser,updatePassword)
router.route('/me/update').put(isAuthentificationUser,updateProfile) 

router.route('/admin/users').get(isAuthentificationUser,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id').get(isAuthentificationUser,authorizeRoles('admin'),getUserDetails)
                              .put(isAuthentificationUser,authorizeRoles('admin'),updateUser)
                              .delete(isAuthentificationUser,authorizeRoles('admin'),deleteUser)



module.exports = router;