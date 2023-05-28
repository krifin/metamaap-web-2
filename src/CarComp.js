// import React, { useEffect, useState } from 'react';
// import './carousel.css';

// const Carousel = ({imgs}) => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   useEffect(() => {
//     showSlide();
//   }, [slideIndex]);

//   const showSlide = () => {
//     const carousel = document.querySelector('.carousel');
//     carousel.style.transform = `translateX(-${slideIndex * carousel.offsetWidth}px)`;
//   };

//   const nextSlide = () => {
//     const carousel = document.querySelector('.carousel');
//     if (slideIndex < carousel.childElementCount - 1) {
//       setSlideIndex(slideIndex + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (slideIndex > 0) {
//       setSlideIndex(slideIndex - 1);
//     }
//   };

//   return (
//     <div className="carousel-container">
//       <div className="carousel">
//         {/* {imgs.map((image, index)=>{
//             console.log("index:", index, " ; Image:", image);
//             <img src={image} alt="Image 1" className={slideIndex === {index} ? "active" : ""} style={{height: "1000px", width: "1000px"}}/>
//         })} */}
//         {/* <img src="https://mediapool.bmwgroup.com/cache/P9/202301/P90492224/P90492224-bmw-group-supplierthon-for-the-metaverse-and-other-virtual-experiences-01-2023-1680px.jpg" alt="IMAGE 1" className={slideIndex === 0 ? "active" : ""} style={{height: "200px", width: "200px"}} />
//         <img src="https://www.bostonglobe.com/resizer/YpOXRh3x-QuRFK_wgmr86eny6WM=/arc-anglerfish-arc2-prod-bostonglobe/public/N7YPWXJCVVFWXNO55WWBZDINV4.JPG" alt="Image 2" className={slideIndex === 1 ? "active" : ""} style={{height: "200px", width: "200px"}}/>
//         <img src="https://www.digitalavmagazine.com/wp-content/uploads/2022/03/Visyon-Cupra-Metahype-a.jpeg" alt="Image 3" className={slideIndex === 2 ? "active" : ""} style={{height: "200px", width: "200px"}}/> */}
//       </div>
//       <button id="prevBtn" onClick={prevSlide}>Previous</button>
//       <button id="nextBtn" onClick={nextSlide}>Next</button>
//     </div>
//   );
// };

// export default Carousel;
import React, { useEffect, useState } from "react";

import './Carousel.css';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
  ];


const CarComp = () => {
  
  const carouselItems = [
    "https://mediapool.bmwgroup.com/cache/P9/202301/P90492224/P90492224-bmw-group-supplierthon-for-the-metaverse-and-other-virtual-experiences-01-2023-1680px.jpg",
    "https://www.bostonglobe.com/resizer/YpOXRh3x-QuRFK_wgmr86eny6WM=/arc-anglerfish-arc2-prod-bostonglobe/public/N7YPWXJCVVFWXNO55WWBZDINV4.JPG",
    "https://www.01net.com/i/0/0/af7/11f694c76cbd83569dfea09a18da9.jpg",
    "https://www.venteurmag.com/wp-content/uploads/2023/04/Metaverse-Shoe-Shop.jpeg",
    
  ]
  
  
  
  const [activeIndex, setActiveIndex] = useState(0);
  function handleChange(i){
    if(i<4 && i>=0){
      setActiveIndex(i);
    }
  }
  useEffect(()=>{
    
  },[activeIndex])
  
  return (
    <div className="carousel-container">
      
      
      <div className="main_img"><img src={carouselItems[activeIndex]} style={{height: '100vh', width: '90vw', borderRadius: '5%'}}/></div>
      <div className="images" style={{display: 'flex', flexDirection:'row', marginTop: "10px", alignItems: 'center', justifyContent: 'center'}}>
      <img src= "right_arrow.png" style={{height: '20px', width: '20px', margin: '5px 5px 20px', cursor: 'pointer',transform: 'rotate(180deg)'}} onClick={()=>handleChange(activeIndex-1)}/>
        {carouselItems.map((image, i) => (
          <img src={image} alt="carousel_img" style={{height: '40px', width: '40px', borderRadius: '100%', margin: '5px 5px 20px', cursor: 'pointer'}} onClick={()=>handleChange(i)} key={i}/>
        ))}
        <img src= "right_arrow.png" style={{height: '20px', width: '20px', margin: '5px 5px 20px', cursor: 'pointer'}} onClick={()=>handleChange(activeIndex+1)}/>
      </div>
    </div>
  );
};

export default CarComp;

