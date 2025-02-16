import React, { useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../constants/Status";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";
import Loader from "../Loader/Loader";
import { fetchProductCategory } from "../../Redux/features/Product/ProductCategorySlice";
import { CATEGORIES, CATEGORIES_LIST } from "../../constants/categories";
import { fetchCategories } from "../../Redux/features/Category/CategorySlice";
import { Spin } from "antd";

const ProductCategoryList = () => {


  const [selectedCategory, setSelectedCategory] = useState();




  const dispatch = useDispatch();

  const { productCategory,  status, loading } = useSelector((state) => state.productCategory);
  const { searchedProduct, category } = useSelector(
    (state) => state.productFilter
  );

  const { categories } = useSelector((state) => state.categories);


  useEffect(() => {
    dispatch(fetchProductCategory());
    dispatch(fetchCategories());
  }, []);


  return (
    <div  className="container">

        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-3">
            <div className={styles.categoryTitle}>
              Nouveaux produits
            </div>
             <ul className={styles.categoryList}>
             <li className={'all' === selectedCategory ? styles.selctedCategory : ''} onClick={() => {
                setSelectedCategory('all');
                dispatch(fetchProductCategory('all'));

                }}>Tout</li>
              {categories.map(cat => <li className={cat.value === selectedCategory?.value ? styles.selctedCategory : ''} onClick={() => {
                setSelectedCategory(cat);
                dispatch(fetchProductCategory(cat.value));

                }}>{cat.title}</li>)}
             </ul>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-9">
          <Spin spinning={status === 'loading'} tip="Loading..." /> {/* Add Spin component for loader */}
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
