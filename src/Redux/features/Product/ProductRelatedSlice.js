import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import { collection, query, where, getDocs, orderBy, limit} from "@firebase/firestore";

const initialState = {
    status: "",
    productRelated: []
}

const productRelatedSlice = createSlice({
    name: "productCategory",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductRelated.fulfilled , (state, action) => {
            state.status = STATUS.IDLE;
            state.productRelated = action.payload;
        })
    }
})


export const fetchProductRelated = createAsyncThunk("fetch/prodcuts/related", async (category = "all") => {
  try{
    const productsCollection = collection(db, 'products');
    const q = query(
      productsCollection, 
      where('category', 'array-contains', category), 
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


  export default productRelatedSlice.reducer;