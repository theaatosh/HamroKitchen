import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
// import {foodItems}  from "../assets/Explore Menu/Menu"

export const StoreContext = createContext(null);
export const StoreContextProvider = (props) => {

  const [category,setCategory]=useState("All");//for menu category
  const [isLoading, setIsLoading] = useState(true); 
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

  //fetching fooditems from the database
  const[foodItems,setFoodItems]=useState([]);
  const url="http://localhost:5010";
  useEffect(() => {
    // Fetch food items from the backend
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5010/');
          setIsLoading(true);
            setFoodItems(response.data); // Set the data to the state
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
        finally{
          setIsLoading(false);
        }
    };

    fetchFoodItems();
}, []);




  //for cart items
  const[cartItems,setCartItems]=useState({}); 
  
  const addToCart=(itemId)=>{
    console.log(cartItems);
    
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
        let itemInfo=foodItems.find((product)=>product._id===item);
        totalAmount += itemInfo.productPrice * cartItems[item];
     }
    }
     return totalAmount;  
  }
 
  const contextValue = {
    isLoading,
    url,
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
