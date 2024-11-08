import {
    createContext,
    useReducer,
    useState,
    Dispatch,
    SetStateAction,
    useEffect
  } from "react";
  
  import { launchReducer, launchInitialState } from "./launchReducer";
  import { favoritesReducer, initialFavoritesState } from "./favouritesReducer";
  import {
    FavoritesState,
    GlobalContextType,
    GlobalProviderProps,
    LaunchAction,
    LaunchState,
  } from "../interfaces/providerInterface";
import { fetchLaunches } from "@/services/fetchLaunches";
  
  interface ExtendedGlobalContextType extends GlobalContextType {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }
  
  const GlobalContext = createContext<ExtendedGlobalContextType | undefined>(
    undefined,
  );
  
  const initialState: { launches: LaunchState; favorites: FavoritesState } = {
    launches: launchInitialState,
    favorites: initialFavoritesState,
  };
  
  const rootReducer = (
    state: { launches: LaunchState; favorites: FavoritesState },
    action: LaunchAction,
  ) => {
    return {
      launches: launchReducer(state.launches, action),
      favorites: favoritesReducer(state.favorites, action),
    };
  };
  
  const GlobalProvider = ({ children}: GlobalProviderProps ) => {
    /*useReducer takes reducer as an input and initial state and returns state 
    and dispatch which can be destructured using array.*/

    const [state, dispatch] = useReducer(rootReducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetchLaunches(dispatch, setIsLoading);
    }, []);
      
    const contextValue = {
      state,
      dispatch,
      isLoading,
      setIsLoading,
    }

    return (
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
    );
  };
  
  export { GlobalProvider, GlobalContext };
