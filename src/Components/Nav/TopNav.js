import style from './naav.module.scss';

export const TopNav = () => {
    return <div className={`d-flex justify-content-between align-items-center px-4  ${style.topNav}`}>
             <span className={style.topNavText}>Promo spéciale jusqu'a 50 %</span>
             <span className={style.topNavText}>Livraison partout au sénégal</span>
             <ul className="d-flex list-unstyled p-0 mt-2">
                <li className='p-0'>
                    <div className={style.topNavIcon}>
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                    </div>
                </li>
                <li className='mx-3'>
                    <div className={style.topNavIcon}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </div>
                </li>
                <li>
                    <div className={style.topNavIcon}>
                        <i className="fa fa-ticktock" aria-hidden="true"></i>
                    </div>
                </li>
             </ul>
          </div>
}