import { useContext } from 'react';
import { GlobalContext } from '@/context/globalContext';

// Create a custom hook to use the GlobalContext
const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    // Handle undefined context (if the provider is not wrapping the component properly)
    if (!context) {
        throw new Error('GlobalContext must be used within a GlobalProvider');
    }

    return context; 
};

export default useGlobalContext;