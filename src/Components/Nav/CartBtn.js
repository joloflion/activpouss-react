
import cartIcon from '../../assests/icons/cart.png';
import style  from './naav.module.scss';
import { useSelector } from 'react-redux';


export const CartBtn = ({label = true}) => {
  const { cart } = useSelector((state) => state.cart);

    return  <a href='cart'> 
            <div className={`text-center ${style.cart}`}>
                <img src={cartIcon} alt=''  width={30} />
                {label && <div className={`mt-1 ${style.subMenuTitle}`}>Panier</div>}
                <div className={style.cartBadge}>{cart?.length}</div>
            </div>
            </a>
}