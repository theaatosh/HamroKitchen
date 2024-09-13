import { useContext } from "react";
import styles from "../Styles/Footer/Footer.module.css";
import {
  FaFacebook,
  FaInstagramSquare,
  FaViber,
  FaWhatsappSquare,
  FaArrowAltCircleRight
} from "react-icons/fa";
import { StoreContext } from "../Context/StoreContext";
export const Footer = () => {
  const{contactUsRef}=useContext(StoreContext);
  return (
    <>
      <footer className={styles.footer} ref={contactUsRef}>
        <div className={styles.footer_container}>
          <div className={styles.footer_columns}>
            <div className={styles.col_1}>
              <h2>Hamro Kitchen</h2>
              <p>Hamro Kitchen: The one and only cloud kitchen in Nepal.</p>
            </div>

            <div className={styles.col_2}>
              <h2>Legal</h2>
              <ul className={styles.footer_list}>
                <li>Terms & Condition</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div className={styles.col_3}>
              <h2>Contact Us</h2>
              <ul className={styles.footer_list}>
                <li>Help & Support</li>
                <li>Partner with Us</li>
              </ul>
            </div>

            <div className={styles.col_4}>
              <h2>We deliver to:</h2>
              <ul className={styles.footer_list}>
                <li>Kathmandu</li>
                <li>Lalitpur</li>
                <li>Bhaktapur</li>
              </ul>
            </div>
             </div>
            
            {/* bottom part */}
            <div className={styles.footer_bottom}>
              <div className={styles.left}>
              <h2>Add Us On:</h2>
              <div className={styles.add_us_icon}>
                <FaFacebook className={styles.social_icons} />
                <FaInstagramSquare className={styles.social_icons} />
                <FaViber className={styles.social_icons} />
                <FaWhatsappSquare className={styles.social_icons} />
              </div>
              </div>

              <div className={styles.right}>
              <h2>Leave Your Email To Get Offers </h2>
              <input type="email" placeholder="Email Here"/>
              <FaArrowAltCircleRight className={styles.arrow_icon}/>
              </div>
          </div>
          <div className={styles.copyright_div}>
          <hr />
            <p>Copyright 2024&copy;Hamro Kitchen.com -All Right Reserved</p></div>
        </div>
      </footer>
    </>
  );
};
