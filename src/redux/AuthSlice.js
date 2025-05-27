import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../supabase/supabasse";
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const checkSession = createAsyncThunk(
    "auth/checkSession",
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.getSession();
            console.log("My Data",da)
            if (error) {
                throw error;
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const loginEP = createAsyncThunk(
    "auth/loginEP",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                throw error;
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                // throw error;
                console.log('error logout',error)
                rejectWithValue(error.message)
            }
            return true;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const signupEP = createAsyncThunk(
    "auth/signupEP",
    async ({ email, password }, { rejectWithValue }) => {
        console.log("working",email,password)
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
        console.log("working still",email,password)

            if (error) {
                throw error;
            }
            return data;
        } catch (err) {
            console.log('Code in error section')
            return rejectWithValue(err.message);
        }
    }
);
// signup with google is available inside utils/auth

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser:(state,action)=>{
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
        state.loading = false
    },
    clearState: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
    },
    setError:(state,action)=>{
        state.error = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder
        .addCase(loginEP.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginEP.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(loginEP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(checkSession.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(checkSession.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload
            state.error = null
            state.isAuthenticated = true
        })
        .addCase(checkSession.rejected,(state,action)=>{
            state.isAuthenticated = false
            state.loading = false
            state.error = action.payload
            state.user = null
        })
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(signupEP.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signupEP.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })
        .addCase(signupEP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
  }
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const {setUser,clearState,setError} = authSlice.actions
export default authSlice.reducer;