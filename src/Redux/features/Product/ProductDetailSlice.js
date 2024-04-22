import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import {doc, getDoc} from "@firebase/firestore";

const initialState = {
    status: "",
    productDetail: null
}

const productDetailSlice = createSlice({
    name: "productDetail",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProductById.fulfilled , (state, action) => {
            state.status = STATUS.IDLE;
            state.productDetail = action.payload;
        })
    }
})


export const fetchProductById = createAsyncThunk("fetch/productById", async (id) => {
    try {
      const productRef = doc(db, "products", id); // Reference to the document by ID
      const snapshot = await getDoc(productRef);
      console.log(snapshot.data())
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
      } else {
        console.log("No such document!");
        return null; // or you can return an empty object or whatever fits your use case
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error;
    }
  });

  export default productDetailSlice.reducer;