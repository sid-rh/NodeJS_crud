const mongoose=require('mongoose');
const Data=require('../models/appModel');
const fs=require('fs');

const getData=(req,res)=>{
    Data.find()
        .then((data)=>{
            res.render('index',{
                title:'Home Page',
                data: data,
            })
        })
        .catch((err)=>
        {
            res.json({message: err.message});
        })
        
    }

const getSingleData=(req,res)=>
{
    const id=req.params.id;

    Data.findById(id)
        .then(data=>
            {
                if(data===null)
                {
                    res.redirect('/');
                }
                else
                {
                    res.render('viewData',{
                        title: 'View Data',
                        data:data,
                    })
                }
            })
        .catch(err=>
            {
                res.redirect('/');
            })
}

const addNewData=(req,res)=>{

    // const title=req.body.title;
    const data=new Data({
        title: req.body.title,
        description: req.body.description,
        image: req.file?.filename    
    });
    data.save()
        .then((result)=>
        {
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })
}

const editData=(req,res)=>
{
    const id=req.params.id;
    var new_image='';

    if(req.file)
    {
        new_image=req.file.filename;
        try
        {
            fs.unlinkSync('./uploads/'+req.body.old_image);
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        new_image=req.body.old_image;
    }

    Data.findByIdAndUpdate(id,{
        title: req.body.title,
        description: req.body.description,
        image: new_image,
    })
    .then(result=>
        {
            res.redirect('/');
        })
    .catch(err=>
        {
            res.json({message: err.message});
        })
}

const getEditPage=(req,res)=>{
    const id=req.params.id;
    Data.findById(id)
        .then(data=>
            {
                if(data===null)
                {
                    res.redirect('/');
                }
                else
                {
                    res.render('editData',{
                        title: 'Update Data',
                        data: data,
                })
            }
                
            })
            .catch(err=>
            {
                res.redirect('/');
            })
    
}

const deleteData=(req,res)=>
{
    const id=req.params.id;
    Data.findByIdAndRemove(id)
        .then(result=>
            {
                if(result.image!=''||result.image!=undefined)
                {
                    try {
                        fs.unlinkSync('./uploads/'+result.image);
                    } catch (err) {
                        console.log(err);
                    }
                }

                res.redirect('/');

            })
        .catch(err=>
            {
                res.json({message: err.message});
            })
}



module.exports={
    getData,
    addNewData,
    getSingleData,
    editData,
    getEditPage,
    deleteData,
}