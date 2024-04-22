import React from "react";
import naturel from "../../assests/icons/leaves.png";
import delivery from "../../assests/icons/fast-delivery.png";
import paiement from "../../assests/icons/payment-method.png";
import support from "../../assests/icons/customer-service.png";
import styles from './category.module.scss';

const Caterogry = () => {
  const categories = [
    {
      img: naturel,
      name: "Produits 100% naturels",
      id: 1,
    },
    {
      img: delivery,
      name: "Livraison immédiate",
      id: 2,
    },
    {
      img: paiement,
      name: "Paiement à la livraison",
      id: 3,
    },
    {
      img: support,
      name: "Service client disponible",
      id: 4,
    },
  ];
  return (
    <div className="container">
      <div className={`row`}>
        {categories.map((Category) => {
          return (
            <div key={Category.id} className={'col-12 col-md-6 col-lg-3'}>
              <div className={styles.categoryItem}>
              <div className={styles.categoryIcon}>
                  <img src={Category.img} alt={Category.name} />
                </div>
                <div className={`text-center mt-3 ${styles.categoryName}`}>{Category.name}</div>
              </div>
                
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Caterogry;
