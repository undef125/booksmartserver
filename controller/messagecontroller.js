const messageModel = require("../models/messagemodel");

const addMessage = async(req, res) => {
    const { chatId, senderId, text} = req.body;
    const message = new messageModel({
        chatId,
        senderId,
        text,
    });
    console.log(message)
    try {
        const result = await message.save();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};


const getMessages = async(req,res) => {
    const { chatId } = req.params;
    try {
        const result = await messageModel.find({
            chatId
        });
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getnothing = async(req,res) => {
    return res.status(200).json("welcome to booksmart from heroku hehe !!");
}

module.exports = { addMessage, getMessages,getnothing};