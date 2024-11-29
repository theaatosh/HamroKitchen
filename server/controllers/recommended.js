const runPythonFunctio=require("../algorithm/test");
const user=require("../models/index");
const recommended=async(req,res)=>{
    const {userID}=req.user;
    try{
        const userPreference= await user.findById(userID,{_id:0,recData:1});
        if(!userPreference){
            res.send("no data recommended show manually");
        }else{
            const data=runPythonFunctio(userPreference);
            if(!data){
                res.status(404).send("no data found");
            }else{
                
            }
        }
    }catch(err){
        console.log(err);
    }
}