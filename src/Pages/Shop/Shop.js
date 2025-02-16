import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchProductBycategory,
  fetchProducts,
} from "../../Redux/features/Product/ProductSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";
import TopNav from "../../Components/Nav/TopNav";
import { MenuNav } from "../../Components/Nav/MenuNav";
import MyFooter from "../../Components/Footer/Footer";

const Shop = () => {
  const location = useLocation();

  const dispatcher = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    if (category === null) {
      dispatcher(fetchProducts());
    } else {
      dispatcher(fetchProductBycategory(category));
    }
  }, []);

  return (
    <div>
      <TopNav />
      <MenuNav />
      <div className="container" style={{ marginBottom: "150px" }}>
        {products?.length > 0 ?<div className="row">
          {products.map((p) => (
            <div className="col-6 col-md-4 col-lg-3 mt-3">
              <ProductCard product={p} />{" "}
            </div>
          ))}
        </div>: <div className="bg-light p-5 text-center">Aucun produit disponible pour cette option</div>}
      </div>
      <MyFooter/>
    </div>
  );
};

export default Shop;
