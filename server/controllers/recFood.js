const user=require('../models/index');
const recFood=async(req,res)=>{
    const{foodType, spiceLevel, dietType}=req.body;
    const{userId}=req.user;
    try{
        const update= await user.findByIdAndUpdate(userId,{
            $set:{
                recData:{
                    foodType,
                    spiceLevel,
                    dietType,
                }
            }
        })
        if(update){
            res.status(200).json({message:"saved"});
        }else{
            res.status(404).json({message:"user not found"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error"+err });
    }
}