import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import {collection, addDoc, query, where, doc, getDocs, getDoc, orderBy, serverTimestamp, deleteDoc, updateDoc} from "@firebase/firestore";


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
      }).addCase(updateProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = STATUS.LOADING;
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
  console.log(product);
  
  const productRef = collection(db, 'products');
    try {
      addDoc(productRef, product);
      return 1;
    } catch (error) {
      console.log(error);
    }
})

export const deleteProduct = createAsyncThunk("delete/product", async (productId) => {
  const productRef = doc(db, 'products', productId);
  try {
    await deleteDoc(productRef);
    return productId;  // Return the deleted product's ID to remove it from the state
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateProduct = createAsyncThunk(
  "update/product",
  async (product) => {
    const productRef = doc(db, 'products', product.id); // Reference to the specific product document

    try {
      // Update the product document in Firestore with the new data
      await updateDoc(productRef, {
        title: product.title,
        description: product.description,
        price: product.price,
        images: product.images.map(image => image.url || image), // Handle both objects with `url` and plain URLs
        category: product.category,
        wall: product.wall
      });

      return { ...product };
       // Return the updated product with its ID
    } catch (error) {
      console.log('Error updating product:', error);
      throw error; // Throw error to be handled by the thunk
    }
  }
);




export default productSlice.reducer;
