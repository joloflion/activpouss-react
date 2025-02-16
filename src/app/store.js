import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Redux/features/Product/ProductSlice";
import CartReducer from "../Redux/features/Cart/CartSlice";
import FilterProductReducer from "../Redux/features/ProductFilter/FilterSlice";
import VideoReducer from "../Redux/features/Product/VideoSlice";
import ProductSlidesReducer from "../Redux/features/Product/ProductSlidesSlice";
import ProductDetailReducer from "../Redux/features/Product/ProductDetailSlice";
import ProductVedettesReducer from "../Redux/features/Product/ProductVedetteSlice";
import ProductCategoryReducer from "../Redux/features/Product/ProductCategorySlice";
import ProductNouveauteReducer from "../Redux/features/Product/ProductNouveauteSlice";
import ProductRelatedReducer from "../Redux/features/Product/ProductRelatedSlice";
import CategoryReducer from "../Redux/features/Category/CategorySlice";


export const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    productFilter: FilterProductReducer,
    videos: VideoReducer,
    productSlides: ProductSlidesReducer,
    productDetail: ProductDetailReducer,
    productVedettes: ProductVedettesReducer,
    productCategory: ProductCategoryReducer,
    productNouveaute: ProductNouveauteReducer,
    productRelated: ProductRelatedReducer,
    categories: CategoryReducer
  },
});
