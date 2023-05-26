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
import Carousel from "react-elastic-carousel";
import Item from "./Item.js";
import './Carousel.css';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
  ];


const CarComp = () => {
  
  const carouselItems = React.useState([
    {image: "https://mediapool.bmwgroup.com/cache/P9/202301/P90492224/P90492224-bmw-group-supplierthon-for-the-metaverse-and-other-virtual-experiences-01-2023-1680px.jpg",},
    {image: "https://www.bostonglobe.com/resizer/YpOXRh3x-QuRFK_wgmr86eny6WM=/arc-anglerfish-arc2-prod-bostonglobe/public/N7YPWXJCVVFWXNO55WWBZDINV4.JPG",},
    {image: "https://www.digitalavmagazine.com/wp-content/uploads/2022/03/Visyon-Cupra-Metahype-a.jpeg",},
    {image: "https://www.venteurmag.com/wp-content/uploads/2023/04/Metaverse-Shoe-Shop.jpeg",},
    {image: "https://style.me/wp-content/uploads/2022/03/fashion-nfts-metaverses-blog-article.jpg"}
  ])
  // const [images, setImages] = useState([]);
  // useEffect(()=>{
  //   setImages(imgs);
  // })
  const [activeIndex, setActiveIndex] = useState(0);
  const customPagination = ({ pages, activePage }) => (
    <div className="custom-pagination">
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className={`pagination-item ${activePage === pageIndex ? 'active' : ''}`}
          onClick={() => setActiveIndex(pageIndex)}
        >
      {page.image && (
            <img
              src={page.image}
              alt={`Image ${(pageIndex * pages.length) + 1}`}
            />
          )}
        </div>
      ))}
    </div>
  );
  return (
    <div className="carousel-container">
      {/* <h1 style={{ textAlign: "center", color: "white" }}>Example to setup your carousel in react</h1> */}
      <Carousel breakPoints={breakPoints}>
          {/* This isn't working as of now. Need to check it out
          {images.map((image)=>{
            console.log(image);
            <Item><img src={image} alt="image" /></Item>
          })} */}
          <Item><img style={{height: '100%', width: '100%', borderRadius: '10%'}} src="https://mediapool.bmwgroup.com/cache/P9/202301/P90492224/P90492224-bmw-group-supplierthon-for-the-metaverse-and-other-virtual-experiences-01-2023-1680px.jpg" alt="image" /></Item>
          <Item><img style={{height: '100%', width: '80%', borderRadius: '10%'}} src="https://www.bostonglobe.com/resizer/YpOXRh3x-QuRFK_wgmr86eny6WM=/arc-anglerfish-arc2-prod-bostonglobe/public/N7YPWXJCVVFWXNO55WWBZDINV4.JPG" alt="image" /></Item>
          <Item><img style={{height: '100%', width: '80%', borderRadius: '10%'}} src="https://www.digitalavmagazine.com/wp-content/uploads/2022/03/Visyon-Cupra-Metahype-a.jpeg" alt="image"/></Item>
          <Item><img style={{height: '100%', width: '80%', borderRadius: '10%'}} src="https://www.venteurmag.com/wp-content/uploads/2023/04/Metaverse-Shoe-Shop.jpeg" alt="image" /></Item>
          <Item><img style={{height: '100%', width: '80%', borderRadius: '10%'}} src="https://www.yankodesign.com/images/design_news/2022/01/the-metaverse-is-inevitable-and-its-already-changing-product-design-as-we-know-it/metaverse-marketplace.jpg" alt="image" /></Item>
          <Item><img style={{height: '100%', width: '80%', borderRadius: '10%'}} src="https://www.analyticsinsight.net/wp-content/uploads/2022/08/Welcome-to-the-New-World-of-Art-and-Culture-with-Metaverse.jpg" alt="image" /></Item>
          
        </Carousel>
    </div>
  );
};

export default CarComp;

