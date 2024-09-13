import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Components/AppLayout";
import { Home } from "./Pages/Home";
import {Cart} from './Pages/Cart';
import { LoginPage } from "./Pages/Login";
import { SignUpPage } from "./Pages/Signup";
import { PlaceOrder } from "./Pages/PlaceOrder";


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
            path:'cart',
            element:<Cart/>
          },
          {
            path:'signup',
            element:<SignUpPage/>
          },
          {
            path:'login',
            element:<LoginPage/>
          },
          {
            path:'placeOrder',
            element:<PlaceOrder/>
          },
        ]
      }

    ]

    )
  return (
      <>
      <RouterProvider router={router}></RouterProvider>
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


  