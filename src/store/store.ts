import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import app from './features/app/appSlice';
import wallet from './features/wallet/walletSlice';
import { listenerMiddleware } from './middlewares/listeners';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['app'],
};

const appPersistConfig = {
  key: 'app',
  version: 1,
  storage,
  blacklist: ['loggedIn'],
};

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, app),
  wallet,
});
type RootReducer = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: persistReducer<RootReducer>(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
