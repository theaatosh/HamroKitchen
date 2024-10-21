import styles from '../Styles/Login_Signup/KitchenSignup.module.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const token= localStorage.getItem('token');
// console.log(token);

export const KitchenSignup = () => {
  const [formData, setFormData] = useState({
    category: {},
    location: { lat: null, lng: null }, // stores latitude and longitude
  });

  useEffect(()=>{
    console.log(formData);
    
  },[formData])
  const handleCategoryItemChange = (e, category) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCategory = { ...prevData.category };
      if (!updatedCategory[category]) {
        updatedCategory[category] = [];
      }

      if (checked) {
        updatedCategory[category] = [...updatedCategory[category], value];
      } else {
        updatedCategory[category] = updatedCategory[category].filter(
          (item) => item !== value
        );
      }

      return { ...prevData, category: updatedCategory };
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
      // console.log(formData);
      
      const result =await axios.post('http://localhost:5010/api/kitchenSignUp',formData, {headers:{'Authorization': `Bearer ${token}`}});
      console.log(result.data);
      
      toast.success(result.data);
    }
    catch(err)
    {
        if(err.response.status===400)
        {
          
            toast.error(err.response.data);
             
          
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
                    <div className={styles.common_food_select}>
                      <h3>Momo</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="veg momo"
                          onChange={(e) => handleCategoryItemChange(e, 'momo')}
                        />
                        Veg Momo
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken momo"
                          onChange={(e) => handleCategoryItemChange(e, 'momo')}
                        />
                        Chicken Momo
                      </label>
                    </div>

                    {/* Chowmein Category */}
                    <div className={styles.common_food_select}>
                      <h3>Chowmein</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="veg chowmein"
                          onChange={(e) => handleCategoryItemChange(e, 'chowmein')}
                        />
                        Veg Chowmein
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken chowmein"
                          onChange={(e) => handleCategoryItemChange(e, 'chowmein')}
                        />
                        Chicken Chowmein
                      </label>
                    </div>

                    {/* Rolls Category */}
                    <div className={styles.common_food_select}>
                      <h3>Rolls</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken roll"
                          onChange={(e) => handleCategoryItemChange(e, 'rolls')}
                        />
                        Chicken Roll
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg roll"
                          onChange={(e) => handleCategoryItemChange(e, 'rolls')}
                        />
                        Veg Roll
                      </label>
                    </div>
                    
                    {/* sandwich category */}
                    <div className={styles.common_food_select}>
                      <h3>Sandwich</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken sandwich"
                          onChange={(e) => handleCategoryItemChange(e, 'sandwich')}
                        />
                        Chicken sandwich
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg sandwich"
                          onChange={(e) => handleCategoryItemChange(e, 'sandwich')}
                        />
                        Veg sandwich
                      </label>
                    </div>

                    {/* cakecategory */}
                    <div className={styles.common_food_select}>
                      <h3>Cake</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="Chocolate cake"
                          onChange={(e) => handleCategoryItemChange(e, 'cake')}
                        />
                        Chocolate Cake
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="Red velvet Cake"
                          onChange={(e) => handleCategoryItemChange(e, 'cake')}
                        />
                        Red velvet Cake
                      </label>
                    </div>
                    {/* Fry rice category */}
                    <div className={styles.common_food_select}>
                      <h3>Fry rice</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken fry rice"
                          onChange={(e) => handleCategoryItemChange(e, 'fry rice')}
                        />
                        Chicken Fry Rice
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg fry rice"
                          onChange={(e) => handleCategoryItemChange(e, 'fry rice')}
                        />
                        Veg Fry Rice
                      </label>
                    </div>

                    {/* pasta category */}
                    <div className={styles.common_food_select}>
                      <h3>Pasta</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken pasta"
                          onChange={(e) => handleCategoryItemChange(e, 'pasta')}
                        />
                        Chicken Pasta
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg pasta"
                          onChange={(e) => handleCategoryItemChange(e, 'pasta')}
                        />
                        Veg Pasta
                      </label>
                    </div>

                    {/* sausage category */}
                    <div className={styles.common_food_select}>
                      <h3>Sausage</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken sausage"
                          onChange={(e) => handleCategoryItemChange(e, 'sausage')}
                        />
                        Chicken Sausage
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg sausage"
                          onChange={(e) => handleCategoryItemChange(e, 'sandwich')}
                        />
                        Veg Sausage
                      </label>
                    </div>

                    {/* Burger category */}
                    <div className={styles.common_food_select}>
                      <h3>Burger</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken burger"
                          onChange={(e) => handleCategoryItemChange(e, 'burger')}
                        />
                        Chicken Burger
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg burger"
                          onChange={(e) => handleCategoryItemChange(e, 'burger')}
                        />
                        Veg Burger
                      </label>
                    </div>

                    {/* Pizza category */}
                    <div className={styles.common_food_select}>
                      <h3>Pizza</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken pizza"
                          onChange={(e) => handleCategoryItemChange(e, 'pizza')}
                        />
                        Chicken Pizza
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg pizza"
                          onChange={(e) => handleCategoryItemChange(e, 'pizza')}
                        />
                        Veg Pizza
                      </label>
                    </div>

                    {/* Sekuwa category */}
                    <div className={styles.common_food_select}>
                      <h3>Sekuwa</h3>
                      <label>
                        <input
                          type="checkbox"
                          value="chicken sekuwa"
                          onChange={(e) => handleCategoryItemChange(e, 'sekuwa')}
                        />
                        Chicken sekuwa
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="veg sekuwa"
                          onChange={(e) => handleCategoryItemChange(e, 'sekuwa')}
                        />
                        Veg sekuwa
                      </label>
                    </div>

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
