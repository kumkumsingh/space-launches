import { Dispatch, useEffect , SetStateAction} from "react";
import { LaunchActionTypes } from "@/enums/actionTypes";
import { LaunchAction } from "@/interfaces/providerInterface";
import { launchesUrl } from "@/config/basicConfig";
import axios from "axios";

const useFetchLaunches = (
  dispatch: Dispatch<LaunchAction>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const fetchLaunches = async () => {
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

    fetchLaunches();
  }, [dispatch, setIsLoading]);
};

export default useFetchLaunches;