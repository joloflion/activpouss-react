import React from "react";
import Caterogry from "../../Components/Category/Caterogry";
import Slider from "../../Components/Slider/Slider";
import { ProductTitle } from "../../Components/Title/ProductTitle";
import ProductVedetteList from "../../Components/ProductList/ProductVedetteList";
import ProductCategoryList from "../../Components/ProductList/ProductCategoryList";
import ProductNouveauList from "../../Components/ProductList/ProductNouveauList";
import newProd from '../../assests/icons/product.png';
import category from '../../assests/icons/apps.png';
import stars from '../../assests/icons/shining.png';
import ProductVideoList from "../../Components/ProductList/VideoProduct";
import { MenuNav } from "../../Components/Nav/MenuNav";
import TopNav from "../../Components/Nav/TopNav";
import MyFooter from "../../Components/Footer/Footer";


const Home = () => {
  return (
    <div >
      <TopNav />
      <MenuNav />
      <div className="container-fluid p-0">
        <Slider />
      </div>
      <div className="container-fluid p-0">
      <Caterogry />
      </div>
      <ProductTitle title={'Produits vedettes'} img={stars} />
      <ProductVedetteList />
      <ProductTitle title={'Produits par catégories'} img={category} />
      <ProductCategoryList />
      <ProductTitle title={'Nouveaux produits'} img={newProd} />
      <ProductNouveauList />
      <div style={{height: '60px'}}></div>
      <ProductVideoList />
      <div style={{height: '60px'}}></div>
      <MyFooter />
    </div>
  );
};

export default Home;
