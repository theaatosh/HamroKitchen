import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
// import {foodItems}  from "../assets/Explore Menu/Menu"
const token = localStorage.getItem('token');
export const StoreContext = createContext(null);
export const StoreContextProvider = (props) => {

  const [category,setCategory]=useState("All");//for menu category
  const [isLoading, setIsLoading] = useState(true); 
  const aboutUsRef = useRef(null); //for about us reference
  const contactUsRef = useRef(null); //for contact  us reference
  const foodDisplayRef=useRef(null);
  
  const scrollToAbout = () => {
    aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const scrollToFooter = () => {
    contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    console.log(contactUsRef);
  }
  const scrollToDisplayFood=()=>{
    foodDisplayRef.current.scrollIntoView({behavior:"smooth"});
  }
  const [searchItem,setSearchItem]=useState('');//for landing page search bar
  const handleSearchItem=(e)=>{
    setSearchItem(e.target.value.toLowerCase());

    if(e.key==='Enter')
    {
      scrollToDisplayFood();
    }
    
  }

  //fetching fooditems from the database
  const[foodItems,setFoodItems]=useState([]);
  const url="http://localhost:5010";
  useEffect(() => {
    // Fetch food items from the backend
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5010/topDishes');
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

  const addToCart= async (itemId)=>{
    console.log(cartItems);
    
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))

    }
     else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
     }
// add to cart here
  
     if(token){
      console.log("hi");
      await axios.post("http://localhost:5010/cart/add",{itemId},{headers: {'Authorization': `Bearer ${token}`}});
     }
  }

  const removeFromCart= async (itemId)=>{   
    // remove cart here
    if(token){
      console.log("hi");
      await axios.post("http://localhost:5010/cart/remove",{itemId},{headers: {'Authorization': `Bearer ${token}`}});
     }
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
  //geting data from database
  // const fetchCartList= async()=>{
  //   const response= await axios.get("http://localhost:5010/cart/remove",{itemId},{headers: {'Authorization': `Bearer ${token}`}});
  // }

  const loadCartData= async (token)=>{
    const response =await axios.get("http://localhost:5010/cart/get",{},{headers: {'Authorization': `Bearer ${token}`}});
    setCartItems(response.data.cartData);
  }

  useEffect(async ()=>{
    await loadCartData(token);
  },[]);
  const contextValue = {
    isLoading,
    url,
    foodItems,
    category,
    setCategory,
    aboutUsRef,
    contactUsRef,
    foodDisplayRef,
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
