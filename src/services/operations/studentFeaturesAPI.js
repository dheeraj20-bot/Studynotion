import { apiConnector } from "../apiconnector"
import {studentEndpoints}  from "../apis"
import { toast } from "react-hot-toast"
import rzpLogo from '../../assets/Logo/Logo-Full-Dark.png'
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script")
        script.src =src;
        script.onload=()=>{
            resolve(true)
        }
        script.oneerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading..")
    try{
         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

         if(!res){
            toast.error("Razorpay SDK failed to Load")
            return;
         }
      
         //intiate
         const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
                                               {courses},{
                                                Authorization:`Bearer ${token}`,
                                               }
         
         )

         if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)

         }

         //options

         const options = {
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"Dheeraj Bhai",
            description:"Thank you for Purchasing Course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token)
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
         }

    }
    catch(error){
         console.log("Payment API Error..",error);
         toast.error("Could not make Payments")
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{

    }
    catch(error){
        
    }
}