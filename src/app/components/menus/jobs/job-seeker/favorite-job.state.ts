
import { createSelector, createFeatureSelector } from '@ngrx/store';
export interface FavoriteJobState {
    favoriteJobs: any[];
}

export const initialFavoriteJobState: FavoriteJobState = {
    favoriteJobs: []
};

export const selectFavoriteJobFeature = createFeatureSelector<FavoriteJobState>('favoriteJobs');

export const selectFavoriteJobs = createSelector(
    selectFavoriteJobFeature,
    (state: FavoriteJobState) => state.favoriteJobs
);
