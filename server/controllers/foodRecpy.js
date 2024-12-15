const user=require("../models/index");
const {runPythonFunction}=require("../algorithm/test")

const foodRec=async (req,res)=>{
    const {userId}=req.user;
    // console.log("hi")
    try{
        console.log(userId);
        const rec=await user.findById(userId,{_id:0, recData:1});
        const recData=Object.keys(rec);
        // const recData=['fastfood', 'medium', 'veg']
        const data=await runPythonFunction(recData);
        console.log(data);
        res.json(data);
    }catch(err){
        console.log(err);
    }
}

module.exports={foodRec};