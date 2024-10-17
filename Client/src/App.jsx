import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

// import { AuthUser } from "./Context/AuthUser";


export const App=()=>{
    const router=createBrowserRouter([
      {
        path:'/',
        element:<AppLayout/>,
        children:[
          {
            index:true,
            element:<Home/>
          },
          {
              path:'profile',
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
            path:'/payment',
            element:<Payment/>
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
            element:
          
              <LoginPage/>
          },
          {
            path:'kitchen/Signup',
            element:<KitchenSignup/>
          },
          {
            path:'*',
            element:<NotFound/>
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


  