import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import style from "./slider.module.scss";
import { useDispatch, useSelector } from "react-redux";
import TextTruncate from "react-text-truncate";
import { fetchProductsSlides } from "../../Redux/features/Product/ProductSlidesSlice";
import { useNavigate } from "react-router-dom";

const Slider = () => {

  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const { productSlides } = useSelector((state) => state.productSlides);


  useEffect(() => {
     dispatcher(fetchProductsSlides())
  },[])
  
  console.log(productSlides)
  return (
    <div className={style.slideCover}>
    <Carousel  
    showIndicators={false}
    swipeable={false} 
    showStatus={false} 
    
    infiniteLoop={true}>
    { productSlides.length > 0 && productSlides.map (p => 
      <div className={`row ${style.sliderItem}`}>
          <div className="col-12 col-sm-6 col-lg-6 col-xl-5">
            <img className={style.slideImage} src={p.images[0]} alt={p.id} />
          </div>
          <div className={`col-12 col-sm-6 col-lg-6 col-xl-7 text-start p-5 ${style.bgGrey}`}>
            <h3 className="mb-3 text-start">{p.title}</h3>
            <TextTruncate
              line={5}
              element="p"
              truncateText="..."
              text={p.description}
              textTruncateChild={<button  
              className={style.plusBtn}
              onClick={() => navigate('/products/'+p.id)}
              >En savoir plus</button>}/>
          </div>
        </div>)}
    </Carousel>
    </div>
  );
};

export default Slider;
