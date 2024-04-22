import home from '../../assests/icons/home.png';
import shop from '../../assests/icons/shopping-cart.png';
import haircare from '../../assests/icons/hair-care.png';
import kid from '../../assests/icons/girl.png';
import more from '../../assests/icons/more.png';
import facecare from '../../assests/icons/wash-face.png';
import style from './naav.module.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export const MenuNav = () => {

    const location = useLocation();

    useEffect(() => {
    console.log(location)
    },[])

    const menus = [
        {
            title: 'Acceuil',
            icon: home,
            path: '/'
        },
        {
            title: 'Boutique',
            icon: shop,
            path: '/shop'
        },
        {
            title: 'Soins capillaires',
            icon: haircare,
            path: "/shop?category=soins-capillaires"
        },
        {
            title: 'Enfant',
            icon: kid,
            path: "/shop?category=enfant"
        },
        {
            title: 'Traitement de cheveaux',
            icon: haircare,
            path: "/shop?category=soins-cheveux"
        },
        {
            title: 'Soins de visage et corps',
            icon: facecare,
            path: "/shop?category=soins-visage"
        },
        {
            title: 'Nouveautés',
            icon: more,
            path: "/shop?category=new"
        }
    ]

    return <div className="bg-light">
           <ul className="d-flex justify-content-between align-items-center list-unstyled p-3">
             {menus.map( m =>  {
                let currentPath = `${location.pathname}${location.search}`;
             return <li>
               <a href={m.path}> 
               <div className={`${style.menuItem} ${style.borderLeft} ${ m.path === currentPath ? style.borderBottom: ''} `}>
                    <img src={m.icon} alt='' width={26} />
                    <span className={style.menuLabel}>{m.title}</span>
                </div> </a>
             </li>})}
           </ul>
           </div>
}