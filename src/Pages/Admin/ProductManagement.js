import { useDispatch } from "react-redux";
import { addProduct } from "../../Redux/features/Product/ProductSlice";
import AddProductForm from "../../Components/AddProductForm/AddProductForm";

const ProductManagement  = () => {


    return <div className="container mb-5">
               <div className="row">
                   <div className="col-5">
                    <AddProductForm />
                   </div>
                   <div className="col-5">
                    <h2>Liste des produits</h2>
                   </div>
               </div>
          </div>
}


export default ProductManagement;