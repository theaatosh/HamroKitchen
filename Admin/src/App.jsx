import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import './index.css';
import { AdminLayout } from './Components/AdminLayout';
import { Dashboard } from './Pages/Dashboard';
import { AddItems } from './Pages/AddItems';
import { ManageKitchen } from './Pages/ManageKitchen';
import { Settings } from './Pages/Settings';
 export const App=()=>{

  const router=createBrowserRouter([
    {
      path:'/',
      element:<AdminLayout/>,
      children:[
        { 
          index:true,
          element:<Dashboard/>
        },
        {
            path:'/addItems',
            element:<AddItems/>
        },
        {
            path:'/manageKitchen',
            element:<ManageKitchen/>
        },
        {
            path:'/settings',
            element:<Settings/>
        },
        {
          path:"*",
          element:"Not Found"
        }
      ]
    },
    
    
  ])
  return(
    
    <RouterProvider router={router}></RouterProvider>
    
  )
 }