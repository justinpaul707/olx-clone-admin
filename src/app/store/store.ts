import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { authApi } from '@app/features/auth/api/authApi';
import { userManagementApi } from "@app/features/userManagement/api/userManagementApi";
import { propertyManagementApi } from "@app/features/propertyManagement/api/propertyManagementApi";
import { settingsApi } from '@app/features/settings/api';
import { dashboardApi } from '@app/features/dashboard/api/dashboardApi';
import { formBuilderApi } from '@app/features/formBuilder/api';
import { reportsApi } from '@app/features/reports/api/reportsApi';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userManagementApi.middleware,
      propertyManagementApi.middleware,
      settingsApi.middleware,
      dashboardApi.middleware,
      formBuilderApi.middleware,
      reportsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };