import axios from "axios";
import * as actions from "../api";

const tleApiUrl: string = import.meta.env.VITE_TLE_API_URL;


const tleAPI =
    ({ dispatch }: any) =>
    (next: any) =>
    async (action:any) => {
        
        if (action.type !== actions.apiCallBegan.type) return next(action);

        const { url, method, data, onStart, onSuccess, onError } =
            action.payload;

        if (onStart) dispatch({ type: onStart });

        next(action);

        console.log(url);

        try {
            const response = await axios.request({
                baseURL: tleApiUrl,
                url,
                method,
                data,
            });
            //General
            dispatch(actions.apiCallSuccess());
            //Specific
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data.member });
        } catch (error:any) {
            //General
            dispatch(actions.apiCallFailed());
            //Specific
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };

export default tleAPI;