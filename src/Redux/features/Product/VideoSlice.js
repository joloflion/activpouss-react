import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constants/Status";
import { db } from "../../../constants/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";

const initialState = {
  status: "",
  videos: [],
  videosByCategory:[]
  
};

// Fetch videos by category
export const fetchProductVideoByCategory = createAsyncThunk(
  "fetch/videosByCategory",
  async (category) => {
   
    try {
      const videosCollection = collection(db, "videos");
      const q = query(
        videosCollection,
        where("categories", "array-contains", category),
        orderBy("title")
      );
      const snapshot = await getDocs(q);
      let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (error) {
      console.log("*",error);
      throw error;
    }
  }
);

//fetching product using build in thunk on toolkit

export const fetchVideos = createAsyncThunk("fetch/videos", async () => {
  // const data = await axios.get(`${base_url}products`).then((res) => res.data);
   const videosCollection = collection(db, 'videos');
   const snapshot = await getDocs(videosCollection);
   const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   console.log(data)
   return data;
 });
// Add a new video
export const addVideo = createAsyncThunk("add/video", async (video) => {
  try {
    const videosCollection = collection(db, "videos");
    const docRef = await addDoc(videosCollection, video);
    return { id: docRef.id, ...video };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Update an existing video
export const updateVideo = createAsyncThunk("update/video", async (video) => {
  try {
    const videoRef = doc(db, "videos", video.id);
    await updateDoc(videoRef, video);
    return video;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// Delete a video
export const deleteVideo = createAsyncThunk("delete/video", async (id) => {
  try {
    const videoRef = doc(db, "videos", id);
    await deleteDoc(videoRef);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // fetch all videos
    .addCase(fetchVideos.pending, (state) => {
      state.status = STATUS.LOADING;
    })
    .addCase(fetchVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
      state.status = STATUS.IDLE;
    })
    .addCase(fetchVideos.rejected, (state) => {
      state.status = STATUS.ERROR;
    })
      // Fetch videos by category
      .addCase(fetchProductVideoByCategory.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProductVideoByCategory.fulfilled, (state, action) => {
        state.videosByCategory = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProductVideoByCategory.rejected, (state) => {
        state.status = STATUS.ERROR;
      })

      // Add a new video
      .addCase(addVideo.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
      })
      .addCase(addVideo.rejected, (state) => {
        state.status = STATUS.ERROR;
      })

      // Update an existing video
      .addCase(updateVideo.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        const index = state.videos.findIndex(
          (video) => video.id === action.payload.id
        );
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
        state.status = STATUS.IDLE;
      })
      .addCase(updateVideo.rejected, (state) => {
        state.status = STATUS.ERROR;
      })

      // Delete a video
      .addCase(deleteVideo.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videos = state.videos.filter(
          (video) => video.id !== action.payload
        );
        state.status = STATUS.IDLE;
      })
      .addCase(deleteVideo.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export default videosSlice.reducer;