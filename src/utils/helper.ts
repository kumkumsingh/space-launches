import { Launch } from "interfaces/providerInterface";
import moment from "moment";

// Convert launch date to a readable format (year)
export const convertDateToReadable = ({ date_utc }: Launch) => moment(date_utc).utc().year();

// Retrieve favorites from local storage and parse safely
export const getFavoritesFromLocalStorage = ():string[] => {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        return Array.isArray(favorites) 
            ? favorites
            : [];
    } catch (error) {
        console.error('Error getting favourites', error);
        return [];
    }
};