export interface FavoriteJobState {
    favoriteJobs: any[];
    favorites: boolean[];
}

export const initialFavoriteJobState: FavoriteJobState = {
    favoriteJobs: [],
    favorites: []
};

import { createSelector, createFeatureSelector } from '@ngrx/store';

// Feature selector
export const selectFavoriteJobFeature = createFeatureSelector<FavoriteJobState>('favoriteJobs');

// Specific selector for favorite jobs
export const selectFavoriteJobs = createSelector(
    selectFavoriteJobFeature,
    (state: FavoriteJobState) => state.favoriteJobs
);

// Selector for favorites boolean array
export const selectFavorites = createSelector(
    selectFavoriteJobFeature,
    (state: FavoriteJobState) => state.favorites
);
