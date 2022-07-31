const express = require('express');
const authenticateToken = require('./../controller/jwtcontroller');
const router = express.Router();
const multer = require("multer");

//multer
const upload = multer({ dest: './uploads'}); 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const { postBook, getBooks, getBook,getFreeBooks,getUnacademicBooks,getSoldBooks, deleteBook, updateBook } = require('../controller/bookscontroller');
const { loginUser, signUpUser,sendOTP, getUsers } = require('../controller/usercontroller');
const { createChat, userChats, findChat } = require("../controller/chatcontroller");
const { addMessage, getMessages,getnothing } = require("../controller/messagecontroller");

router.post('/postbook',[multer({storage: storage}).single('image'), authenticateToken], postBook);  //sellbook
router.get('/getbooks/:key',authenticateToken, getBooks);                                           //get searched books
router.get('/getfreebooks',authenticateToken, getFreeBooks);                                        //get free books
router.get('/unacademicbooks',authenticateToken, getUnacademicBooks);                               //get unacademic books
router.get('/getbook/:id',authenticateToken, getBook);                                              //view detail of single book
router.get('/soldbooks/:name',authenticateToken, getSoldBooks);                                              //view books of specific person
router.post('/login', loginUser);                                                                   //login api
router.post('/signup', signUpUser);                                                                 //signup api
router.post('/getotp', sendOTP);     
router.delete('/delete/:id', authenticateToken, deleteBook);                                                            //get otp api
router.put('/update/:id', [multer({storage: storage}).single('image'), authenticateToken], updateBook);                                                            //get otp api
router.get('/getuser/:userid', getUsers);

//chat routes

router.post('/chat', createChat)
router.get("/chat/:userId", userChats);
router.get("/chat/find/:firstId/:secondId", findChat);

//message routes

router.post('/msg/', addMessage);
router.get('/msg/:chatId', getMessages)


router.get('/', getnothing)


module.exports = router;