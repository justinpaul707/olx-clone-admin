import { Route } from "react-router-dom";
import BrowserRouterProvider from '@app/routes'
import PrivateAuthProvider from "@app/routes/guards/PrivateAuth";
import PublicAuthProvider from "@app/routes/guards/PublicAuth";
import LoginPage from "@app/features/auth/pages/loginPage";
import DashboardPage from "@app/features/dashboard/pages";
import { UserManagementPage } from "@app/features/userManagement/pages";
import { PropertyManagementPage, UserPropertiesPage, AddPropertyPage } from "@app/features/propertyManagement/pages";


import { CategoryManagementPage, RoleManagementPage, AuditLogsPage, SecurityPage } from "@app/features/settings/pages";
import { FormsListPage, FormBuilderPage } from "@app/features/formBuilder/pages";
import { ReportsPage } from "@app/features/reports/pages";

const RoutesHandler = () => {    
    return (
      <BrowserRouterProvider>
        <Route element={<PrivateAuthProvider loginStatus={true} />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/user-list" element={<UserManagementPage />} />
          <Route path="/property-list" element={<PropertyManagementPage />} />
          <Route path="/properties/create" element={<AddPropertyPage />} />
          <Route path="/users/:userId/properties" element={<UserPropertiesPage />} />
          <Route path="/settings/categories" element={<CategoryManagementPage />} />
          <Route path="/settings/roles" element={<RoleManagementPage />} />
          <Route path="/settings/audit-logs" element={<AuditLogsPage />} />
          <Route path="/settings/security" element={<SecurityPage />} />
          <Route path="/settings/forms" element={<FormsListPage />} />
          <Route path="/settings/forms/:id" element={<FormBuilderPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        <Route element={<PublicAuthProvider loginStatus={false} />}>
          <Route path="/login" element={<LoginPage/>} />
        </Route>
      </BrowserRouterProvider>
    );
}

export default RoutesHandler;
    