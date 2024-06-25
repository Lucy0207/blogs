import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { PREFIX } from "../store/user.slice";
import { RootState } from "../store/store";

export const deletePosts = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("blogs/deletePosts", async (slug, thunkAPI) => {
  try {
    const jwt = thunkAPI.getState().user.jwt;
    await axios.delete(`${PREFIX}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${jwt}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    return slug;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
    throw e;
  }
});
