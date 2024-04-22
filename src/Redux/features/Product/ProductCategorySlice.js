import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import { collection, query, where, getDocs, orderBy, limit} from "@firebase/firestore";

const initialState = {
    status: "",
    productCategory: []
}

const productCategorySlice = createSlice({
    name: "productCategory",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductCategory.fulfilled , (state, action) => {
            state.status = STATUS.IDLE;
            state.productCategory = action.payload;
        })
    }
})


export const fetchProductCategory = createAsyncThunk("fetch/prodcuts/category", async (category = "all") => {
  try{
    const productsCollection = collection(db, 'products');
    const q = query(
      productsCollection, 
      //where("type","array-contains", "category"), 
      where('category', 'array-contains', category), 
     // orderBy('type'),
      limit(8));
    const snapshot = await getDocs(q);
    snapshot.docs.map(doc => console.log(doc.data()))
    let data = [];
    snapshot.docs.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
    console.log(data)
    return data;
  } catch (error){
    console.log(error);
    throw error;
  }
  
});


  export default productCategorySlice.reducer;