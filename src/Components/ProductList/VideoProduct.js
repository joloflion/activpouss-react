import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./productlist.module.scss";
import { VideoPlayer } from "../Video/VideoPlayer";
import { fetchProductVideoByCategory, fetchVideos } from "../../Redux/features/Product/VideoSlice";
import newProd from '../../assests/icons/product.png';
import { ProductTitle } from "../Title/ProductTitle";

const ProductVideoList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  const { videosByCategory,videos } = useSelector((state) => state.videos);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProductVideoByCategory(selectedCategory??'all'));
    dispatch(fetchVideos())
  }, [selectedCategory]);

  return (
    videos?.length > 0 ? 
   <div>
      <ProductTitle title={'Vidéos'} img={newProd} />
   <div className="container">
      <div className="row">
        <div className="col-12 col-sm-4 col-lg-3">
          <div className={styles.categoryTitle}>Nouveaux produits</div>
          <ul className={styles.categoryList}>
          <li
                key={"all"} // Add a key for React rendering
                className={
                  "all" === selectedCategory ? styles.selctedCategory : ""
                }
                onClick={() => {
                  dispatch(fetchProductVideoByCategory("all"));
                  setSelectedCategory("all");
                  setSelectedProduct(null); // Reset selected product when category changes
                }}
              >
                {'Tout'}
              </li>
            {categories.map((cat) => (
              <li
                key={cat.value} // Add a key for React rendering
                className={
                  cat.value === selectedCategory ? styles.selctedCategory : ""
                }
                onClick={() => {
                  dispatch(fetchProductVideoByCategory(cat.value));
                  setSelectedCategory(cat.value);
                  setSelectedProduct(null); // Reset selected product when category changes
                }}
              >
                {cat.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 col-sm-8 col-lg-9">
          {videosByCategory?.length === 0 ? <div className="d-flex justify-content-center align-items-center bg-light" style={{height: '100%', width: '100%'}}>Pas de videos pour cette option</div> :<div className={styles.videoPlayer}>
            {videosByCategory.length > 0 && (
              <VideoPlayer
                post={selectedProduct !== null ? selectedProduct : videosByCategory[0]}
              />
            )}
          </div>}
          <div className="row mt-5 p-3">
            {videosByCategory.map((p) => (
              <div
                key={p.id} // Add a key for React rendering
                onClick={() => setSelectedProduct(p)}
                className={`col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-4 mt-lg-0 border ${
                  selectedProduct?.id === p.id ? styles.selectedVideo : ""
                }`}
                style={{
                  backgroundImage: `url(${p.coverImageUrl[0]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className={styles.videoItem}>
                  {selectedProduct?.id === p.id ? (
                    <i className="fa fa-pause" aria-hidden="true"></i> // Pause icon for selected video
                  ) : (
                    <i className="fa fa-play" aria-hidden="true"></i> // Play icon for other videos
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>: null
  );
};

export default ProductVideoList;