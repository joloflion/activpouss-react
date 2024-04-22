import { SearchBar } from './SearchBar';
import favorite from '../../assests/icons/love.png';
import user from '../../assests/icons/user.png';
import style  from './naav.module.scss';
import { useSelector } from 'react-redux';
import { CartBtn } from './CartBtn';
import logo from '../../assests/logo.png';



export const SearchNav = () => {

  const { cart } = useSelector((state) => state.cart);

  console.log(cart)
    return <div className='d-flex mx-5 pt-3 justify-content-between'>
             <div className='d-flex justify-content-between align-items-center'>
               <img width={65} height={65} src={logo} alt='logo' style={{marginTop: '-5px', marginRight: '30px'}} />
               <SearchBar />
             </div>
           

               <div>
                <ul className='d-flex align-items-center p-0 list-unstyled'>
                    <li>
                      <CartBtn />
                    </li>
                    <li className='mx-5'>
                    <div className='text-center'>
                            <img src={favorite} alt='' width={26}/>
                            <div className={`mt-1 ${style.subMenuTitle}`}>Favorits</div>
                        </div>
                        
                    </li>
                    <li>
                    <div className='text-center'>
                            <img src={user} alt=''  width={26} />
                            <div className={`mt-1 ${style.subMenuTitle}`}>Mon compte</div>
                        </div>
                    </li>
                </ul>
               </div>
           </div>

}