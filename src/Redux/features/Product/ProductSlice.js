import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import {collection, addDoc, query, where, doc, getDocs, getDoc, orderBy, serverTimestamp} from "@firebase/firestore";

const base_url = "https://fakestoreapi.com/";

const initialState = {
  status: "",
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(addProduct.fulfilled, (state,action) => {
        state.status = STATUS.IDLE
      }).addCase(addProduct.pending, (state,action) => {
        state.status = STATUS.LOADING
      });
  },
});

//fetching product using build in thunk on toolkit

export const fetchProducts = createAsyncThunk("fetch/prodcuts", async () => {
 // const data = await axios.get(`${base_url}products`).then((res) => res.data);
  const productsCollection = collection(db, 'products');
  const snapshot = await getDocs(productsCollection);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
});

export const fetchProductsVedette = createAsyncThunk("fetch/prodcuts", async () => {
  const productsCollection = collection(db, 'products');

  const snapshot = await getDocs(productsCollection);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
});


export const fetchProductBycategory = createAsyncThunk("fetch/prodcuts", async (category) => {
  try{
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where("category","array-contains" ,category))
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






export const addProduct = createAsyncThunk("create/product", async (product) => {
  const productRef = collection(db, 'products');
    try {
      addDoc(productRef, product);
      return 1;
    } catch (error) {
      console.log(error);
    }
})


export default productSlice.reducer;
