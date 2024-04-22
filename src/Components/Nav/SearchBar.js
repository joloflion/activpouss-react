import { useState } from "react"
import Autocomplete from "react-autocomplete";
import style from './naav.module.scss';

export const SearchBar = () =>{
 
   const [value, setValue] = useState();

    return <div className={`${style.searchBar} d-flex justify-content-center align-items-center px-3`}  > 
    <i class="fa fa-search" aria-hidden="true"></i>
    <Autocomplete
    getItemValue={(item) => item.label}
    items={[
      { label: 'apple' },
      { label: 'banana' },
      { label: 'pear' }
    ]}

    renderInput={(props) => <input placeholder="Rechercher un produit ..." className={style.searchInput} {...props} />}
    
    renderItem={(item, isHighlighted) =>
      <div style={{ background: isHighlighted ? 'lightgray' : 'white', zIndex: 200 }}>
        {item.label}
      </div>
    }
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onSelect={(val) => setValue(val)}
  /> 

  <i className={`fa fa-close ${style.clearSearch}`} aria-hidden="true"></i>
  </div>
}