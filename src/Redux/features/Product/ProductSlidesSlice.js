import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import {collection, getDocs} from "@firebase/firestore";


const initialState = {
  status: "",
  productSlides: [],
};

const productSlidesSlice = createSlice({
  name: "productSlides",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsSlides.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProductsSlides.fulfilled, (state, action) => {
        state.productSlides = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProductsSlides.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
     
  },
});

//fetching product using build in thunk on toolkit

export const fetchProductsSlides = createAsyncThunk("fetch/prodcuts/slides", async () => {
 // const data = await axios.get(`${base_url}products`).then((res) => res.data);
  const productsCollection = collection(db, 'slides');
  const snapshot = await getDocs(productsCollection);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(data)
  return data;
});




export default productSlidesSlice.reducer;
