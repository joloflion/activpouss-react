import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../Redux/features/Category/CategorySlice';
import home from '../../assests/icons/home.png';
import shop from '../../assests/icons/shopping-cart.png';
import haircare from '../../assests/icons/hair-care.png';
import style from './naav.module.scss';
import logo  from '../../assests/logo.png'
import {CartBtn} from './CartBtn';

export const MenuNav = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

  useEffect(() => {
    dispatch(fetchCategories());
  }, [location]);

  // Predefined menu items like Home and Shop
  const staticMenus = [
    {
      title: 'Accueil',
      icon: home,
      path: '/',
    },
    {
      title: 'Boutique',
      icon: shop,
      path: '/shop',
    },
  ];

  // Dynamically generated menu items based on categories
  const categoryMenus = categories.map((category) => ({
    title: category.title,
    icon: category.images[0] ?? haircare,
    path: `/shop?category=${category.value}`,
  }));

  // Combine static and dynamic menus
  const menus = [...staticMenus, ...categoryMenus];

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='d-flex bg-light justify-content-between  align-items-center px-3 '>
      <img width={70} height={70} src={logo} />

    <div  className={`bg-light ${style.menuBar}`}>
      {/* Hamburger button for mobile */}
      <div className={style.hamburger} onClick={toggleMenu}>
        <div className={style.hamburgerLine}></div>
        <div className={style.hamburgerLine}></div>
        <div className={style.hamburgerLine}></div>
      </div>

      {/* Menu list */}
      <ul
        className={`d-flex justify-content-start align-items-center list-unstyled p-3 ${style.menuList} ${
          isMenuOpen ? style.menuOpen : ''
        }`}
      >
        {menus.map((menu, index) => {
          let currentPath = `${location.pathname}${location.search}`;
          return (
            <li key={index}>
              <a href={menu.path}>
                <div
                  className={`${style.menuItem} ${style.borderLeft} ${
                    menu.path === currentPath ? style.borderBottom : ''
                  }`}
                >
                  <img src={menu.icon} alt="" width={22} />
                  <span className={style.menuLabel}>{menu.title}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
    <CartBtn />
    </div>

  );
};