export enum FormStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ComponentType {
  TEXT_INPUT = 'TEXT_INPUT',
  TEXTAREA = 'TEXTAREA',
  NUMBER_INPUT = 'NUMBER_INPUT',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  DATE_PICKER = 'DATE_PICKER',
  FILE_UPLOAD = 'FILE_UPLOAD',
  IMAGE_UPLOAD = 'IMAGE_UPLOAD',
  RANGE_SLIDER = 'RANGE_SLIDER',
  LOCATION_PICKER = 'LOCATION_PICKER',
}

export interface FormComponent {
  id: string;
  type: ComponentType;
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  required: boolean;
  order: number;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  options?: Array<{
    label: string;
    value: string;
  }>;
  config?: Record<string, any>;
}

export interface Form {
  id: string;
  name: string;
  description?: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
  status: FormStatus;
  version: number;
  components: FormComponent[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface FormVersion {
  id: string;
  formId: string;
  version: number;
  components: FormComponent[];
  createdAt: string;
  createdBy: string;
}

// Input types
export interface CreateFormInput {
  name: string;
  description?: string;
  categoryId?: string;
  components?: FormComponent[];
}

export interface UpdateFormInput {
  id: string;
  name?: string;
  description?: string;
  categoryId?: string;
}

export interface AddComponentInput {
  formId: string;
  component: Omit<FormComponent, 'id' | 'order'>;
}

export interface UpdateComponentInput {
  formId: string;
  componentId: string;
  component: Partial<Omit<FormComponent, 'id'>>;
}

export interface DeleteComponentInput {
  formId: string;
  componentId: string;
}

export interface ReorderComponentsInput {
  formId: string;
  componentIds: string[];
}

export interface PublishFormInput {
  id: string;
}

export interface AssignFormToCategoryInput {
  formId: string;
  categoryId: string;
}

// Response types
export interface GetFormsResponse {
  forms: Form[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface GetFormResponse {
  form: Form;
}

export interface GetFormVersionsResponse {
  versions: FormVersion[];
}

export interface FormMutationResponse {
  success: boolean;
  message: string;
  form?: Form;
  errors?: string[];
}

export interface ComponentMutationResponse {
  success: boolean;
  message: string;
  component?: FormComponent;
  errors?: string[];
}

export interface FormListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: FormStatus;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
