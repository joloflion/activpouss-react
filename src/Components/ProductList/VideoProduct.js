import React, { useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../constants/Status";
import { fetchProducts, fetchProductsNouveaute, fetchProductsVedette } from "../../Redux/features/Product/ProductSlice";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";
import Loader from "../Loader/Loader";
import { VideoPlayer } from "../Video/VideoPlayer";
import { fetchProductVideoByCategory } from "../../Redux/features/Product/VideoSlice";

const ProductVideoList = () => {


  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = [
    {
      value: "all",
      name: "Soins capillaires",
    },
    {
      value: "electronics",
      name: "Traitement cheveux",
    },
    {
      value: "men's clothing",
      name: "Soins visage",
    },
    {
      value: "women's clothing",
      name: "Soins corporels",
    }
  ];


  const dispatch = useDispatch();

  const { videos, status } = useSelector((state) => state.videos);


  useEffect(() => {
    dispatch(fetchProductVideoByCategory(selectedCategory));
  }, []);

 

  

  return (
    <div  className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-lg-3">
            <div className={styles.categoryTitle}>
              Nouveaux produits
            </div>
             <ul className={styles.categoryList}>
              {categories.map(cat => <li className={cat.value === selectedCategory ? styles.selctedCategory : ''} onClick={() => dispatch(setSelectedCategory(cat.value))}>{cat.name}</li>)}
             </ul>
          </div>
          <div className="col-12 col-sm-12 col-lg-9">
          <div className={styles.videoPlayer}>
              {videos.length > 0 && <VideoPlayer post={selectedProduct !== null ? selectedProduct :videos[0]} />}
          </div>
          <div className="row mt-5 p-3">
            {videos.map( p => 
            <div onClick={() => setSelectedProduct(p)} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-4 mt-lg-0 border" style={{
              backgroundImage: `url(${p.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition:'center',
              backgroundSize: 'cover'
            }}>
               <div className={styles.videoItem}>
               <i class="fa fa-play" aria-hidden="true"></i>
               </div>
            </div>)}
          </div>
          </div>
        </div>
        
    </div>
  );
};

export default ProductVideoList;
