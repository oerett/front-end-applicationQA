export interface FavoriteJobState {
    favoriteJobs: any[];
}

export const initialFavoriteJobState: FavoriteJobState = {
    favoriteJobs: []
};


import { createSelector, createFeatureSelector } from '@ngrx/store';

// Feature selector
export const selectFavoriteJobFeature = createFeatureSelector<FavoriteJobState>('favoriteJobs');

// Specific selector for favorite jobs
export const selectFavoriteJobs = createSelector(
    selectFavoriteJobFeature,
    (state: FavoriteJobState) => state.favoriteJobs
);
