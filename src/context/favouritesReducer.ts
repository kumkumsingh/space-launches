import { LaunchActionTypes } from "@/enums/actionTypes";
import { FavoritesState, LaunchAction } from "@/interfaces/providerInterface";
import { getFavoritesFromLocalStorage } from "@/utils/helper";


// Initial state for favorites
const initialFavoritesState:FavoritesState = {
    favorites: getFavoritesFromLocalStorage(),
};

// Reducer takes currnt state and action and returns a new state 
const favoritesReducer = (state:FavoritesState, action: LaunchAction) => {
    switch (action.type) {
        case LaunchActionTypes.ADD_FAVORITE:
            { const isAlreadyFavorite = state.favorites.includes(action.payload);;
            if (!isAlreadyFavorite) {
                const newFavorites = [...state.favorites, action.payload];
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
                return { ...state, favorites: newFavorites };
            }
            return state; }

        case LaunchActionTypes.REMOVE_FAVORITE:
            { const updatedFavorites = state.favorites.filter(fav => fav !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return { ...state, favorites: updatedFavorites }; }
        default:
            return state;
    }
};

export { favoritesReducer, initialFavoritesState };
