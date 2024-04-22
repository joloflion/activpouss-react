import React, { useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../constants/Status";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";
import Loader from "../Loader/Loader";
import { fetchProductCategory } from "../../Redux/features/Product/ProductCategorySlice";

const ProductCategoryList = () => {


  const [selectedCategory, setSelectedCategory] = useState();

  const categories = [
    {
      value: "enfant",
      name: "Enfants",
    },
    {
      value: "traitement-cheveux",
      name: "Traitement cheveux",
    },
    {
      value: "soins-visage",
      name: "Soins visage",
    },
    {
      value: "soins-corporels",
      name: "Soins corporels",
    }
  ];


  const dispatch = useDispatch();

  const { productCategory, status } = useSelector((state) => state.productCategory);
  const { searchedProduct, category } = useSelector(
    (state) => state.productFilter
  );

  useEffect(() => {
    dispatch(fetchProductCategory());
  }, []);


  return (
    <div  className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-3">
            <div className={styles.categoryTitle}>
              Nouveaux produits
            </div>
             <ul className={styles.categoryList}>
              {categories.map(cat => <li className={cat.value === selectedCategory ? styles.selctedCategory : ''} onClick={() => {
                setSelectedCategory(cat.value);
                dispatch(fetchProductCategory(cat.value));

                }}>{cat.name}</li>)}
             </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-9">
          <div className='row'>
              {productCategory?.map((product) => {
                return <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-4"> <ProductCard key={product?.id} product={product} /> </div>;
              })}
            </div>
          </div>
        </div>
        
    </div>
  );
};

export default ProductCategoryList;
