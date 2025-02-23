import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/Cart/CartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import styles from "./productCard.module.scss";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const ProductCard = ({ product }) => {

  const title = product?.title.slice(0, 20);
  const dispatch = useDispatch();
  //const cartItems = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();

  //add product to cart handler
  const addProduct = () => {
    dispatch(addToCart(product));
    toast.success(`${product?.title.slice(0, 20)} est ajouté au panier avec succès !`, {
      autoClose: 1000,
    });
  };

  return (
    <Card key={product.id}
    hoverable
   
    cover={<a href={`/products/${product?.id}`}><img style={{height: '240px', width:'100%'}} alt={product.title} src={product.images[0]} /></a>}
  >
    <Meta className="mb-4" style={{fontSize: '16px'}} title={product.title} description={`${product?.price} CFA`}  />
    <button className={styles.commonBtn} onClick={() => addProduct()}>Ajouter au panier</button>
  </Card>
  //   <div className={styles.productCard}>
  //     <img 
  //     src={product?.images[0]} 
  //     alt={product?.title} 
  //     className={styles.cardImg}
  //     onClick={() => {
  //       navigate(`/products/${product?.id}`);
  //       window.location.reload()

  //       }} />
  //     <h1 className={styles.cardTitle}>{product?.title}</h1>
  //     <h2 className={"product-price"}>{product?.price} CFA</h2>
  //     <button className={styles.commonBtn} onClick={() => addProduct()}>Ajouter au panier</button>
  //     {/* <Card
  //       style={{ width: "100%", textAlign: "center" }}
  //       className={styles.productCard}
  //     >
  //       <Card.Img
  //         onClick={() => navigate(`/products/${product?.id}`)}
  //         variant="top"
  //         src={product?.image}
  //         className={styles.cardImg}
  //       />
  //       <Card.Body>
  //         <Card.Title>{title}</Card.Title>
  //         <Card.Text>${product?.price}</Card.Text>
  //         <Button className={styles.commonBtn} onClick={addProduct}>
  //           ADD TO CART
  //         </Button>
  //       </Card.Body>
  // </Card> */}
  //   </div>
  );
};

export default memo(ProductCard);
