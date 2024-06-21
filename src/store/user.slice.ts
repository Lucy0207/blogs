import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';

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
    user: string,
	image: string,
  loginErrorMessage?: string,
  profile?: Profile,
  signupErrorMessage?: string
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
    user: "",
	image: "",
	signupErrorMessage: '',
	loginErrorMessage: ''
     
}



export const signup = createAsyncThunk('user/signup', 
	async (params: {email: string, password: string, username: string}) => {
        
		try {
			const {data} = await axios.post(`${PREFIX}/users`, {
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
       
            return data.user;
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
			const {data} = await axios.post(`${PREFIX}/users/login`, {
                user: {
                email: params.email,
				password: params.password
                }
				
			},
         {
  headers: {
    'Content-Type': 'application/json'
  }}
);


			return data.user;
		}
		catch(e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	
	}
);

export const editProfile = createAsyncThunk<Profile['user'], Partial<Profile['user']>, { state: RootState }>('user/editProfile', 
	async (params, thunkAPI) => {
		const jwt = thunkAPI.getState().user.jwt;
		const {data} = await axios.put<Profile>(`${PREFIX}/user`, {
			user: {
				email: params.email,
				username: params.username,
				image: params.image,
				password: params.password
			}
		},
		
		{
			headers: {
				Authorization: `Token ${jwt}`
			}
		});
		return data.user;
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
            state.user = action.payload.username;
			localStorage.setItem("user", action.payload.username)
		});
		builder.addCase(login.rejected, (state) => {
			// state.loginErrorMessage = action.error.message;
		state.loginErrorMessage = "Either password or username is incorrect"


		});
		builder.addCase(editProfile.fulfilled, (state, action) => {
			state.user = action.payload.username;
			state.image = action.payload.image;
			localStorage.setItem("user", action.payload.username);
			localStorage.setItem("avatar", action.payload.image)
		});
		builder.addCase(signup.fulfilled, (state, action) => {
			if (!action.payload) {
                console.error('Signup fulfilled with no payload');
				return;
			}
			state.jwt = action.payload.token;
            state.user = action.payload.username
            localStorage.setItem("user", action.payload.username)
		});
		builder.addCase(signup.rejected, (state) => {
			state.signupErrorMessage = "Either email or username is already in use"

		});
	}
})

export default userSlice.reducer;
export const userActions = userSlice.actions