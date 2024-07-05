import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const tk = localStorage.getItem('token');
const initialState = {
  msg: "",
  user: "",
  token: tk | null,
  isLoading: false,
  error: ""
};
const baseUrl = process.env.REACT_APP_BASE_URL;
export const signUpUser = createAsyncThunk('signupUser', async (body, thunkAPI) => {
  console.log("signing in : ",baseUrl);
    try {
      const res = await fetch(`${baseUrl}/api/user/signup`, {
        method: "post",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
      });
  
      if (!res.ok) {
        // If the response is not in the 200-299 range, throw an error
        throw new Error(`HTTP error ${res.status}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      const message = error.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const loginUser = createAsyncThunk('loginUser', async (body, thunkAPI) => {
    // const dispatch = useDispatch();

    console.log("logging in : ",baseUrl);
    try {
      const res = await fetch(`${baseUrl}/api/user/login`, {
        method: "post",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(body)
      });
      
      if (!res.ok) {
        // If the response is not in the 200-299 range, throw an error
        throw new Error(`HTTP error ${res.status}`);
      }
  
      const data = await res.json();
      // dispatch(addToken(data.token));
      console.log(data);
      return data;
    } catch (error) {
      // Handle any errors that occurred during the fetch request
      const message = error.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(message);
    }
  });

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
        addToken : (state,action)=>{
          state.token = action.payload;
        },
        addUser : (state,action)=>{
          state.user = localStorage.getItem("user");
        },
        addCred : async (state,action)=>{
          const response = loginUser(action.payload);
          const data =  await response.json();
          console.log(data.token);
          state.token = data.token;
        },
        logout : (state,action)=>{
          state.token = null;
          localStorage.clear();
        },

  },
  extraReducers: (builder) => {
    builder
      // ************* signup ***********************
      .addCase(signUpUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        let responseData = action.payload;
        console.log(responseData);
        state.isLoading = false;
        if(responseData.error){
          state.error = responseData.error;
        }

        else{
          // console.log("msg : ",responseData.msg);
          // console.log("token : ",responseData.token);
          // console.log("user : ",responseData.email);
          
          state.msg = responseData.msg;
          state.token = responseData.token;
          state.user = responseData.user;

          localStorage.setItem('token',state.token);
          // localStorage.setItem('user',JSON.stringify(state.user));
          // localStorage.setItem('token',state.token);
          
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        // Handle rejection if needed
      })


      // ************* login ***********************
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        let responseData = action.payload;
        console.log(responseData);
        state.isLoading = false;
        if(responseData.error){
          state.error = responseData.error;
        }

        else{
          console.log("msg : ",responseData.msg);
          console.log("token : ",responseData.token);
          console.log("user : ",responseData.email);
          
          state.msg = responseData.msg;
          state.token = responseData.token;
          state.user = responseData.user;

          localStorage.setItem('token',state.token);
          // localStorage.setItem('user',JSON.stringify(state.user));
          // localStorage.setItem('token',state.token);
          
        }
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        // Handle rejection if needed
      });
  },
});

export const {addToken,addUser,addCred,logout} = authSlice.actions;
export default authSlice.reducer;