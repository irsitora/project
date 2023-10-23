const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginStatus,
  upgradeUser,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
} = require('../controllers/userControllers');

const {
  protect,
  adminOnly,
  authorOnly,
} = require('../middleware/AuthMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getUser', protect, getUser);
router.get('/getUsers', protect, authorOnly, adminOnly, getUsers);
router.patch('/updateUser', protect, updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);
router.get('/loginStatus', loginStatus);
router.post('/upgradeUser', protect, adminOnly, upgradeUser);

// ! Send Email --------
router.post('/sendAutomatedEmail', protect, sendAutomatedEmail);
router.post('/sendVerificationEmail', protect, sendVerificationEmail);
router.patch('/verifyUser/:verificationToken', verifyUser);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:resetToken', resetPassword);
router.patch('/changePassword', protect, changePassword);

router.post('/sendLoginCode/:email', sendLoginCode);
router.post('/loginWithCode/:email', loginWithCode);

// ! Google Auth
router.post('/google/callback', loginWithGoogle);

module.exports = router;
