import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: "apiReducer",
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {
        apiRequested: (posts, action) => {
            posts.loading = true;
        },

        apiReceived: (posts, action) => {
            posts.list = action.payload;
            posts.loading = false;
        },

        apiRequestFailed: (posts, action) => {
            posts.loading = false;
        },
    },
});

export default slice.reducer;

const { apiRequested, apiReceived, apiRequestFailed } = slice.actions;

export const loadNasa = (rover:string, camera:string, date:string) => (dispatch:any) => {
    const nasaApiKey: string = import.meta.env.VITE_NASA_API_KEY;
    if(camera==="ALL"){
        camera=""
    }else{
        camera="&camera="+camera
    }
    const url = "/mars-photos/api/v1/rovers/"+rover+"/photos?earth_date="+date+""+camera+"&api_key="+nasaApiKey;
    return dispatch(
        // @ts-ignore
        apiCallBegan({ url, onStart: apiRequested.type, onSuccess: apiReceived.type, onError: apiRequestFailed.type })
    );
};

export const loadTle = () => (dispatch:any) => {
    const url = "/tle";
    return dispatch(
        // @ts-ignore
        apiCallBegan({ url, onStart: apiRequested.type, onSuccess: apiReceived.type, onError: apiRequestFailed.type })
    );
};