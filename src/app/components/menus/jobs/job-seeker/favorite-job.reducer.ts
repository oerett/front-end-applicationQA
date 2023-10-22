import { createReducer, on } from '@ngrx/store';
import { addFavoriteJob, removeFavoriteJob, updateFavoritesArray } from './favorite-job.actions';
import { initialFavoriteJobState } from './favorite-job.state';

export const favoriteJobReducer = createReducer(
    initialFavoriteJobState,
    on(addFavoriteJob, (state, { job }) => {
        return { ...state, favoriteJobs: [...state.favoriteJobs, job] };
    }),
    on(removeFavoriteJob, (state, { job }) => {
        return {
            ...state,
            favoriteJobs: state.favoriteJobs.filter(j => j.jobId !== job.jobId),
        };
    }),
    // Add logic for the action to update favorites array
    on(updateFavoritesArray, (state, { favorites }) => {
        return { ...state, favorites };
    })
);
