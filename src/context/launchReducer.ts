import { LaunchActionTypes } from "@/enums/actionTypes";
import { LaunchAction, LaunchState } from "@/interfaces/providerInterface";
import { convertDateToReadable } from "@/utils/helper";

// Initial state definition
const launchInitialState : LaunchState = {
    launches: [],
    filteredLaunches: [],
    error: '',
}; 

// Reducer takes currnt state and action and returns a new state 
const launchReducer = (state : LaunchState, action: LaunchAction): LaunchState => {
    switch (action.type) {
        case LaunchActionTypes.SET_LAUNCHES_REQUEST:
            return {
                ...state,
                error: '',
            };

        case LaunchActionTypes.SET_LAUNCHES_SUCCESS:
            return {
                ...state,
                launches: action.payload,
                filteredLaunches: action.payload,
            }; 

        case LaunchActionTypes.SET_LAUNCHES_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        case LaunchActionTypes.FILTER_LAUNCHES:
            return {
                ...state,
                filteredLaunches: state.filteredLaunches.filter(launch =>(convertDateToReadable(launch) === action.payload)),
            };
        case LaunchActionTypes.SEARCH_LAUNCHES:
            return {
                ...state,
                filteredLaunches: state.filteredLaunches.filter((launch) =>{
                    return launch.name.toLowerCase().includes(action.payload.toLowerCase())
                }
                )
            };
        case LaunchActionTypes.RESET_SEARCH:
            return {
                ...state,
                filteredLaunches: state.launches,
            };

        default:
            return state;
    }
};

export { launchReducer, launchInitialState };
