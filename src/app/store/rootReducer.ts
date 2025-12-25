import { combineReducers } from '@reduxjs/toolkit';
import { resetStore } from './action';
import { authApi } from '@app/features/auth/api/authApi';
import { dashboardApi } from '@app/features/dashboard/api/dashboardApi';
import { userManagementApi } from '@app/features/userManagement/api/userManagementApi';
import { propertyManagementApi } from '@app/features/propertyManagement/api/propertyManagementApi';
import { settingsApi } from '@app/features/settings/api';
import { formBuilderApi } from '@app/features/formBuilder/api';
import authReducer from '@app/features/auth/store/authSlice';
import dashboardReducer from '@app/features/dashboard/store/dashboardSlice';
import userManagementReducer from '@app/features/userManagement/store/userManagementSlice';
import propertyManagementReducer from '@app/features/propertyManagement/store/propertyManagementSlice';
import formBuilderReducer from '@app/features/formBuilder/store/formBuilderSlice';
import type { AnyAction } from '@reduxjs/toolkit';

const appReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  userManagement: userManagementReducer,
  propertyManagement: propertyManagementReducer,
  formBuilder: formBuilderReducer,
  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [userManagementApi.reducerPath]: userManagementApi.reducer,
  [propertyManagementApi.reducerPath]: propertyManagementApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
  [formBuilderApi.reducerPath]: formBuilderApi.reducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === resetStore.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
