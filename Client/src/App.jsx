import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Components/AppLayout";
import { Home } from "./Pages/Home";
import {Cart} from './Pages/Cart';
import { LoginPage } from "./Pages/Login";
import { SignUpPage } from "./Pages/Signup";
import { PlaceOrder } from "./Pages/PlaceOrder";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { KitchenSignup } from "./Pages/KitchenSignup";
import { MyProfile } from "./Pages/MyProfile";
import { MyOrders } from "./Pages/MyOrders";
import { NotFound } from "./Components/NotFound";
import { Payment } from "./Pages/Payment";
import { KitchenLayout } from "./KitchenComponents/KitchenLayout";
import { Orders } from "./KitchenPages/Orders";
import { KitchenSettings } from "./KitchenPages/KitchenSettings";
import { KitchenDashboard } from "./KitchenPages/KitchenDashboard";
import { useContext } from "react";
import { StoreContext } from "./Context/StoreContext";
import { KitchenProtectedRoute } from "./KitchenComponents/KitchenProtectedRoute";
import { PaymentSuccessful } from "./Pages/PaymentSuccessful";
import { useAuth } from "./Context/AuthContext";
import { Notification } from "./Pages/Notification";
import { RiderLayout } from "./RiderComponents/RiderLayout";
import { RiderDashboard } from "./RiderPages/RiderDashboard";
import { ForgotPassword } from "./Components/ForgotPassword/ForgotPassword";
import { VerifyOtp } from "./Components/ForgotPassword/OtpVerify";
import { PasswordUpdate } from "./Components/ForgotPassword/PasswordUpdate";


// import { AuthUser } from "./Context/AuthUser";


export const App=()=>{
  const {token}=useContext(StoreContext);
  const{userDetails}=useAuth();

  
    const router=createBrowserRouter([
      {
        path:'/',
       element:<AppLayout /> ,
        children:[
          {
            index:true,
            element:<Home/>
          },
          {
              path:'profile/:userid',
              element:<MyProfile/>
          },
          {
            path:'myorders',
            element:<MyOrders/>
        },
          {
            path:'cart',
            element:
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
            
          },
          {
              path:'/notification',
              element:<Notification/>
          },
          {
            path:'payment',
            element:<Payment/>,
          },
          {
            path:'paymentSuccessful',
            element:<PaymentSuccessful/>
          },
          {
            path:'placeOrder',
            element:
            <ProtectedRoute>
            <PlaceOrder/>
          </ProtectedRoute>
          },
          {
            path:'signup',
            element:<SignUpPage/>
          },
          {
            path:'login',
            element:token ? <Navigate to={"/"}/> : <LoginPage/>
          },
          {
            path:"/forgot/passsword" ,
            element:<ForgotPassword/>
          },
          {
              path:"/otp/verify", 
              element:<VerifyOtp/>
          },
          {
              path:"/password/update",
              element:<PasswordUpdate/>
          },
          {
            path:'kitchen/Signup',  
            element:userDetails.role==='kitchen'? <Navigate to={'/kitchen/dashboard'}/>:<KitchenSignup/>
          },
          {
            path:'rider/Signup',  
            element:userDetails.role==='rider'? <Navigate to={'/rider/dashboard'}/>:<KitchenSignup/>
          },
          {
            path:'*',
            element:<NotFound/>
          }
        ],
        
      },
      {
        path:'/kitchen',
        element:<KitchenLayout/>,
        children:[
          {
            path:'dashboard',
            element:<KitchenProtectedRoute>
              <KitchenDashboard/>
            </KitchenProtectedRoute>

          },
          {
            path:'orders',
            element:<Orders/>
          },
          {
            path:'settings',
            element:<KitchenSettings/>
          }
        ]
      },
      // {
      //   path:'/rider',
      //   element:<RiderLayout/>,
      //   children:[{
      //     path:'dashboard',
      //     element:<RiderDashboard/>
      //   }]
      // }
      

    ]

    )
  return (
      <>
      <RouterProvider router={router}>
      </RouterProvider>
      </>
  )
}

  