import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'
import localStorageKey from '../../constants/localStorageKey'

const initialState = {
    current: {
        accessToken: localStorage.getItem(localStorageKey.ACCESS_TOKEN) || {},
        refreshToken: localStorage.getItem(localStorageKey.REFRESH_TOKEN) || {},
        user: JSON.parse(localStorage.getItem(localStorageKey.USER)) || {},
    },
    settings: {
        isLogin: false
    },
}

export const registerUser = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
    try {
        const response = await userApi.register(payload)
        return response

    } catch (error) {
        // if (!error.response) throw error;
        return rejectWithValue(error.response.data);
    }
})

export const loginUser = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await userApi.login(payload)

        if (!!response?.user) {
            localStorage.setItem(localStorageKey.USER, JSON.stringify(response.user))
            localStorage.setItem(localStorageKey.ACCESS_TOKEN, response.accessToken)
            localStorage.setItem(localStorageKey.REFRESH_TOKEN, response.refreshToken)
        }
        // console.log("userSlice: ", response)

        return response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const authTokenLogin = createAsyncThunk('user/token', async (payload, { rejectWithValue }) => {
    try {
        const response = await userApi.authTokenLogin(payload)

        localStorage.setItem(localStorageKey.USER, JSON.stringify(response.user))
        console.log("UserSlice", response)
        return response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state, action) {
            localStorage.removeItem(localStorageKey.USER)
            localStorage.removeItem(localStorageKey.ACCESS_TOKEN)
            localStorage.removeItem(localStorageKey.REFRESH_TOKEN)
            state.current = {}
            state.settings.isLogin = false
        },

        reloadUser(state, action) {
            console.log({ state, action })
        }

    },
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            // state.current = action.payload
            console.log(action)
        },

        [loginUser.fulfilled]: (state, action) => {
            state.current = action.payload
            state.settings.isLogin = true
            // console.log(action)
        },
        [authTokenLogin.fulfilled]: (state, action) => {
            state.current.user = action.payload.user
            state.settings.isLogin = true
            // console.log(action)
        },
    }
})

const { actions, reducer } = userSlice
export const { reloadUser, logoutUser } = actions
export default reducer