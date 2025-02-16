import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../constants/firebase-config";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, serverTimestamp } from "@firebase/firestore";

// Initial state
const initialState = {
  status: "",
  categories: [],
  loading: true
};

// Category slice
const CategorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "idle";
        state.loading = false
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "error";
        state.loading = false
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      });
  },
});

// Thunks

// Fetch all categories
export const fetchCategories = createAsyncThunk("fetch/categories", async () => {
  const categoriesCollection = collection(db, "categories");
  const snapshot = await getDocs(categoriesCollection);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
  return data;
});

// Add a new category
export const addCategory = createAsyncThunk("add/category", async (category) => {
  const categoryRef = collection(db, "categories");
  try {
    const docRef = await addDoc(categoryRef, {
      ...category,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...category };
  } catch (error) {
    console.error("Error adding category: ", error);
    throw error;
  }
});

// Update a category
export const updateCategory = createAsyncThunk("update/category", async (category) => {
  const categoryRef = doc(db, "categories", category.id);
  try {
    await updateDoc(categoryRef, {
      title: category.title,
      images: category.images,
      slug: category.slug
    });
    return { ...category };
  } catch (error) {
    console.error("Error updating category: ", error);
    throw error;
  }
});

// Delete a category
export const deleteCategory = createAsyncThunk("delete/category", async (categoryId) => {
  const categoryRef = doc(db, "categories", categoryId);
  try {
    await deleteDoc(categoryRef);
    return categoryId;
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw error;
  }
});

export default CategorySlice.reducer;
