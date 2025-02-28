import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from './pokemonSLice';

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    },
});
