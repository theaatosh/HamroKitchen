import { useContext, useEffect, useRef, useState } from "react";
import styles from "../Styles/Home/Landing.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { StoreContext } from "../Context/StoreContext";


export const Landing = () => {
  const Images = [
    "/Images/LandingPage/img1.jpg",
    "/Images/LandingPage/img2.jpg",
    "/Images/LandingPage/img3.jpg",
    "/Images/LandingPage/img4.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const {searchItem,handleSearchItem,}=useContext(StoreContext);
  const intervalRef = useRef(null);

  //handle left image sliding
  const handleLeftClick = () => {
    setCurrentIndex((preVal) =>
      preVal === 0 ? Images.length - 1 : preVal - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((preVal) =>
      preVal === Images.length - 1 ? 0 : preVal + 1
    );
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevVal) =>
        prevVal === Images.length - 1 ? 0 : prevVal + 1
      );
    }, 3000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [Images.length]);
  return (
    <>
      <div className={styles.main_container}>
        <MdKeyboardArrowLeft
          onClick={handleLeftClick}
          className={
            currentIndex === 1 || currentIndex === 2||currentIndex === 3
              ? styles.left_white_btn
              : styles.left_btn
          }
        />
        <div className={styles.sliding_img_container}>
          <img
            src={Images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className={styles.slide_img}
          />
        </div>
        <MdKeyboardArrowRight
          onClick={handleRightClick}
          className={
            currentIndex === 1 || currentIndex === 2 || currentIndex === 3
              ? styles.right_white_btn
              : styles.right_btn
          }
        />

        {/* center search bar */}
        <div className={styles.search_bar}>
          <input type="text" placeholder="Search here" value={searchItem } onChange={(e)=>handleSearchItem(e)} 
            onKeyDown={(e)=>handleSearchItem(e)}/>
        </div>
      </div>
    </>
  );
};
