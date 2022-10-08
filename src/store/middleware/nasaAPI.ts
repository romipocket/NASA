import axios from "axios";
import * as actions from "../api";

const nasaApiUrl: string = import.meta.env.VITE_NASA_API_URL;
        
const nasaAPI =
    ({ dispatch }: any) =>
    (next: any) =>
    async (action:any) => {
        
        if (action.type !== actions.apiCallBegan.type) return next(action);

        const { url, method, data, onStart, onSuccess, onError } =
            action.payload;

        if (onStart) dispatch({ type: onStart });

        next(action);

        try {
            const response = await axios.request({
                baseURL: nasaApiUrl,
                url,
                method,
                data,
            });
            //General
            dispatch(actions.apiCallSuccess());
            //Specific
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data.photos });
        } catch (error:any) {
            //General
            dispatch(actions.apiCallFailed());
            //Specific
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };

export default nasaAPI;