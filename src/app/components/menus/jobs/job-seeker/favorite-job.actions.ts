import { createAction, props } from '@ngrx/store';

//add favourites action
export const addFavoriteJob = createAction(
    '[Job] Add Favorite',
    props<{ job: any }>()
);

//remove favourites action
export const removeFavoriteJob = createAction(
    '[Job] Remove Favorite Job',
    props<{ job: any }>()
);

//update Favorites action
export const updateFavoritesArray = createAction(
    '[Favorites] Update Favorites Array',
    props<{ favorites: boolean[] }>()
);
