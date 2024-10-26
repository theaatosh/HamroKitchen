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


// import { AuthUser } from "./Context/AuthUser";


export const App=()=>{
  const {token}=useContext(StoreContext);
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
            path:'kitchen/Signup',
            element:<KitchenSignup/>
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
      }
      

    ]

    )
  return (
      <>
      <RouterProvider router={router}>
      </RouterProvider>
      </>
  )
}

    {/* <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/placeOrder" element={<PlaceOrder/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        </Routes>
    <Footer/> */}


  