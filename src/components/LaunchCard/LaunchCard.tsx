import {memo} from 'react';
import { Card, Button } from 'antd';

import { LaunchCardProps } from '@/interfaces/componentInterface';
import './LaunchCard.css'; 

const LaunchCard = memo(({ 
    name , 
    launchYear, 
    patchImage, 
    status, 
    isFavorite,
    onAddOrRemoveToFavorites
}: LaunchCardProps) => {

    return (
        <Card
            hoverable
            className="launch-card flex-center"
            cover={<img alt="Launch Patch" src={patchImage} className="launch-cover-image" />}
        >
            <Card.Meta 
                title={<div className="launch-title">{name}</div>} 
                description={`Year: ${launchYear} Status: ${status ? 'SUCCESS' : 'FAILED'}`} 
            />
            <Button onClick={onAddOrRemoveToFavorites} className="launch-button">
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
        </Card>
    )
}, (prevProps, nextProps) => {
    return (
        prevProps.isFavorite === nextProps.isFavorite &&
        prevProps.name === nextProps.name &&
        prevProps.launchYear === nextProps.launchYear &&
        prevProps.patchImage === nextProps.patchImage &&
        prevProps.status === nextProps.status
    );
});
export default LaunchCard;
