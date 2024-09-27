import styles from '../Styles/Login_Signup/KitchenSignup.module.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const KitchenSignup=()=>{
   const[formData,setFormData]=useState({
    category:[],
    location:{lat:null,lng:null},//esle lat ra lng lai store garxa
    
   })

   //selected category are stored inside category array 
   const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedOptions,
    }));
  };

 
 //function to handle location update on map click
 const handleMapClick=(e)=>{
const{lat,lng}=e.latlng;
setFormData((prevData)=>({
  ...prevData,
  location:{lat,lng},
}))
 }

  // Leaflet map event listener component
  const LocationMarker = () => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });

    return formData.location.lat ? (
      <Marker position={[formData.location.lat, formData.location.lng]} />
    ) : null;
  };
  
   //handle submit
   const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        
        
  }

  //esle xai user ko current location linxaif user le  manually map use garena bhane
  useEffect(() => {

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData((prevData) => ({
              ...prevData,
              location: { lat: latitude, lng: longitude },
            }));
          },
          (err) => {
            console.error("Error getting location, using default:", err);
            // Default to Kathmandu if location not available
            setFormData((prevData) => ({
              ...prevData,
              location: { lat: 27.7172, lng: 85.3240 },
            }));
          }
        );
      } else {
        console.error("Geolocation not available, using default location");
        setFormData((prevData) => ({
          ...prevData,
          location: { lat: 27.7172, lng: 85.3240 }, // Default location
        }));
      }
    
  }, []);

  //esle xai marker anusar view lai center gardinxa
  const UpdateMapCenter=()=>{
    const map=useMap();
    useEffect(()=>{
      if(formData.location.lat&&formData.location.lng){
        map.setView([formData.location.lat,formData.location.lng],20);
        // fetchAddress(formData.location.lat, formData.location.lng);
      }
    },[formData.location,map])
  }

  //function to fetch address from latitude and longitue
  // const fetchAddress = async (lat, lng) => {
  //   try {
  //     // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
  //     // const response= await axios.get('http://localhost:5010/api/geoCode' ,{params:{lat, lon:lng}});
  //     // const data = response.json();
      
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       address: data.display_name || 'Address not found',
  //     }));
  //   } catch (error) {
  //     console.error('Error fetching address:', error);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       address: 'Error fetching address',
  //     }));
  //   }
  // };


    return(
        <>
                <div className={styles.main_container}>
            <div className={styles.signUp_container}>
                <div className={styles.left_container}>
                    <div className={styles.overlay}></div>
                    <div className={styles.text_overlay}>
                    <h1>Welcome To Hamro kitchen</h1>
                    <h3>Experience the essence of <br/>
                    home, anytime, anywhere</h3>
                    </div>
                </div>
                <div className={styles.right_container}>
                    <div className={styles.inner_right}>
                        <div className={styles.heading_signup}> <h1>Get listed in Hamro kitchen</h1></div>
                        
          {/* input details  */}
        <div className={styles.input_details}>
            <form onSubmit={handleSubmit} >
         
            <div className={styles.form_group}>
    
            <label htmlFor="food_items" >Select Food Items:<span><br /> (Note:Hold Ctrl to select mutiple items)</span> </label>
            <select name='category' className={styles.select_dropdown}onChange={handleCategoryChange } multiple required>
                        <option value="Momo">Momo</option>s
                        <option value="Rolls">Rolls</option>
                        <option value="Chowmein">Chowmein</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Fry Rice">Fry Rice</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Sausage">Sausage</option>
                        <option value="Burger">Burger</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Sekuwa">Sekuwa</option>
                    </select>
        
          </div>

        {/* Leaflet Map for location  */}
        <div className={styles.form_group}>
                    <label htmlFor="location">Provide your Location</label>
                    <MapContainer
                      center={[27.7172, 85.3240]} 
                      zoom={15}
                      style={{ height: '200px', width: '100%',borderRadius:"2vh"}}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker />
                      <UpdateMapCenter/>
                    </MapContainer>
                  </div>


        {/* for signup button  */}
        <div className={styles.signup_btn}>
      <button type="submit" className={styles.submit_button}>Register</button>
      </div>
    </form>

    
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )


}


