import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  publisher:{
    type:String,
  },
  isbn10:{
    type:String,
    default:"0000000000"
  },
  isbn13:{
    type:String,
    default:"0000000000000"
  },
  asinNumber:{
    type:String,
    default: "0000abcd"
  },
  ebookPrice:{
    type:Number,
    default:0
  },
  urduPrice:{
    type:Number,
    default:0
  },
  author: {
    type: String,
  },
  noOfPages: {
    type: Number,
  },
  format: {
    type: String,
    default: "both",
  },
  description: {
    type: String,
  },
  coverPage: {
    type: String
  },
  book1stpage:String,
  book2ndpage:String,
  book3rdpage:String,
  book4thpage:String,
  book5thpage:String,
  otherCoverPages: {
    type: Array,
    default:[]
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    default:0
  },
  stock: {
    type: Number,
    default: 10
  },
  publishingDate: {
    type: Date,
  },
  language: {
    type: String,
    default: "English"
  },
  dimension: {
    type: String,
    default: "0 x 0 x 0",
  },
  weight: {
    type: String,
    default: "0 ounces",
  },
  fileUrl:{
    type:String,
  },
  reviews: [],
  ratings: {
    type: String,
    default: "0.0"
  },
  fileSize:{
    type:String,
    default: "0"
  },
  urduFile:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Book = mongoose.model("Book", schema);
