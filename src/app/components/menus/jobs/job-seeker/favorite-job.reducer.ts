import { createReducer, on } from '@ngrx/store';
import { addFavoriteJob } from './favorite-job.actions';
import { initialFavoriteJobState } from './favorite-job.state';

export const favoriteJobReducer = createReducer(
    initialFavoriteJobState,
    on(addFavoriteJob, (state, { job }) => {
        return { ...state, favoriteJobs: [...state.favoriteJobs, job] };
    })
);
