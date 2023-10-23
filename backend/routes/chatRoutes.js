const express = require('express');
const {
  protect,
  doctorOrPatient,
  verifiedOnly,
} = require('../middleware/AuthMiddleware');
const {
  accessChat,
  fetchChats,
  sendMessage,
  allMessages,
  allDoctors,
} = require('../controllers/chatControllers');

const router = express.Router();

router.route('/doctors').get(protect, doctorOrPatient, allDoctors);
router.route('/').post(protect, doctorOrPatient, accessChat);
router.route('/').get(protect, doctorOrPatient, fetchChats);
router.route('/send').post(protect, doctorOrPatient, sendMessage);
router.route('/:chatId').get(protect, doctorOrPatient, allMessages);

module.exports = router;
