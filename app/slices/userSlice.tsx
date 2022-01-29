import {PayloadAction, createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {navigationSlice} from "./navigationSlice";
import {PURGE} from "redux-persist";


type userType = {
    status: boolean;
    authenticated: boolean;
    responseState: boolean,
    responseMessage: string,
    responseType: string,
    ride: {
        type: string,
        onARide: boolean,
        rider: {
            firstName: string,
            lastName: string,
            accepted: boolean,
            cost: string,
            pickup: string,
            userContact: string,
            destination:string,
            uid: string
        }
    }
    userData: {
        createdAt: number | null,
        email: string,
        emailVerified: boolean,
        firstName: string,
        lastName: '',
        phone: null | number,
        photoURL: null,
        uid: string

    };
};

const initialState: userType = {
    status: false,
    authenticated: false,
    responseState: false,
    responseMessage: '',
    responseType: '',
    ride: {
        type: '',
        onARide: false,
        rider: {
            firstName: '',
            lastName: '',
            accepted: false,
            cost: '',
            pickup: '',
            userContact: '',
            destination:'',
            uid: ''
        }
    },
    userData: {
        createdAt: null,
        email: '',
        emailVerified: false,
        firstName: 'string',
        lastName: '',
        phone: null,
        photoURL: null,
        uid: '',
    },
};

export const signUpUSer = createAsyncThunk(
    'user/signUp',
    async (user: {}) => {
        // const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return user;
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (user: {}) => {
        // const response = await fetchCount(amount);
        // The value we return becomes the `fulfilled` action payload
        return user;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userType['userData']>) => {
            state.userData = action.payload
        },
        setUserImage: (state, action) => {
            state.userData.photoURL = action.payload
        },
        updateInfo: (state, action) => {
            state.userData.phone = action.payload.phone
            state.userData.firstName = action.payload.firstName
            state.userData.lastName = action.payload.lastName
        },
        setAuthenticated: (state, action: PayloadAction<userType['authenticated']>) => {
            state.authenticated = action.payload
        },
        setResponse: (state, action) => {
            state.responseState = action.payload.responseState
            state.responseType = action.payload.responseType
            state.responseMessage = action.payload.responseMessage
        },
        setRider: (state, action: PayloadAction<userType['ride']>) => {
            state.ride = action.payload
        },
        useSetResponse: (state) => {
            state.responseState = false
            state.responseType = ''
            state.responseMessage = ''
        },

        logoutUser: () => initialState
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.status = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.status = false;
            state.userData = action.payload;
        })
        builder.addCase(signUpUSer.pending, (state) => {
            state.status = true;
        })
            .addCase(signUpUSer.fulfilled, (state, action) => {
                state.status = false;
                state.userData = action.payload;
            });

    }

})


export const {
    setAuthenticated,
    useSetResponse,
    setResponse,
    updateInfo,
    setUser,
    setUserImage,
    logoutUser,
    setRider
} = userSlice.actions
export default userSlice.reducer;
