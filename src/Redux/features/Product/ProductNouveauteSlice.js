import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import { collection, query, where, getDocs, limit, orderBy} from "@firebase/firestore";

const initialState = {
    status: "",
    productNouveaute: []
}

const productNouveauteSlice = createSlice({
    name: "productNouveaute",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductNouveaute.fulfilled , (state, action) => {
            state.status = STATUS.IDLE;
            state.productNouveaute = action.payload;
        })
    }
})


export const fetchProductNouveaute = createAsyncThunk("fetch/prodcuts/nouveaute", async (category = "new") => {
  try{
    const productsCollection = collection(db, 'products');
    const q = query(
      productsCollection, 
     // where("type","array-contains", "new"), 
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


  export default productNouveauteSlice.reducer;