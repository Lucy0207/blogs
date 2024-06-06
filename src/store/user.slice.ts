import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';
import { LoginResponse } from "../interfaces/Auth.interface";
import { loadState } from "./storage";
import { Profile } from "../interfaces/User.interface";
import { RootState } from "./store";




export const PREFIX = "https://blog.kata.academy/api";
export const JWT_PERSISTENT_STATE ='userData';

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
      jwt: string | null,
  loginErrorMessage?: string,
  profile?: Profile,
  signupErrorMessage?: string
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
     
}


export const signup = createAsyncThunk('user/signup', 
	async (params: {email: string, password: string, username: string}) => {
        
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/users`, {
                user: {
                email: params.email,
				password: params.password,
				username: params.username
            }
			
			},
        {
  headers: {
    'Content-Type': 'application/json'
  }}
);      console.log(data)
            return data;
		}
		catch(e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	
	}
);

export const login = createAsyncThunk('user/login', 
	async (params: {email: string, password: string}) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/users/login`, {
                user: {
                email: params.email,
				password: params.password
                }
				
			});
			return data;
		}
		catch(e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	
	}
);

export const getProfile = createAsyncThunk<Profile, void, {state: RootState}>('user/getProfile', 
	async (_, thunkAPI) => {
		const jwt = thunkAPI.getState().user.jwt;
		const {data} = await axios.get<Profile>(`${PREFIX}/user`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
	}
);



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null
        },
        clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearSignupError: (state) => {
			state.signupErrorMessage = undefined;
		} 
    },
    extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;

		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			if (!action.payload) {
                console.error('Signup fulfilled with no payload');
				return;
			}
			state.jwt = action.payload.token;
            
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.signupErrorMessage = action.error.message;

		});
	}
})

export default userSlice.reducer;
export const userActions = userSlice.actions