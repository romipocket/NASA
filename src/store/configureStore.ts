import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/reducer";
import nasaAPI from "./middleware/nasaAPI";
import tleAPI from "./middleware/tleAPI";

export default function store() {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), nasaAPI, tleAPI],
    });
}