import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface newsItem {
  id: string;
  title: string;
  watched: number;
  description: string;
  fulldescription: string;
  type: string;
  image: string;
  image2: string;
  date: string;
  likeCount: number;
  dislikeCount: number;
}

export interface NewsState {
  newsList: newsItem[];
}

const initialState: NewsState = {
  newsList: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsList: (state, action: PayloadAction<newsItem[]>) => {
      state.newsList = action.payload;
    },
    //like
    like: (
      state,
      action: PayloadAction<{ newsItemId: string; increment: boolean }>
    ) => {
      const { newsItemId, increment } = action.payload;
      const updatedNewsList = state.newsList.map((item) =>
        item.id === newsItemId
          ? { ...item, likeCount: item.likeCount + (increment ? -1 : 1) }
          : item
      );

      state.newsList = updatedNewsList;
    },
    //dislike
    dislike: (
      state,
      action: PayloadAction<{ newsItemId: string; decrement: boolean }>
    ) => {
      const { newsItemId, decrement } = action.payload;
      const updatedNewsList = state.newsList.map((item) =>
        item.id === newsItemId
          ? { ...item, dislikeCount: item.dislikeCount + (decrement ? 1 : -1) }
          : item
      );
      state.newsList = updatedNewsList;
    },
  },
});

export const { like, setNewsList, dislike } = newsSlice.actions;

export default newsSlice.reducer;
