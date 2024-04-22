import React from "react";
import { TopNav } from "./TopNav";
import { SearchNav } from "./SearchNav";
import { MenuNav } from "./MenuNav";
import logo from '../../assests/logo.png';
import style from './naav.module.scss';
import { CartBtn } from "./CartBtn";

const Naav = () => {

  return (
    <>
    <div className="d-xs-block d-sm-block d-md-block d-lg-none">
      <div className={`d-flex justify-content-between py-2 px-3 align-items-center  ${style.mobileMenu}`} >
         <a href="/"><img width={54} src={logo} alt="logo"  /> </a>
         <div className="d-flex justify-content-end align-items-center">
          <CartBtn label={false} />
          <button className={`ms-3 ${style.slideButton}`}>
            <i class="fa fa-user-o" aria-hidden="true"></i>
          </button>
         </div>
      </div>
    </div>
    <div className="d-none d-sm-none d-md-none d-lg-block">
      <TopNav />
      <SearchNav />
      <MenuNav />
    </div>
    </>
    
  );
};

export default Naav;

// <NavLink
//                 to="/about"
//                 className={`${styles.navLink} ${styles.menuLink}`}
//               >
//                 About Us
//               </NavLink>
//               <NavLink
//                 to="/wishlist"
//                 className={`${styles.navLink} ${styles.menuLink}`}
//               >
//                 Wishlist
//               </NavLink>
