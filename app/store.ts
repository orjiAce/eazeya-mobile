import {configureStore} from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";
import userReducer from "./slices/userSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//the configuration object that we want redux persist to use

const rootReducer = combineReducers({
    user: userReducer,
    navigation: navigationReducer,
});


const persistConfig = {
    key: 'eazeya-mobile',
    version: 1,
    storage:AsyncStorage,
    whitelist: ['user', 'navigation']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
