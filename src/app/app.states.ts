import { createFeatureSelector } from '@ngrx/store';

export interface AppState {

}

export const selectAuthState = createFeatureSelector<AppState>('auth');
