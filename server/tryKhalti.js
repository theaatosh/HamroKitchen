const axios=require('axios');
require('dotenv').config();

const khalti= async (req,res)=>{
    try{
        const headers={
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
       "Content-Type": "application/json",
    };
    const { amount,purchase_order_id,purchase_order_name, customer_info } = req.body;
    const formData={
        return_url: "http://localhost:5173/profile/test", 
        website_url: "http://localhost:5173", 
        amount: amount, 
        purchase_order_id: purchase_order_id,
        purchase_order_name: purchase_order_name,
        customer_info: customer_info 
    };
   const response= await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        formData,
        {
            headers,
        },
    );
    // console.log(response.data);
    console.log(response.data.payment_url);
    res.json({
        message: "khalti success",
        payment_method: "khalti",
        data: response.data,
      });
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

 const khaltiCallback=async(req,res)=>{
//     const headers={
//         Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//        "Content-Type": "application/json",
//     };
//     const response = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", { pidx },{headers});
//     console.log(response.data);
 }
module.exports={khalti,khaltiCallback};