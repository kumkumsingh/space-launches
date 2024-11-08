import { ReactNode } from "react";

// Interface for Launch data structure
export interface Launch {
    links: { patch: { small: string } };
    date_utc: string;
    name: string;
    id: string;
    status: boolean;
}

export interface LaunchState {
    launches: Launch[];
    filteredLaunches: Launch[];
    error: string | null;
}

export interface FavoritesState {
    favorites: string[];
}

export interface GlobalContextType {
    state: {
        launches: LaunchState;
        favorites: FavoritesState;
    };
    dispatch: React.Dispatch<LaunchAction>;
}

export interface GlobalProviderProps {
    children: ReactNode; 
}

// Action types
export type LaunchAction =
    | { type: 'SET_LAUNCHES_REQUEST' }
    | { type: 'SET_LAUNCHES_SUCCESS'; payload: Launch[] }
    | { type: 'SET_LAUNCHES_FAILURE'; payload: string }
    | { type: 'FILTER_LAUNCHES'; payload: number }
    | { type: 'SEARCH_LAUNCHES'; payload: string }
    | { type: 'RESET_SEARCH' }
    | { type: 'ADD_FAVORITE'; payload: string }
    | { type: 'REMOVE_FAVORITE'; payload: string };
