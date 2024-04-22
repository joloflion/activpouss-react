import styles from './title.module.scss';

export const ProductTitle = ({img, title}) => {

    return <div className={`${styles.title} container`} >

           <div className='d-flex justify-content-center align-items-center'>
           <img src={img} alt={title} />
             <span>{title}</span>
           </div>
            
             <div className={`${styles.divider} d-none d-sm-none d-md-block d-lg-block`}></div>
           </div>
}