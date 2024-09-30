const scheduleOder=async (req,res)=>{
    // console.log(req.body);
    const{orderTime}=req.body;
    const{userId}= req.user;
    const time=new Date(orderTime);
    const formattedTime=time.toString();

    console.log(formattedTime , userId );
    res.send("done");
}
module.exports=scheduleOder;