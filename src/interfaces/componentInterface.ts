export interface LaunchCardProps {
    name: string;
    launchYear: number;
    patchImage: string;
    status: boolean;
    isFavorite: boolean,
    onAddOrRemoveToFavorites: () => void;
}

export interface LaunchListPropsType  {
    isFavoritesRoute : boolean
}
