import { createAction, props } from '@ngrx/store';

export const addFavoriteJob = createAction(
    '[Job] Add Favorite',
    props<{ job: any }>()
);

export const removeFavoriteJob = createAction(
    '[Job] Remove Favorite Job',
    props<{ job: any }>()
  );
  