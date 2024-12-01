const user=require("../models/index");
const nodemailer=require('nodemailer');

function generateOTP(){
    const otp=Math.floor(100000+Math.random()*900000)
    return otp.toString();
    }


async function sendEmailOTP(email, otp){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'hamrokitchen1122@gmail.com',
          pass: 'yfjz fird rxew vgnr', 
        },
      });
      const mailOptions = {
        from: 'hamrokitchen1122@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It will expire in 3 minutes.`,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully to', email);
        return true;
      } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
      }
}

const forgetPassword=async(req,res)=>{
    const {email}=req.body;
    console.log(email);
    try{
        const find = await user.findOne({email:email});
        if(find){
            const otp=generateOTP().toString();
            const otpExpiry=Date.now()+3*60*1000;
            try{
                const update=await user.findOneAndUpdate({email:email},{
                   $set:{
                    otp:otp,
                    otpExpiry:otpExpiry,
                   }
                })
                if(update){
                   const sendmail= await sendEmailOTP(email, otp);
                   if(sendmail){
                    console.log("here");
                    res.status(200).json({message:"otp send"});
                   }else {
                    res.status(500).json({ message: "Failed to send OTP email" });
                  }
                }
            }catch(err){
                res.send("error while updating database");
            }
        }else{
            res.status(404).json({message:"can,t find email"});
        }
    }catch(err){
        console.log(err);
    }
}

const {hashPassword}=require("../controllers/index");

const verifyOTP=async(req,res)=>{
    const {email, otp}=req.body;
    console.log(otp);
    console.log(email);
    
    try{
        const find= await user.findOne({email:email});
        
        if(find.otp.toString()=== otp.join("")){
            console.log("here");
            
            if(find.otpExpiry<Date.now()){
                res.status(400).status(400).json({message:'otp has been expired'});
            }else{
                console.log("here2");
                
                  res.status(200).json({message:"otp verified"});               
            }
        }else{
            console.log("here3");
            
            res.status(400).json({message:"invalid otp"});
        }
    }catch(err){
        console.log(err);
    }
}

const changePassword=async(req,res)=>{
    const {email,password}=req.body;
    console.log(password);
    try{
        let hashedPassword= await hashPassword(password);

        const find= await user.findOneAndUpdate({email:email},{
            $set:{
                password: hashedPassword,
            }
        });
        const update=await user.findOneAndUpdate({email:email},{
            $unset:{
                otp:"",
                otpExpiry:'',
            }
        })
        if(find && update){
            res.status(200).json({message:"password changed succesfully"});
        }else{
            res.status(400).json({message:"cant update"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server problem"});
    }
}


module.exports={forgetPassword,verifyOTP,changePassword}