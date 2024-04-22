import React, { useEffect} from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../constants/Status";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./productlist.module.scss";
import Loader from "../Loader/Loader";
import { fetchProductVedette } from "../../Redux/features/Product/ProductVedetteSlice";

const ProductVedetteList = () => {

  const dispatch = useDispatch();

  const { productVedettes, status } = useSelector((state) => state.productVedettes);
  const { searchedProduct, category } = useSelector(
    (state) => state.productFilter
  );

  useEffect(() => {
    dispatch(fetchProductVedette());
  }, []);

 console.log(productVedettes)

  

  return (
    <div  className="container">
        <div className='row'>
          {productVedettes?.map((product) => {
            return <div className="col-6 col-sm-4 col-lg-3 col-xl-3 mt-4"> <ProductCard key={product?.id} product={product} /> </div>;
          })}
        </div>
    </div>
  );
};

export default ProductVedetteList;
