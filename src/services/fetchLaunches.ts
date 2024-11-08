import { Dispatch, SetStateAction } from "react";
import axios from "axios";

import { launchesUrl } from "@/config/basicConfig";
import { LaunchActionTypes } from "@/enums/actionTypes";
import { LaunchAction } from "@/interfaces/providerInterface";

export const fetchLaunches = async (dispatch: Dispatch<LaunchAction>,
    setIsLoading: Dispatch<SetStateAction<boolean>>) => {
    setIsLoading(true);
    dispatch({ type: LaunchActionTypes.SET_LAUNCHES_REQUEST });
    try {
      const response = await axios.get(launchesUrl);
      dispatch({
        type: LaunchActionTypes.SET_LAUNCHES_SUCCESS,
        payload: response.data,
      });
    } catch {
      dispatch({
        type: LaunchActionTypes.SET_LAUNCHES_FAILURE,
        payload: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
};