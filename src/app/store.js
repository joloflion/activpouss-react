import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Redux/features/Product/ProductSlice";
import CartReducer from "../Redux/features/Cart/CartSlice";
import WishListReducer from "../Redux/features/wishlist/WishListSlice";
import FilterProductReducer from "../Redux/features/ProductFilter/FilterSlice";
import VideoReducer from "../Redux/features/Product/VideoSlice";
import ProductSlidesReducer from "../Redux/features/Product/ProductSlidesSlice";
import ProductDetailReducer from "../Redux/features/Product/ProductDetailSlice";
import ProductVedettesReducer from "../Redux/features/Product/ProductVedetteSlice";
import ProductCategoryReducer from "../Redux/features/Product/ProductCategorySlice";
import ProductNouveauteReducer from "../Redux/features/Product/ProductNouveauteSlice";
import ProductRelatedReducer from "../Redux/features/Product/ProductRelatedSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    wishlist: WishListReducer,
    productFilter: FilterProductReducer,
    videos: VideoReducer,
    productSlides: ProductSlidesReducer,
    productDetail: ProductDetailReducer,
    productVedettes: ProductVedettesReducer,
    productCategory: ProductCategoryReducer,
    productNouveaute: ProductNouveauteReducer,
    productRelated: ProductRelatedReducer,
  },
});
