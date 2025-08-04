import User from "../models/user.js";
import {Webhook} from 'svix';

const clerkWebhooks= async (req,res)=>{
try{
const whook=new Webhook (proces.env.CLERK_WEBHOOK_SECRET)
const headers={
"svix-id" : req.headers["svix-id"] ,
"svix-timestamp" :req.header["svix-timestamp"],
"svix-signature" :req.header["svix-signature"],

};

//Verifying Headers
await whook.verify(JSON.stringify(req.body),headers)

//Getting Data from request body
const {data, type} =req.body

const userdata = {
    _id :data.id ,
    email: data.email_addresses[0]. email_address,
    username : data.first_name +" "+data.last_name,
    image:data.image_url,
}


switch(type){
    case "user.created":{
        await User.create(userdata);
        break;

    }
    case "user.updated":{
        await User.findByIdAndUpdte(data.id ,userdata);
        break;

    }
    case "user.deleted":{
        await User.findByIdAndUpdte(data.id);
        break;

    }
    default:
        break;


}

res.json({sucess:true , message:"Webhook Recieved"})



}catch(error){

    console.log(error.message);
    res.json({sucess:false ,message:error.message});
}

}

export default clerkWebhooks;