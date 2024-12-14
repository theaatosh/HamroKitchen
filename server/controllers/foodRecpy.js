const user=require("../models/index");
const {runPythonFunction}=require("../algorithm/test")

const foodRec=async (req,res)=>{
    // const {userId}=req.user;
    try{
        const recData=['fastfood', 'medium', 'veg']
        const data=await runPythonFunction(recData);
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
foodRec();