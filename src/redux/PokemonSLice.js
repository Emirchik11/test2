import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    const data = await response.json();
    const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
        })
    );
    return detailedPokemons;
});

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        caughtPokemons: [],
        status: "idle",
    },
    reducers: {
        catchPokemon: (state, action) => {
            if (!state.caughtPokemons.find((p) => p.name === action.payload.name)) {
                state.caughtPokemons.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export const { catchPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;