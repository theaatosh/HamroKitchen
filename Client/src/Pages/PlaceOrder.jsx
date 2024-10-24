import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import styles from '../Styles/PlaceOrder/PlaceOrder.module.css';
import { StoreContext } from '../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export const PlaceOrder=()=>{

    const {getTotalCartAmount,cartData,selectedDateTime,deliveryInfo,setDeliveryInfo,token}=useContext(StoreContext);
    const navigate=useNavigate();

      const[error,setError]=useState({});
      const validate=()=>{
        let formErrors={};
        if(!deliveryInfo.firstName.trim()){
          formErrors.firstName="First Name is Required *";
        }
        else if(!/[A-Za-z]+[A-Za-z]*/.test(deliveryInfo.firstName))
        {
          formErrors.firstName="Invalid first Name";
        }
        if(!deliveryInfo.lastName.trim()){
          formErrors.lastName="Last Name is Required *";
        }
        else if(!/[A-Za-z]+[A-Za-z]*/.test(deliveryInfo.lastName))
        {
          formErrors.lastName="Invalid last Name";
        }
  
        if(!deliveryInfo.email.trim()){
          formErrors.email="Email is Required *";
        }else if(!/^([A-Za-z0-9]+(?:[.#_][A-Za-z\d]+)*@[A-Za-z]+)(\.[A-Za-z]{2,3})$/.test(deliveryInfo.email))
        {
          formErrors.email="Incorrect email format ";
        }
        
        if(!deliveryInfo.phoneNumber.trim())
        {
          formErrors.phoneNumber="Phone number is Required *";
        }
        else if(!/^[0-9]{10}$/.test(deliveryInfo.phoneNumber))
        {
          formErrors.phoneNumber="Invalid phone Number";
        }
       
        
      return formErrors;
      }
      
      //functions related to map
      // If the user doesn't manually select the map, get their current location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDeliveryInfo((prevData) => ({
            ...prevData,
            deliveryLocation: { lat: latitude, lng: longitude },
          }));
        },
        (err) => {
          console.error("Error getting location, using default:", err);
         setDeliveryInfo((prevData) => ({
            ...prevData,
            deliveryLocation: { lat: 27.7172, lng: 85.3240 }, // Default: Kathmandu
          }));
        }
      );
    } else {
      console.error("Geolocation not available, using default location");
      setDeliveryInfo((prevData) => ({
        ...prevData,
        deliveryLocation: { lat: 27.7172, lng: 85.3240 }, // Default location
      }));
    }
  }, []);
       // Function to handle location update on map click
      const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      setDeliveryInfo((prevData) => ({
        ...prevData,
        deliveryLocation: { lat, lng },
    }));
  };
      // Leaflet map event listener component
      const LocationMarker = () => {
        useMapEvents({
          click: (e) => handleMapClick(e),
        });
    
        return deliveryInfo.deliveryLocation.lat ? (
          <Marker position={[deliveryInfo.deliveryLocation.lat, deliveryInfo.deliveryLocation.lng]} />
        ) : null;
      };
       //esle xai marker anusar view lai center gardinxa
  const UpdateMapCenter=()=>{
    const map=useMap();
    useEffect(()=>{
      if(deliveryInfo.deliveryLocation.lat&&deliveryInfo.deliveryLocation.lng){
        map.setView([deliveryInfo.deliveryLocation.lat,deliveryInfo.deliveryLocation.lng],20);
        // fetchAddress(deliveryInfo.location.lat, deliveryInfo.location.lng);
      }
    },[])
  }

    //handle deliveryInfo on input Change
      const handleDeliveryInfo=(e)=>{
      const{value,name}=e.target;
       setDeliveryInfo((preVal)=>({...preVal,[name]:value}))
       setError((prevErr)=>({...prevErr,[name]:""}))
      }

      const handleProceedToPayment=()=>{
          const validation=validate();
          if(Object.keys(validation).length>0)
          {
              setError(validation);
          }
          else{
            try{
              console.log(token);
              axios.post("http://localhost:5010/api/scheduleOrder", {cartData,deliveryInfo},{headers:{'Authorization': `Bearer ${token}`}})
              console.log(cartData);
            }catch(err){
              console.log(err);
            }
            // console.log(deliveryInfo);
            navigate('/payment');
          }
          
      }
    return(
        <>
        <div className={styles.place_order_container}>
            <div className={styles.place_order_left}>
                <form className={styles.place_order_form}>
                    <h2>Delivery Information</h2>
                    <div className={styles.multi_fields}>
                      <div className={styles.firstName}>
                        <input type="text"  name="firstName" placeholder='First name' value={deliveryInfo.firstName} required onChange={(e)=>handleDeliveryInfo(e)}/>
                        {error.firstName && <p className={styles.input_error}>{error.firstName}</p>}
                      </div>
                      <div className={styles.lastName}>
                        <input type="text" name='lastName'placeholder='Last  name' value={deliveryInfo.lastName} onChange={(e)=>handleDeliveryInfo(e)}/>
                        {error.lastName && <p className={styles.input_error}>{error.lastName}</p>}
                        
                      </div>
                    </div>
                    <div className={styles.email}>
                    <input type="email" name='email' onChange={(e)=>handleDeliveryInfo(e)} placeholder='Email address'/>
                        {error.email && <p className={styles.input_error}>{error.email}</p>}

                    </div>
                    <div className={styles.phnNumber}>
                    <input type="text"  name='phoneNumber' onChange={(e)=>handleDeliveryInfo(e)}  placeholder='Phone Number'/>
                        {error.phoneNumber && <p className={styles.input_error}>{error.phoneNumber}</p>}

                    </div>
                    <label htmlFor="location">Choose your Location on Map :</label>
                  <MapContainer
                    center={[27.7172, 85.3240]}
                    zoom={15}
                    style={{ height: '200px', width: '100%', borderRadius: '2vh' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                    <UpdateMapCenter />
                  </MapContainer>

                </form>
            </div>
            <div className={styles.place_order_right}>
            <div className={styles.cart_bottom}>
          <div className={styles.cart_total}>
            {selectedDateTime && <p>Order scheduled for: <br /> {selectedDateTime.toLocaleString()}</p>} <br />
            <h2>Cart Totals</h2>
            <div className={styles.cart_total_details}>
              <p>Sub Total</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p>Delivery Fee</p>
              <p>Rs.{50}</p>
            </div>
            <hr />
            <div className={styles.cart_total_details}>
              <p> Total</p>
              <p>Rs.{getTotalCartAmount() ? getTotalCartAmount() + 50 : "0"}</p>
            </div>
            <hr />
            <button
              type="submit"
              onClick={handleProceedToPayment}
            >
              Proceed To Payment
            </button>
          </div>
            </div>
        </div>
        </div>
        </>
    )
}