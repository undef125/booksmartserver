const chatModel = require("../models/chatmodel");

const createChat = async (req, res) => {
  const newChat = new chatModel({
      members: [req.body.senderId, req.body.receiverId],
  })
  try {
    const chat = await chatModel.findOne({
        "$or" : [
        {members: { $eq: [req.body.senderId, req.body.receiverId] }},
        {members: { $eq: [req.body.receiverId, req.body.senderId] }},
        ]
      });
      if(!chat) {
        try {
            const result = await newChat.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json("server error");
        }
      } else {
          return res.status(200).json("already created");
    }
  } catch (error) {
    return res.status(500).json("server error");
  }
};

const userChats = async (req, res) => {
  try {
    const chat = await chatModel.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await chatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { createChat, userChats, findChat };
