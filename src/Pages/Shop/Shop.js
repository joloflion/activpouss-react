import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProductBycategory, fetchProducts } from "../../Redux/features/Product/ProductSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Shop = () => {

    const location = useLocation();

    const dispatcher = useDispatch()
  const { products, status } = useSelector((state) => state.products);


    useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if(category === null){
        dispatcher(fetchProducts())
    } else{
        dispatcher(fetchProductBycategory(category));
  

    }

    },[])

    return <div className="container" style={{marginBottom: '150px'}}>
               <div className="row">
                 {products.map(p => <div className="col-6 col-md-4 col-lg-3 mt-3"><ProductCard product={p} /> </div>)}
               </div>
           </div>
}

export default Shop;