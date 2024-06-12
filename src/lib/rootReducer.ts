import { combineReducers, createAsyncThunk } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authSlice from './features/authSlice';
import companiesInfoSlice from './features/companiesInfoSlice';
import histogramsSlice from './features/histogramsSlice';
import documentsSlice from './features/documentsSlice';
import { persistor } from './store';

const appReducer = combineReducers({
	auth: authSlice,
	companiesInfo: companiesInfoSlice,
	histograms: histogramsSlice,
	documents: documentsSlice,
});

// Корневой редьюсер, который обрабатывает действие сброса состояния
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return appReducer(state, action);
};

// Конфигурация для persist
const persistConfig = {
    key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Очистка хранилища
export const resetAndCleanStore = createAsyncThunk('resetAndCleanStore', async (_, { dispatch }) => {
	await persistor.purge();
	dispatch({ type: 'RESET' });
});
  
export default persistedReducer;