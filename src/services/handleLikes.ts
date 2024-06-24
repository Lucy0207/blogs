import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { PREFIX } from '../store/user.slice';
import { RootState } from '../store/store';





export const setLikes = createAsyncThunk<string, string, { state: RootState }>(
  "blogs/setLikes",
  async (slug, thunkAPI) => {
    try {
      const jwt = thunkAPI.getState().user.jwt;
      

      await axios.post(
        `${PREFIX}/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
   
      return slug;
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        console.error(`setLikes: Error response: ${e.response.data}`); // Логирование ошибки
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
      throw e;
    }
  }
);

export const deleteLikes = createAsyncThunk<string, string, { state: RootState }>(
  "blogs/deleteLikes",
  async (slug, thunkAPI) => {
    try {
        const jwt = thunkAPI.getState().user.jwt;
     await axios.delete(`${PREFIX}/articles/${slug}/favorite`,
          {
			headers: {
				Authorization: `Token ${jwt}`,
                "Content-Type": "application/json;charset=utf-8",
			}
		}
     );
     return slug;

    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
      throw e;
    }
  }
);