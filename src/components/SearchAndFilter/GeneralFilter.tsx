import { useCallback, useMemo } from "react";
import { Dropdown, MenuProps } from "antd";
import { FilterOutlined } from '@ant-design/icons';

import { LaunchActionTypes } from "@/enums/actionTypes";
import useGlobalContext from "@/hooks/useGlobalContext";
import { Launch } from "@/interfaces/providerInterface";
import { convertDateToReadable } from "@/utils/helper";

const GeneralFilter = () => {
    const { state: { launches: { launches: launchesData } }, dispatch } = useGlobalContext();
        
    const handleFilter = useCallback((year: number) => {
        dispatch({ type: LaunchActionTypes.FILTER_LAUNCHES, payload: year });
    console.log('commit test')
    }, [dispatch]);

    const uniqueYears = useMemo(() => {
        return Array.from(
            new Set(
                launchesData.map((launch: Launch) => convertDateToReadable(launch))
            )
        ).sort((a, b) => b - a);
    }, [launchesData]);

    const menuItems: MenuProps['items'] = useMemo(() => {
        if (!uniqueYears.length) return [];
        return [
            ...uniqueYears.map((year) => ({
                key: year,
                label: (
                    <div onClick={() => handleFilter(year)} className="filter-row-selectable">
                        {year}
                    </div>
                ),
            }))  
        ];
    }, [handleFilter, uniqueYears]);

    return (
        <>
            {uniqueYears.length > 0 && (
                <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                    <div className="filter-button flex-center">
                        <FilterOutlined style={{ marginRight: '4px' }} />
                        <span>Filter by launch year</span>
                    </div>
                </Dropdown>
            )}
        </>
    );
};

export default GeneralFilter;

