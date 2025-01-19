import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import styles from '../Styles/PlaceOrder/PlaceOrder.module.css';
import { StoreContext } from '../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export const PlaceOrder=()=>{

    const {getTotalCartAmount,cartData,selectedDateTime,deliveryInfo,setDeliveryInfo,token,location,setLocation}=useContext(StoreContext);
    const navigate=useNavigate();

      const[error,setError]=useState({});
      const validate=()=>{
        let formErrors={};
        if(!deliveryInfo.firstName.trim()){
          formErrors.firstName="First Name is Required *";
        }
        else if(!/^[A-Za-z]{3,}$/.test(deliveryInfo.firstName))
        {
          formErrors.firstName="Invalid first Name";
        }
        if(!deliveryInfo.lastName.trim()){
          formErrors.lastName="Last Name is Required *";
        }
        else if(!/^[A-Za-z]{3,}$/.test(deliveryInfo.lastName))
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
        else if(!/^(98|97|96)[0-9]{8}$/.test(deliveryInfo.phoneNumber))
        {
          formErrors.phoneNumber="Invalid phone Number *";
        }
        if(!deliveryInfo.address.trim()){
          formErrors.address="Address is required *";
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
    },[map])
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
                axios.post("http://localhost:5010/api/scheduleOrder", {cartData,deliveryInfo},{headers:{'Authorization': `Bearer ${token}`}})
              }catch(err){
                console.log(err);
              }
              navigate('/payment');
            }
          
      }
      
      
      //yo xai location dinxa lat ra lng halepaxi
      const getLocation=async()=>{
        const lat=deliveryInfo.deliveryLocation.lat;
        const lng=deliveryInfo.deliveryLocation.lng;
        if(lat&&lng){
          try{
            const res=await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            console.log(res);
            
            const locationArray=res.data.display_name.split(",")
            const locations=locationArray[0]+locationArray[1];
            setLocation(locations);
            
            
          }catch(err){
            console.log(err.message);
            
          }

        }}
    useEffect(()=>{
      getLocation();
    },[deliveryInfo,location])


    //new location aauda addres lai update garne
    useEffect(()=>{
      if(location){
        setDeliveryInfo((prev)=>(
          {
            ...prev,
            address:location
          }
        ))
      }
    },[location,setDeliveryInfo])

    // yo xai naam diyera lat lng nikalne
    // const latLngFinder=async()=>{
    //   const writtenLocation=deliveryInfo.address;
    //   if(writtenLocation){
    //   try{
    //    const res= await axios.get(`https://nominatim.openstreetmap.org/search?q=<${writtenLocation}>&format=json`)
    //       console.log(res);
          
    //   }catch(err){
    //     console.log(err);
        
    //   }
    // }
    // }
    // useEffect(()=>{
    //   latLngFinder();
    // },[deliveryInfo])


    // const handleAdminJane=()=>{
    //   window.location.href="http://localhost:3000/"
    // }
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
                    <input type="email" name='email' onChange={(e)=>handleDeliveryInfo(e)} value={deliveryInfo.email} placeholder='Email address'/>
                        {error.email && <p className={styles.input_error}>{error.email}</p>}

                    </div>
                    <div className={styles.phnNumber}>
                    <input type="text"  name='phoneNumber' onChange={(e)=>handleDeliveryInfo(e)} value={deliveryInfo.phoneNumber}  placeholder='Phone Number'/>
                        {error.phoneNumber && <p className={styles.input_error}>{error.phoneNumber}</p>}

                    </div>
                    <div className={styles.manual_address}>
                    <input type="text"  name='address' onChange={(e)=>handleDeliveryInfo(e)} value={deliveryInfo.address}  placeholder='Delivery Address'/>
                        {error.address && <p className={styles.input_error}>{error.address}</p>}

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
            {selectedDateTime && <p className={styles.order_schedule}>Order scheduled for: <br /> {selectedDateTime.toLocaleString()}</p>} <br />
            <h2 className={styles.cart_total_heading}>Cart Totals</h2>
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