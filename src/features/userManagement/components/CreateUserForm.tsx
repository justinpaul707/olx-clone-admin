import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useGetRolesQuery } from '@app/features/userManagement/api/userManagementApi';
import { createUserSchema, type CreateUserFormData } from '@app/features/userManagement/utils/validationSchemas';
import { UserStatus } from '@app/features/userManagement/types';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { Label } from '@app/components/ui/label';
import { Eye, EyeOff, User, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { cn } from '@app/lib/utils';

interface CreateUserFormProps {
  onSubmit: (data: CreateUserFormData) => Promise<any>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery();

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      roleId: '',
      status: UserStatus.ACTIVE,
    } as CreateUserFormData,
    validators: {
      onChange: createUserSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* Full Name */}
      <form.Field name="fullName">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Enter full name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={isLoading}
                className={cn('pl-10', field.state.meta.errors.length && 'border-red-500')}
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-600">{String(field.state.meta.errors[0])}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Email */}
      <form.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="Enter email address"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={isLoading}
                className={cn('pl-10', field.state.meta.errors.length && 'border-red-500')}
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-600">{String(field.state.meta.errors[0])}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Phone */}
      <form.Field name="phone">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id={field.name}
                name={field.name}
                type="tel"
                placeholder="Enter phone number"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={isLoading}
                className={cn('pl-10', field.state.meta.errors.length && 'border-red-500')}
              />
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-600">{String(field.state.meta.errors[0])}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Password */}
      <form.Field name="password">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id={field.name}
                name={field.name}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={isLoading}
                className={cn('pl-10 pr-10', field.state.meta.errors.length && 'border-red-500')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-600">{String(field.state.meta.errors[0])}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Confirm Password */}
      <form.Field name="confirmPassword">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Confirm Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id={field.name}
                name={field.name}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                disabled={isLoading}
                className={cn('pl-10 pr-10', field.state.meta.errors.length && 'border-red-500')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-600">{String(field.state.meta.errors[0])}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Role */}
      <form.Field name="roleId">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>
              Role <span className="text-red-500">*</span>
            </Label>
            <select
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={isLoading || rolesLoading}
              className={cn(
                'flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                field.state.meta.errors.length && 'border-red-500'
              )}
            >
              <option value="">Select a role</option>
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {field.state.meta.errors.length > 0 && (
              <p className="text-sm text-red-600">{String(field.state.meta.errors[0])}</p>
            )}
          </div>
        )}
      </form.Field>

      {/* Status */}
      <form.Field name="status">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Status</Label>
            <select
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value as UserStatus)}
              onBlur={field.handleBlur}
              disabled={isLoading}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value={UserStatus.ACTIVE}>Active</option>
              <option value={UserStatus.INACTIVE}>Inactive</option>
              <option value={UserStatus.PENDING}>Pending</option>
            </select>
          </div>
        )}
      </form.Field>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create User
        </Button>
      </div>
    </form>
  );
};
