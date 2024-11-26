import styles from '../Styles/Login_Signup/KitchenSignup.module.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../Context/StoreContext';


export const KitchenSignup = () => {
  
  const {foodItems}=useContext(StoreContext);
  const token= localStorage.getItem('token');
// console.log(token);
  const [formData, setFormData] = useState({
    selectedItems: {},
    location: { lat: null, lng: null }, // stores latitude and longitude
  });
  
  
  //data lai category ko basis ma combine garera store gareko
  const groupedData=foodItems.reduce((acc,item)=>{
    const category=item.productCategory;
      if(!acc[category]){
       acc[category]={
        categoryName:category,
        foodItems:[],
       }
      }
        acc[category].foodItems.push(item);
        return acc;
  },{})
  const foodData=Object.keys(groupedData).map((category)=>({
    category:category,
    foodItems:groupedData[category].foodItems
  }))

console.log(formData);


//harek check ra uncheck ma call hunxa
  const handleCategoryItemChange = (e, id) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCategory = { ...prevData.selectedItems};
      if (!updatedCategory[value]) {
        updatedCategory[value]="";
      }

      if (checked) {
        updatedCategory[value] = id;
      } else {
       delete updatedCategory[value] ;
      }

      return { ...prevData, selectedItems: updatedCategory };
    });

  };

  // Function to handle location update on map click
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData((prevData) => ({
      ...prevData,
      location: { lat, lng },
    }));
  };

  // Leaflet map event listener component
  const LocationMarker = () => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });

    return formData.location.lat ? (
      <Marker position={[formData.location.lat, formData.location.lng]} />
    ) : null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{      
      const result =await axios.post('http://localhost:5010/api/kitchenSignUp',formData, {headers:{'Authorization': `Bearer ${token}`}});
      console.log(result.data);
      
      toast.success(result.data,{
        autoClose:1500
      });
    }
    catch(err)
    {
        if(err.response.status===400)
        {
          
            toast.error(err.response.data,{autoClose:1500});
             
          
        }
    }
  //  if(result.status===400)
  //  {
  //   console.log(result.response);
    
  //  }
   
  };

  // If the user doesn't manually select the map, get their current location
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
          setFormData((prevData) => ({
            ...prevData,
            location: { lat: 27.7172, lng: 85.3240 }, // Default: Kathmandu
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

  // function to fetch address from latitude and longitue
  // const fetchAddress = async (lat, lng) => {
  //   try {
  //     // const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
  //     const response= await axios.get('http://localhost:5010/api/geoCode' ,{params:{lat, lon:lng}});
  //     const data = response.json();
      
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

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.signUp_container}>
          <div className={styles.inner}>
            <div className={styles.heading_signup}>
              <h1>Get Listed as a Kitchen Chef</h1>
              <ToastContainer/>
            </div>

            {/* Input Details */}
            <div className={styles.input_details}>
              <form onSubmit={handleSubmit}>
                <div className={styles.form_group}>
                  <h3>Select the Categories and Items You Prepare</h3>

                  {/* Momo Category */}
                  <div className={styles.food_select_container}>
                    {foodData.map((category,index)=>{
                      
                    return(
                      <div className={styles.common_food_select} key={index}>
                      <h3>{category.category}</h3>
                        {category.foodItems.map((item)=>{       
                              return(
                                <label key={item._id}>
                                 <input
                                   type="checkbox"
                                   value={item.productName}
                                   onChange={(e) => handleCategoryItemChange(e, item._id)}
                                 />
                                 {item.productName}
                               </label>)
                        })}
                     
                    </div>
                    )})}
                 

                  </div>
                </div>

                {/* Leaflet Map for Location */}
                <div className={styles.form_group}>
                  <label htmlFor="location">Choose your location :</label>
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
                </div>

                {/* Sign-up Button */}
                <div className={styles.signup_btn}>
                  <button type="submit" className={styles.submit_button}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
