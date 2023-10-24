import { createReducer, on } from '@ngrx/store';
import { addFavoriteJob, removeFavoriteJob, updateFavoritesArray } from './favorite-job.actions';
import { initialFavoriteJobState } from './favorite-job.state';

export const favoriteJobReducer = createReducer(initialFavoriteJobState,
    on(addFavoriteJob, (state, { job }) => {
        return { ...state, favoriteJobs: [...state.favoriteJobs, job] };
    }),
    on(removeFavoriteJob, (state, { job }) => {
        return {
            ...state,
            favoriteJobs: state.favoriteJobs.filter(j => j.jobId !== job.jobId),
        };
    }),
    on(updateFavoritesArray, (state, { favorites }) => {
        return { ...state, favorites };
    })
);
