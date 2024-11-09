const foodItemDetails=require('../models/adminAddItem');

const editItem=async(req,res)=>{
    // console.log(req.body);
    const {name, description, price, category,id}=req.body;
    try{
        const edited= await foodItemDetails.findByIdAndUpdate(id,{
            $set:{
                productName:name,
                productDescription:description,
                productCategory:category,
                productPrice:price
            }
        });
       if(edited){ 
        console.log("edited");
        res.json({message:"edited"});
    }else{
        res.json({message:"couldn't find item"});
    }
    }catch(err){
        console.log(err);
        res.json(err.message);
    }
}
module.exports=editItem;