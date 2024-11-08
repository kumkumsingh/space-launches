import { useCallback, useEffect, useState } from 'react';
import { Input} from 'antd';

import useDebounce from '@/hooks/useDebounce';
import { LaunchActionTypes } from '@/enums/actionTypes';
import useGlobalContext from '@/hooks/useGlobalContext';

const { Search } = Input;

const GeneralSearch = () =>{
    const {dispatch } = useGlobalContext();
    const [searchValue, setSearchValue] = useState<string>('');

    // // Debounce the search value
    const debouncedSearchValue = useDebounce(searchValue, 300);

    // // Memoized dispatch actions
    const handleSearch = useCallback(() => {
        const actionType = debouncedSearchValue ? LaunchActionTypes.SEARCH_LAUNCHES : LaunchActionTypes.RESET_SEARCH;
        dispatch({ type: actionType, payload: debouncedSearchValue });
    }, [debouncedSearchValue, dispatch]);
     
    useEffect(() => {
        if (debouncedSearchValue !== null) {
            handleSearch();
        }
    }, [debouncedSearchValue, handleSearch]);
    
    const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }, []);
    
    return (
        <Search
        placeholder="Search by mission name"
        value={searchValue}
        onChange={handleSearchInputChange}
        className="search-input" 
        allowClear
    /> 
    )
}

export default GeneralSearch