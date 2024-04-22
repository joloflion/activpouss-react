import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/features/Cart/CartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import styles from "./productdetail.module.scss";
import { useEffect } from "react";
import { fetchProductById } from "../../Redux/features/Product/ProductDetailSlice";
import { fetchProductRelated } from "../../Redux/features/Product/ProductRelatedSlice";
import ProductCard from "../ProductCard/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart);


  const isProductInCart = (products, productDetail) => {
    return products?.cart?.filter(v => v.id === productDetail?.id)?.length > 0 ?? false;

  }

  const addProduct = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product?.title.slice(0, 20)} est ajouté au panier avec succès !`, {
      autoClose: 1000,
    });
  };


  useEffect(()=> {
      dispatch(fetchProductById(id));
      dispatch(fetchProductRelated(productDetail?.category??"all"))
  },[])

  const {productDetail} = useSelector((state) => state.productDetail);
  const {productRelated} = useSelector((state) => state.productRelated);

  const createWhatsAppMessage = () => {
    const message = `${productDetail?.title}: ${productDetail?.price} CFA\n`;
    const whatsappMessage = `Bonjour, je suis intéressé par le produit suivant:\n${message}`;
    return encodeURIComponent(whatsappMessage);
  }

  return (
    <div className={`${styles.detailWrapper} container py-4`}>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Acceuil</Breadcrumb.Item>
        <Breadcrumb.Item active>{productDetail?.title}</Breadcrumb.Item>
      </Breadcrumb>
      <h1>{productDetail?.title}</h1>
      <hr className="mb-4" />
      <div className={styles.mainDetailWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={productDetail?.images[0]}
            alt={productDetail?.title}
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        </div>
        <div className="pt-3">
          <h4>{productDetail?.title}</h4>
          <h6 className="text-success">
            {//productDetail?.rating.count > 1 && "In Stock"
            }
          </h6>
          <h6> <span className="fw-bolder">Categorie</span>: {productDetail?.category}</h6>
          <p className="py-1">{productDetail?.description}</p>
          <h5>Prix: <span className="product-price">{productDetail?.price}</span> CFA</h5>
          {<button disabled={isProductInCart(products, productDetail)} className="btn btn-secondary mt-2" onClick={() => addProduct(productDetail)}>
           <i class="fa fa-shopping-bag me-2" aria-hidden="true"></i>
            Ajouter au panier
          </button>}
          {<button className="btn btn-success mt-2 ms-3" onClick={() => navigate('/cart')}>
            <i class="fa fa-shopping-bag me-2" aria-hidden="true"></i>
            Voir mon panier
          </button>}

          <div className="mt-4"> 
          <p>Passer votre commande maintenant en </p>
          <h5 className="my-3">appelant le <span className="text-pink">+221 77 195 49 74</span> </h5>
          <h5>Ou sur whatsapp <a className="btn btn-success text-white" href={`https://wa.me/+221771954974?text=${createWhatsAppMessage()}`} > <i class="fa fa-whatsapp" aria-hidden="true"></i> Whatsapp</a></h5>
        </div>
          
        </div>

        
      </div>

      
      <hr className="mt-5" />
      <div className={styles.productSliderWrapper}>
        <h4 className="py-2">Autres produits que vous pourriez vous plaire</h4>
        <div className="row">
        {productRelated?.map((product) => {
                return <div className="col-6 col-sm-6 col-lg-3 col-xl-3 mt-4"> <ProductCard key={product?.id} product={product} /> </div>;
              })}
        </div>
      
      </div>
      <div style={{height: '120px'}}></div>
    </div>
  );
};

export default React.memo(ProductDetail);
