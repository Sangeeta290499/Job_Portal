import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false
    },
    reducers:{
        // This defines the actions and corresponding state changes for this slice.
        setLoading:(state, action) =>{ //The setLoading action takes the payload (either true or false) and updates the loading state
            state.loading = action.payload;
        },
        setUser:(state, action) =>{ 
            state.user = action.payload;
        }
    }
});
export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;


//Define an Action: First, you define an action that describes the state change you want to make.
// Dispatch the Action: You use the dispatch() function to send the action to Redux.
// Reducers Update State: When the action is dispatched, the Redux store sends the action to the appropriate reducer. The reducer checks the action type and updates the state accordingly.