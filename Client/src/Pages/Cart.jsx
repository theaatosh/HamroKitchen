import { useContext } from "react";
import styles from "../Styles/Cart/Cart.module.css";
import { StoreContext } from "../Context/StoreContext";
import {  useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import axios from 'axios'

export const Cart = () => {
  const {
    url,
    cartItems,
    foodItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    selectedDateTime,setSelectedDateTime,
    setCartData,
  token
  } = useContext(StoreContext); 
  const navigate = useNavigate();
  const isCartEmpty = Object.keys(cartItems).filter(key=>cartItems[key]).length === 0;

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 3); // Set max date to 3 days from today

  const isToday = (date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isMaxDate = (date) => {
    return (
      date.getDate() === maxDate.getDate() &&
      date.getMonth() === maxDate.getMonth() &&
      date.getFullYear()=== maxDate.getFullYear()
    );
  };

  const handleProceedOrder = async () => {  
    //backend ma data pathauna ko lagi 
    console.log(Object.keys(cartItems));
    
    const itemsInCart=Object.keys(cartItems).map((id)=>{
      const item=foodItems.find((curItem)=>curItem._id===id);
      
      return{
        id:item._id,
        name:item.productName,
        price:item.productPrice,
        quantity:cartItems[item._id],
        total:item.productPrice*cartItems[item._id]
      }
      
      })
    const orderData={
      items:itemsInCart,
      totalAmount:getTotalCartAmount()+(getTotalCartAmount()===0?0:50),
      deliveryFee:getTotalCartAmount()===0?0:50,
      scheduledTime:selectedDateTime.toLocaleString()
    };
    // console.log(cartData);
    setCartData(orderData);
      try{ 
        // axios.post("http://localhost:5010/api/scheduleOrder", cartData,{headers:{'Authorization': `Bearer ${token}`}})
      // console.log(`This is date ${selectedDateTime} hahs`);
      navigate("/placeOrder");}
      catch(err){
        console.log(err);
      }
    
  };
  // for removing item without decrement
  const handleremoveFromCart =async (itemId) => {
    console.log(token);
   
    window.location.reload();
    await axios.post("http://localhost:5010/cart/delete",{itemId},{headers: {'Authorization': `Bearer ${token}`}});
    
  };

  
  return (
    <>
      <div className={styles.cart}>
        <div className={styles.cart_items}>
          <div className={styles.cart_items_title}>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />

          <ul>
          {isCartEmpty?(<div className={styles.empty_cart}><img src="/Images/EmptyCart.png" alt="" /><h1>Your cart is empty!!</h1></div>):
            (foodItems.map((curItem) => {
              if (cartItems[curItem._id] > 0)
                return (
                 
                    <div className={`${styles.cart_items_item} `} key={curItem._id}>
                      <img src={url+'/'+curItem.image} alt="" />
                      <p>{curItem.productName}</p>
                      <p>Rs.{curItem.productPrice}</p>
                      <div className={styles.item_counter_container}>
                      <button className={styles.add_btn}>
                        <CiCircleMinus
                          className={styles.sub_icon}
                          onClick={() => removeFromCart(curItem._id) }
                        /></button>
                        <p>{cartItems[curItem._id]}</p>

                        <button disabled={cartItems[curItem._id]===50} className={styles.add_btn}>
                        <IoIosAddCircleOutline
                          className={styles.add1_icon}
                          onClick={() => addToCart(curItem._id)}
                        
                        /></button>
                      </div>
                      <p>Rs.{curItem.productPrice * cartItems[curItem._id]}</p>

                      <p
                        className={styles.cross}
                        onClick={() => handleremoveFromCart(curItem._id) }
                      >
                       
                       <MdDeleteForever className={styles.del_icon}/>
                      </p>
                    </div>
                  
                );
            }))}
          </ul>
        </div>
        {/* showing Cart total details */}

            {!isCartEmpty&&
        <div className={styles.cart_bottom}>
          <div className={styles.cart_total}>
            <h2>Cart Totals</h2>
            <div className={styles.cart_total_details}>
              <p>Sub Total</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p>Delivery Fee</p>
              <p>Rs.{getTotalCartAmount()===0?"0":50}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p> Total</p>
              <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
            </div>
            <hr />
            <button
              type="submit"
              onClick={handleProceedOrder}
              disabled={isCartEmpty}
            >
              Proceed To Checkout
            </button>
          </div>

              {/* schedule order  */}
          <div className={styles.schedule_order_container}>
            <h2>Schedule Your Order</h2>
            <label htmlFor="schedule-time">Schedule here</label>
           <DatePicker
            selected={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date)}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="HH:mm"
            timeIntervals={15}
            minDate={today} 
            maxDate={maxDate} 
            minTime={
              isToday(selectedDateTime)
                ? new Date()
                : new Date(new Date().setHours(0, 0, 0, 0))
            }
            maxTime={
              isMaxDate(selectedDateTime)
                ? new Date(maxDate.setHours(23, 45, 0, 0))
                : new Date(new Date().setHours(23, 45, 0, 0)) 
              }
/>
          </div>
        </div>
        }

      </div>
    </>
  );
};
