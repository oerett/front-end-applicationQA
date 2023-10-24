import { createAction, props } from '@ngrx/store';

export const addFavoriteJob = createAction(
    '[Job] Add Favorite',
    props<{ job: any }>()
);

export const removeFavoriteJob = createAction(
    '[Job] Remove Favorite Job',
    props<{ job: any }>()
);

export const updateFavoritesArray = createAction(
    '[Favorites] Update Favorites Array',
    props<{ favorites: boolean[] }>()
);
