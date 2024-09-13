import {  useContext } from "react";
import styles from "../Styles/Home/AboutUs.module.css";
import { StoreContext } from "../Context/StoreContext";
export const AboutUs = () => {
  const{aboutUsRef}=useContext(StoreContext);
  return (
    <>
      <div  ref={aboutUsRef} className={styles.aboutUs_container}>
        <div className={styles.aboutUs_img_container}>
          <img src="/Images/AboutUs/AboutUs_img.png" alt="" />
          <div className={styles.aboutUs_details_container}>
            <h2>About Us</h2>
            <p>
               Hamro Kitchen is a modern cloud kitchen offering delicious,
              home-style meals conveniently delivered to your doorstep. Whether
              you&apos;re craving comfort food or looking for healthy options, Hamro
              Kitchen brings the taste of home to you. 
            </p>

            <button>Learn More </button>
          </div>
        </div>
      </div>
    </>
  );
};
AboutUs.displayName = "AboutUs";