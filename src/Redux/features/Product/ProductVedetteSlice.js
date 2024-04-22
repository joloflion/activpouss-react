import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import { collection, query, where, getDocs, orderBy} from "@firebase/firestore";

const initialState = {
    status: "",
    productVedettes: []
}

const productVedettesSlice = createSlice({
    name: "productVedettes",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductVedette.fulfilled , (state, action) => {
            state.status = STATUS.IDLE;
            state.productVedettes = action.payload;
        })
    }
})


export const fetchProductVedette = createAsyncThunk("fetch/prodcuts/vdettes", async () => {
  try{
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where("type","==" ,"vedette"), orderBy('type'));
    const snapshot = await getDocs(q);
    snapshot.docs.map(doc => console.log(doc.data()))
    let data = [];
     snapshot.docs.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error){
    console.log(error);
    throw error;
  }
  
});


  export default productVedettesSlice.reducer;