const Book = require("../models/bookmodel");
const mongoose = require("mongoose");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const postBook = async (req, res) => {
  try {
    req.body.image = req.file.path;
    const book = new Book(req.body);
    await book.save();
    return res.status(200).json("book posted successfully");
  } catch (error) {
    return res.status(400).send("Failed to post book. Error: " + error);
  }
};

const getBooks = async (req, res) => {
  try {
    let books = await Book.find({
      $or: [
        { shortName: { $regex: req.params.key, $options: "i" } }, //search with short name   //$option: "i" makes it case insensitive
        { name: { $regex: req.params.key, $options: "i" } }, //search with full name
        { faculties: { $regex: req.params.key, $options: "i" } }, //serach with faculties
        { seller: { $regex: req.params.key, $options: "i" } }, //serach with faculties
      ],
    });
    res.status(200).send(books);
  } catch (error) {
    res.send("error: " + error);
  }
};

const getSoldBooks = async (req, res) => {
  try {
    let books = await Book.find({
      seller: { $eq: req.params.name },
    });
    res.send(books);
  } catch (error) {
    res.send("error in sold books: " + error);
  }
};

const getFreeBooks = async (req, res) => {
  try {
    let bookss = await Book.find({
      free: { $eq: true },
    });
    res.status(200).send(bookss);
  } catch (error) {
    res.send("error: " + error);
  }
};
const getUnacademicBooks = async (req, res) => {
  try {
    let bookss = await Book.find({
      category: { $eq: "unacademic" },
    });
    res.status(200).send(bookss);
  } catch (error) {
    res.send("error: " + error);
  }
};

const getBook = async (req, res) => {
  try {
    let aBook = await Book.find({
      $or: [
        { _id: new mongoose.Types.ObjectId(`${req.params.id}`) }, //serach with faculties
      ],
    });
    res.status(200).send(aBook);
  } catch (error) {
    res.send("error: " + error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const image = req.headers["img"];
    let todelbook = await Book.deleteOne({
      _id: { $eq: req.params.id },
    });
    // deleting image realated from the upload folder
    fs.unlink(`${image}`, (err) => console.log(err));
    return res.status(200).json("post deleted successfully!!");
  } catch (error) {
    console.log("error while deleteing: " + error);
  }
};

const updateBook = async (req, res) => {
  console.log("asdfasdf");
  try {
    req.body.image = req.file.path;
    await Book.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    return res.status(200).json("updated !!");
  } catch (err) {
    console.log(err);
    return res.status(400).json("updation Error: " + err);
  }
};

module.exports = {
  postBook,
  getBooks,
  getBook,
  getFreeBooks,
  getUnacademicBooks,
  getSoldBooks,
  deleteBook,
  updateBook,
};
