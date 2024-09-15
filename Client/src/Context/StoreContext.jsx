import { createContext, useRef, useState } from "react";
import {foodItems}  from "../assets/Explore Menu/Menu"

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

  // const[isLogin,setIsLogin]=useState(false);
  const [category,setCategory]=useState("All");//for menu category

  const aboutUsRef = useRef(null); //for about us reference
  const contactUsRef = useRef(null); //for contact  us reference
  
  const scrollToAbout = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const scrollToFooter = () => {
    contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(contactUsRef);
  }
  const [searchItem,setSearchItem]=useState('');//for landing page search bar
  const handleSearchItem=(e)=>{
    setSearchItem(e.target.value.toLowerCase());
    
  }


  //for cart items
  const[cartItems,setCartItems]=useState({}); 

  const addToCart=(itemId)=>{
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
     else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
     }
  }

  const removeFromCart=(itemId)=>{   
    
    setCartItems((prev)=>{
      const updatedCart={...prev};
      console.log(updatedCart);
      
      console.log(updatedCart[itemId]);
     if(updatedCart[itemId]>1)
     {
      updatedCart[itemId]=updatedCart[itemId]-1
     }
     else{
      delete updatedCart[itemId];
     }

     return updatedCart;
   })


// setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    
}

  const getTotalCartAmount=()=>{
    let totalAmount=0;

    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {  
        let itemInfo=foodItems.find((product)=>product.id===parseInt(item));
        totalAmount += itemInfo.price* cartItems[item];
     }
    }
     return totalAmount;  
  }
 
  const contextValue = {
    // isLogin,
    foodItems,
    category,
    setCategory,
    aboutUsRef,
    contactUsRef,
    scrollToAbout,
    scrollToFooter,
    searchItem,
    handleSearchItem,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
    
  };
return (
    <StoreContext.Provider value={contextValue} >
      {props.children}
    </StoreContext.Provider>        
  );
};
