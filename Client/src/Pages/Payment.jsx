import styles from "../Styles/Payment/Payment.module.css";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";
import { useContext } from "react";

export const Payment = () => {
  const { cartData, deliveryInfo, setPaymentDetails, getTotalCartAmount } =
    useContext(StoreContext);
  const handlePayment = async () => {
    try {
      console.log(cartData.totalAmount);

      const response = await axios.post(
        "http://localhost:5010/api/khalti/init",
        {
          amount: cartData.totalAmount * 100,
          purchase_order_id: "test12",
          purchase_order_name: "test",
          customer_info: {
            name: `${deliveryInfo.firstName + " " + deliveryInfo.lastName}`,
            email: `${deliveryInfo.email}`,
            phone: `${deliveryInfo.phoneNumber}`,
          },
        }
      );
      const paymentUrl = await response.data.data.payment_url;
      setPaymentDetails(response.data.data);
      localStorage.setItem(
        "paymentDetails",
        JSON.stringify(response.data.data)
      );
      window.location.href = paymentUrl;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCodPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(
        "http://localhost:5010/api/cod",
        {
          paymentMethod: "COD",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.payment_container}>
      <div className={styles.payment_wrapper}>
        <h2 className={styles.subheading}>
          Select your preferred payment method:
        </h2>
        <div className={styles.payment_options}>
          <div className={`${styles.option} `}>
            <img
              src="/Images/khaltipay.png"
              alt="Khalti"
              className={styles.payment_logo}
              onClick={handlePayment}
            />
            <p>Pay with Khalti</p>
          </div>

          <div className={`${styles.option} `}>
            <img
              src="/Images/cod.png"
              alt="COD"
              className={styles.payment_logo}
              onClick={handleCodPayment}
            />
            <p>Cash on delivery</p>
          </div>
        </div>
      </div>

      <div className={styles.order_summary}>
        <h3>Order Summary</h3>
        <div className={styles.total_amt}>
          <p>Total Amount</p>
          <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
        </div>
      </div>
    </div>
  );
};
