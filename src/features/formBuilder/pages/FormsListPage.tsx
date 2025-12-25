import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetFormsQuery,
  useDeleteFormMutation,
} from '@app/features/formBuilder/api/formBuilderApi';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { FormStatus } from '@app/features/formBuilder/types';

export const FormsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FormStatus | ''>('');

  const { data: formsData, isLoading, refetch } = useGetFormsQuery({
    page: 1,
    limit: 50,
    search: searchTerm,
    status: statusFilter || undefined,
  });

  const [deleteForm] = useDeleteFormMutation();

  const forms = formsData?.forms || [];

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return;

    try {
      await deleteForm({ id }).unwrap();
      toast.success('Form deleted successfully');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete form');
    }
  };

  const getStatusColor = (status: FormStatus) => {
    switch (status) {
      case FormStatus.PUBLISHED:
        return 'bg-status-success/10 text-status-success';
      case FormStatus.DRAFT:
        return 'bg-status-warning/10 text-status-warning';
      case FormStatus.ARCHIVED:
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-background-primary">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Form Builder</h1>
          <p className="mt-1 text-text-secondary">
            Create and manage dynamic forms for categories
          </p>
        </div>
        <Button 
          onClick={() => navigate('/settings/forms/new')}
          className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FormStatus | '')}
            className="px-3 py-2 border border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary-base"
          >
            <option value="">All Status</option>
            <option value={FormStatus.DRAFT}>Draft</option>
            <option value={FormStatus.PUBLISHED}>Published</option>
            <option value={FormStatus.ARCHIVED}>Archived</option>
          </select>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border-primary bg-surface-base p-4">
          <div className="text-sm font-medium text-text-secondary">Total Forms</div>
          <div className="mt-2 text-2xl font-bold text-text-primary">
            {forms.length}
          </div>
        </div>
        <div className="rounded-lg border border-border-primary bg-surface-base p-4">
          <div className="text-sm font-medium text-text-secondary">Published</div>
          <div className="mt-2 text-2xl font-bold text-status-success">
            {forms.filter((f) => f.status === FormStatus.PUBLISHED).length}
          </div>
        </div>
        <div className="rounded-lg border border-border-primary bg-surface-base p-4">
          <div className="text-sm font-medium text-text-secondary">Drafts</div>
          <div className="mt-2 text-2xl font-bold text-status-warning">
            {forms.filter((f) => f.status === FormStatus.DRAFT).length}
          </div>
        </div>
      </div>

      {/* Forms Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-text-secondary">Loading forms...</div>
        </div>
      ) : forms.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-border-primary rounded-lg">
          <FileText className="h-12 w-12 mx-auto text-text-tertiary mb-4" />
          <p className="text-text-secondary mb-4">No forms found</p>
          <Button 
            onClick={() => navigate('/settings/forms/new')}
            className="bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Form
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form.id}
              className="bg-surface-base border border-border-primary rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary mb-1">{form.name}</h3>
                  {form.description && (
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {form.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      form.status
                    )}`}
                  >
                    {form.status}
                  </span>
                  <span className="text-xs text-text-tertiary">v{form.version}</span>
                </div>

                {form.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-surface-elevated rounded text-text-secondary">
                      {form.category.name}
                    </span>
                  </div>
                )}

                <div className="text-xs text-text-tertiary">
                  {form.components.length} component{form.components.length !== 1 ? 's' : ''}
                </div>

                <div className="text-xs text-text-tertiary">
                  Updated {new Date(form.updatedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border-primary">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/settings/forms/${form.id}`)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(form.id)}
                >
                  <Trash2 className="h-4 w-4 text-status-error" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
