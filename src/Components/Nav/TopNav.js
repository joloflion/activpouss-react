import style from "./naav.module.scss";
import tiktok from "../../assests/icons/tik-tok.png";

const TopNav = () => {
  return (
    <div
      className={`d-flex justify-content-between align-items-center px-4  ${style.topNav}`}
    >
      <span className={style.topNavText}>Promo spéciale jusqu'a 50 %</span>
      <span className={style.topNavText}>Livraison partout au sénégal</span>
      <ul className="d-flex list-unstyled p-0 mt-2">
        <li className="p-0">
          <a href="https://www.facebook.com/activpouss/?locale=fr_FR">
            <div className={style.topNavIcon}>
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </div>
          </a>
        </li>
        <li className="mx-3">
          <a href="https://www.instagram.com/activpouss/">
            <div className={style.topNavIcon}>
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </div>
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/discover/activ-pouss">
            <div className={style.topNavIcon}>
              <img width={14} src={tiktok} alt="tiktok icon" />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TopNav;
