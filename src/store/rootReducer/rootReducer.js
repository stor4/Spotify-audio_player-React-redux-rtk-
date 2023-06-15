import React from "react";
import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'
import api from "../api/api";
import playerSlice from "../slices/playerSlice";
import authSlice from "../slices/authSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [authSlice.name]
}

const rootReducer = combineReducers({
    [authSlice.name]:authSlice.reducer,
    [api.reducerPath]: api.reducer,
    [playerSlice.name]: playerSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware)
})

export default store
export const persistor = persistStore(store)


