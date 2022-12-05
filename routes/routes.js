const  express=require('express');
const router=express.Router();
const Model=require('../model/model');

//POST
router.post('/createPost',async(req,res)=>{
    const newPost=new Model({
        title:req.body.title,
        author:req.body.author,
        content:req.body.content
     })


     try{
         const result=await newPost.save();  
         res.status(200).json(result);      
     }
     catch(error){

        res.status(400).json({message:error.message})
     }
    //res.send("post created")
})



//Get

router.get('/getAllPost',async(req,res)=>{

    try{
        const result=await Model.find();  
        res.status(200).json(result);      
    }
    catch(error){

       res.status(500).json({message:error.message})
    }
//res.send("All Post Data:-")

})




router.get('/getPost/:id',async(req,res)=>{
    const id=req.params.id

    try{
        const result=await Model.findById(id);  
        res.status(200).json(result);      
    }
    catch(error){

       res.status(500).json({message:error.message})
    }
   // res.send(`Post with id ${id} `)
})


//Patch(Update)
router.patch('/editPost/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const body=req.body;
        const options={new:true}
        const result=await Model.findByIdAndUpdate(id,body,options);  
        res.status(200).json(result);
        res.send(result);     
    }
    catch(error){

       res.status(500).json({message:error.message})
    }

    //res.send(`Edit Post with id ${id} `)
})



//Delete
router.delete('/deletePost/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const result=await Model.findByIdAndDelete(id);  
        res.send(`deleted with id ${id} `)
    }
    catch(error){

       res.status(400).json({message:error.message})
    }
    
    //res.send(`deleted with id ${id} `)
})

module.exports=router;
