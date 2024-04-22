import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import { collection, query, where, getDocs, orderBy } from "@firebase/firestore";

const base_url = "https://fakestoreapi.com/";

const initialState = {
  status: "",
  videos: []
};

// Define fetchProductVideoByCategory before using it in extraReducers
export const fetchProductVideoByCategory = createAsyncThunk("fetch/videos", async (category) => {
  console.log(category)
  try {
    const productsCollection = collection(db, 'videos');
    const q = query(productsCollection, where("category","==" ,category), orderBy('title'))
    const snapshot = await getDocs(q);
    let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const videosSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductVideoByCategory.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProductVideoByCategory.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProductVideoByCategory.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

export default videosSlice.reducer;
