import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./cart.module.scss";
import {
  removeFromCart,
  removeAll,
  reduceProduct,
  incrementProduct,
} from "../../Redux/features/Cart/CartSlice";
import EmptyCart from "../../Components/EmptyCart/EmptyCart";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  //calculate total price
  const totalPrice = products.cart.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );

  //remove product handler
  const removeProductHandler = (product) => {
    dispatch(removeFromCart(product));
    toast.warning(`${product.title.slice(0, 20)} est retiré de votre panier avec succès`, {
      autoClose: 1000,
    });
  };

  //remove all product handler
  const removeAllProduct = () => {
    dispatch(removeAll());
    toast.error("Votre panier est vide pour le moment", {
      autoClose: 1000,
    });
  };

  
  const createWhatsAppMessage = () => {
    const message = products.cart.map((product) => {
      return `${product.title}: ${product.quantity} x ${product.price} CFA\n`;
    }).join("\n");
    const totalMessage = `Total: ${totalPrice.toFixed(2)} CFA\n`;
    const whatsappMessage = `Bonjour, voici ma commande:\n${message}${totalMessage}`;
    return encodeURIComponent(whatsappMessage);
  };


  if (products.cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container py-5 mt-4">
      <h2 className="py-3 text-center">Mon panier</h2>
      {products?.cart?.map((product) => {
        return (
          <div key={product.id} className={styles.cartCard}>
            <div>
              <img src={product.images[0]} alt="product" width="50px" />
            </div>
            <div>
              <h5 style={{ maxWidth: "180px" }}>
                {product.title.slice(0, 20)}
              </h5>
              <h6 className="product-price">CFA {product.price}</h6>
            </div>
            <div className="cartBtns">
              <button
                className={`${styles.cartBtn} fw-bold btn-secondary`}
                onClick={() => dispatch(incrementProduct(product))}
              >
                +
              </button>
              <h6>{product.quantity}</h6>
              <button
                className={`${styles.cartBtn} fw-bold btn-secondary`}
                onClick={() => dispatch(reduceProduct(product))}
              >
                -
              </button>
            </div>
            <div className="text-end">
              <h6 className="product-price">CFA {(product.price * product.quantity).toFixed(2)}</h6>
              <button
                className="btn btn-danger"
                onClick={() => {
                  removeProductHandler(product);
                }}
              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        );
      })}

      <hr />
      <div className="mb-5 d-flex justify-content-between">
      <div className="mt-4"> 
          <p>Passer votre commande maintenant en </p>
          <h5 className="my-3">appelant le <span className="text-pink">+221 77 195 49 74</span> </h5>
          <h5>Ou sur whatsapp <a className="btn btn-success text-white" href={`https://wa.me/+221771954974?text=${createWhatsAppMessage()}`}> <i class="fa fa-whatsapp" aria-hidden="true"></i> Whatsapp</a></h5>
        </div>
        <h5 className="product-price">
          Prix Total : CFA{totalPrice.toFixed(2)}
        </h5>
      </div>
    </div>
  );
};

export default Cart;
