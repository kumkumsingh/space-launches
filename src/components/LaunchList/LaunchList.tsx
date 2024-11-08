import { useCallback, useMemo, lazy } from 'react';
import { Row, Col, Alert } from 'antd';

import useGlobalContext from '@/hooks/useGlobalContext';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import { LaunchListPropsType } from '@/interfaces/componentInterface';
import { Launch } from '@/interfaces/providerInterface';
import { LaunchActionTypes } from '@/enums/actionTypes';
import { convertDateToReadable } from '@/utils/helper';
import './LaunchList.css';

const LaunchCard = lazy(() => import('../LaunchCard/LaunchCard'));

const LaunchList = ({ isFavoritesRoute }: LaunchListPropsType) => {
    const { state, dispatch, isLoading } = useGlobalContext();

    const { launches: { filteredLaunches, error }, favorites: { favorites: favouritesIds } } = state;
    
    const favouritesData = useMemo(()=>{
        return filteredLaunches.filter((launch)=> favouritesIds.includes(launch.id))
    }, [filteredLaunches , favouritesIds])

    const launchesToDisplay = isFavoritesRoute ? favouritesData : filteredLaunches;

    const {visibleCount} = useInfiniteScroll(launchesToDisplay.length)

    const visibleLaunches = useMemo(() => {
        const sortedLaunches = [...launchesToDisplay]
            .sort(({ name: aName }, { name: bName }) => aName.localeCompare(bName))
            .slice(0, visibleCount);

        // Add launchYear and isFavorite properties to each launch item
        return sortedLaunches.map((launch) => ({
            ...launch,
            launchYear: convertDateToReadable(launch),
            isFavorite: favouritesIds.includes(launch.id)
        }));
    }, [launchesToDisplay, visibleCount, favouritesIds]);
    
    const handleFavoriteToggle = useCallback((launch: Launch) => {
        const isFavorite = favouritesIds.includes(launch.id);
        const actionType = isFavorite ? LaunchActionTypes.REMOVE_FAVORITE : LaunchActionTypes.ADD_FAVORITE;

        dispatch({ type: actionType, payload: launch .id});
    }, [dispatch, favouritesIds]);

    if (isLoading) {
        return <div className="loader">Loading launches...</div>;
    }

    if (error) {
        return (
            <div className="loader-error-container">
                <Alert message="Error" description={error} type="error" showIcon />
            </div>
        );
    }
    
    return (
        <Row gutter={[16, 16]} justify="center">
            {visibleLaunches.length > 0 ? (
                visibleLaunches.map((launch) => {
                    const { id, name, links, status , launchYear, isFavorite} = launch;
            
                    return (
                        <Col key={id} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <LaunchCard
                                name={name}
                                launchYear={launchYear}
                                patchImage={links.patch.small}
                                status={status}
                                isFavorite={isFavorite}
                                onAddOrRemoveToFavorites={() => handleFavoriteToggle(launch)}
                            />
                        </Col>
                    );
                })
            ) : (
                <div className="no-launches-message">
                    <p>{isFavoritesRoute ? 'No favorites available' : 'No launches available'}</p>
                </div>
            )}
        </Row>
    );
};

export default LaunchList;
