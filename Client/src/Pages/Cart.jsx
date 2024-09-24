import { useContext, useState } from "react";
import styles from "../Styles/Cart/Cart.module.css";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS

export const Cart = () => {
  const {
    url,
    cartItems,
    setCartItems,
    foodItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  console.log(selectedDateTime);
  
  const navigate = useNavigate();
  const isCartEmpty = Object.keys(cartItems).length === 0;



  const handleProceedOrder = () => {
    if (!selectedDateTime) {
      alert("Please select a time to schedule your order");
      return;
    } else {
      navigate("/placeOrder",{state:{selectedDateTime}});
    }
  };
  // for removing item without decrement
  const handleremoveFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = { ...prevItems };
      delete updatedCart[id];
      return updatedCart;
    });
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
          <hr />

          <ul>
            {foodItems.map((curItem) => {
              if (cartItems[curItem._id] > 0)
                return (
                  <div key={curItem._id}>
                    <div className={`${styles.cart_items_item}`}>
                      <img src={url+'/'+curItem.image} alt="" />
                      <p>{curItem.productName}</p>
                      <p>Rs.{curItem.productPrice}</p>
                      <div className={styles.item_counter_container}>
                        <CiCircleMinus
                          className={styles.sub_icon}
                          onClick={() => removeFromCart(curItem._id)}
                        />
                        <p>{cartItems[curItem._id]}</p>
                        <IoIosAddCircleOutline
                          className={styles.add1_icon}
                          onClick={() => addToCart(curItem._id)}
                        />
                      </div>
                      <p>Rs.{curItem.productPrice * cartItems[curItem._id]}</p>

                      <p
                        className={styles.cross}
                        onClick={() => handleremoveFromCart(curItem._id)}
                      >
                        X
                      </p>
                    </div>
                    <hr />
                  </div>
                );
            })}
          </ul>
        </div>
        {/* showing Cart total details */}
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
            onChange={(date)=>setSelectedDateTime(date)}
            showTimeSelect
            dateFormat='Pp'
            timeFormat="HH:mm"
            timeIntervals={15} 
            minDate={new Date()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
