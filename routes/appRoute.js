const express=require('express');
const router=express.Router();
const Data=require('../models/appModel');
const multer=require('multer');
const fs=require('fs');
const { getData, addNewData, getSingleData, editData, getEditPage, deleteData } = require('../controller/appController');

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>
    {
        cb(null,file.originalname.split(".")[0]+"-"+Date.now()+"."+file.originalname.split(".")[1]);
    }
});

var upload=multer({
    storage:storage,
}).single('image');

//add new data
router.post('/add',upload,addNewData);

//home page
router.get('/',getData);

//View single page
router.get('/:id',getSingleData)

//update page
router.get('/edit/:id',getEditPage);

//update data
router.put('/edit/:id',upload,editData);

//delete
router.delete('/delete/:id',deleteData);


module.exports=router;