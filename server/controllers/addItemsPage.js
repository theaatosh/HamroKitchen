const express=require("express");
const mongoose=require('mongoose');
const multer=require('multer');
const foodItemDetails=require('../models/adminAddItem');
require('dotenv').config();

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload =multer({storage:storage});


const addItemsPage=async (req, res)=>{
        const {name, description, price, category}=req.body;
        const imagePath=req.file.path;
        if (!name || !description || !price || !category) {
            return res.status(400).send("Missing required fields" );
        }else if (!req.file) {
            return res.status(400).send( "No file uploaded" );
        }
        try{
            const newItem = new foodItemDetails({
                image:imagePath,
                productName:name,
                productDescription:description,
                productCategory:category,
                productPrice:price,
            });
            await newItem.save();
            res.status(201).send("Food item added successfully");
        }catch(err){
            res.status(500).send("Error saving item to database");
        }
    };
    
module.exports={upload, addItemsPage};